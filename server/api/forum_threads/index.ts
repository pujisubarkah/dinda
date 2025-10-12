
// GET /api/forum_threads - Get all threads
// POST /api/forum_threads - Create new thread
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { forumThreadsInDinda } from '~/lib/db/schema'
import { desc, like, and } from 'drizzle-orm'

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
      const { search, limit = 50, offset = 0 } = query

      let whereConditions = []
      if (search && search !== '') {
        whereConditions.push(
          like(forumThreadsInDinda.title, `%${search}%`)
        )
      }

      const threadList = await db
        .select()
        .from(forumThreadsInDinda)
        .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
        .orderBy(desc(forumThreadsInDinda.createdAt))
        .limit(Number(limit))
        .offset(Number(offset))

      return {
        success: true,
        data: threadList,
        total: threadList.length
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch forum threads',
        data: error
      })
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      // Validation
      if (!body.title || !body.content) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Title and content are required'
        })
      }
      const inserted = await db
        .insert(forumThreadsInDinda)
        .values(body)
        .returning()
      return {
        success: true,
        data: inserted[0],
        message: 'Thread created successfully'
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create thread',
        data: error
      })
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})
