
// GET /api/forum_posts - Get all posts
// POST /api/forum_posts - Create new post
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { forumPostsInDinda } from '~/lib/db/schema'
import { desc, and, eq } from 'drizzle-orm'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

const sql = postgres(process.env.DATABASE_URL)
const db = drizzle(sql)

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  if (method === 'GET') {
    try {
      const query = getQuery(event)
      const { thread_id, user_id, limit = 50, offset = 0 } = query

      let whereConditions = []
      if (thread_id) {
        whereConditions.push(eq(forumPostsInDinda.threadId, Number(thread_id)))
      }
      if (user_id) {
        whereConditions.push(eq(forumPostsInDinda.userId, Number(user_id)))
      }

      const postList = await db
        .select()
        .from(forumPostsInDinda)
        .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
        .orderBy(desc(forumPostsInDinda.createdAt))
        .limit(Number(limit))
        .offset(Number(offset))

      return {
        success: true,
        data: postList,
        total: postList.length
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch forum posts',
        data: error
      })
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      // Validation
      if (!body.thread_id || !body.content) {
        throw createError({
          statusCode: 400,
          statusMessage: 'thread_id and content are required'
        })
      }
      const inserted = await db
        .insert(forumPostsInDinda)
        .values(body)
        .returning()
      return {
        success: true,
        data: inserted[0],
        message: 'Post created successfully'
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create post',
        data: error
      })
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})
