// GET /api/forum_threads/[id] - Get thread by ID
// PUT /api/forum_threads/[id] - Update thread by ID
// DELETE /api/forum_threads/[id] - Delete thread by ID
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { forumThreadsInDinda } from '~/lib/db/schema'
import { eq } from 'drizzle-orm'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

const sql = postgres(process.env.DATABASE_URL)
const db = drizzle(sql)

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')

  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid thread ID'
    })
  }

  const threadId = Number(id)

  if (method === 'GET') {
    try {
      const thread = await db
        .select()
        .from(forumThreadsInDinda)
        .where(eq(forumThreadsInDinda.id, threadId))
        .limit(1)

      if (thread.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Thread not found'
        })
      }

      return {
        success: true,
        data: thread[0]
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error;
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch thread',
        data: error
      })
    }
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event)
      const existing = await db
        .select()
        .from(forumThreadsInDinda)
        .where(eq(forumThreadsInDinda.id, threadId))
        .limit(1)
      if (existing.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Thread not found'
        })
      }
      const updated = await db
        .update(forumThreadsInDinda)
        .set(body)
        .where(eq(forumThreadsInDinda.id, threadId))
        .returning()
      return {
        success: true,
        data: updated[0],
        message: 'Thread updated successfully'
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error;
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update thread',
        data: error
      })
    }
  }

  if (method === 'DELETE') {
    try {
      const existing = await db
        .select()
        .from(forumThreadsInDinda)
        .where(eq(forumThreadsInDinda.id, threadId))
        .limit(1)
      if (existing.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Thread not found'
        })
      }
      await db
        .delete(forumThreadsInDinda)
        .where(eq(forumThreadsInDinda.id, threadId))
      return {
        success: true,
        message: 'Thread deleted successfully'
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error;
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete thread',
        data: error
      })
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})
