// GET /api/ide_inovasi_comments - Get all comments (with optional filter)
// POST /api/ide_inovasi_comments - Create new comment

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { ideInovasiCommentsInDinda } from '~/lib/db/schema'
import { eq, desc, and, like } from 'drizzle-orm'

// Database connection
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
      const { ide_inovasi_id, search, limit = 50, offset = 0 } = query

      let whereConditions = []
      if (ide_inovasi_id) {
        whereConditions.push(eq(ideInovasiCommentsInDinda.ideInovasiId, Number(ide_inovasi_id)))
      }
      if (search && search !== '') {
        whereConditions.push(like(ideInovasiCommentsInDinda.content, `%${search}%`))
      }

      const comments = await db
        .select()
        .from(ideInovasiCommentsInDinda)
        .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
        .orderBy(desc(ideInovasiCommentsInDinda.createdAt))
        .limit(Number(limit))
        .offset(Number(offset))

      return {
        success: true,
        data: comments,
        total: comments.length
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch comments',
        data: error
      })
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      if (!body.ide_inovasi_id || !body.user_id || !body.content) {
        throw createError({
          statusCode: 400,
          statusMessage: 'ide_inovasi_id, user_id, and content are required'
        })
      }

      const newComment = await db
        .insert(ideInovasiCommentsInDinda)
        .values({
          ideInovasiId: body.ide_inovasi_id,
          userId: body.user_id,
          parentId: body.parent_id || null,
          content: body.content,
          isApproved: body.is_approved ?? false,
          likeCount: 0
        })
        .returning()

      return {
        success: true,
        data: newComment[0],
        message: 'Comment created successfully'
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create comment',
        data: error
      })
    }
  }

  // Method not allowed
  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})
