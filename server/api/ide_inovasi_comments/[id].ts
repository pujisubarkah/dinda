// GET /api/ide_inovasi_comments/[id] - Get single comment by id
// PATCH /api/ide_inovasi_comments/[id] - Update comment by id
// DELETE /api/ide_inovasi_comments/[id] - Delete comment by id

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { ideInovasiCommentsInDinda } from '~/lib/db/schema'
import { eq } from 'drizzle-orm'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}
const sql = postgres(process.env.DATABASE_URL)
const db = drizzle(sql)

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const { id } = event.context.params || {}
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing id param' })
  }

  if (method === 'GET') {
    try {
      const comment = await db
        .select()
        .from(ideInovasiCommentsInDinda)
        .where(eq(ideInovasiCommentsInDinda.id, Number(id)))
        .limit(1)
      if (!comment[0]) {
        throw createError({ statusCode: 404, statusMessage: 'Comment not found' })
      }
      return { success: true, data: comment[0] }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch comment',
        data: error
      })
    }
  }

  if (method === 'PATCH') {
    try {
      const body = await readBody(event)
      const updated = await db
        .update(ideInovasiCommentsInDinda)
        .set({
          content: body.content,
          isApproved: body.is_approved,
          updatedAt: new Date()
        })
        .where(eq(ideInovasiCommentsInDinda.id, Number(id)))
        .returning()
      if (!updated[0]) {
        throw createError({ statusCode: 404, statusMessage: 'Comment not found' })
      }
      return { success: true, data: updated[0], message: 'Comment updated successfully' }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update comment',
        data: error
      })
    }
  }

  if (method === 'DELETE') {
    try {
      const deleted = await db
        .delete(ideInovasiCommentsInDinda)
        .where(eq(ideInovasiCommentsInDinda.id, Number(id)))
        .returning()
      if (!deleted[0]) {
        throw createError({ statusCode: 404, statusMessage: 'Comment not found' })
      }
      return { success: true, message: 'Comment deleted successfully' }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete comment',
        data: error
      })
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})
