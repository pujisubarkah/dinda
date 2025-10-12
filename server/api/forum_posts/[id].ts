// GET /api/forum_posts/[id] - Get post by ID
// PUT /api/forum_posts/[id] - Update post by ID
// DELETE /api/forum_posts/[id] - Delete post by ID
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { forumPostsInDinda } from '~/lib/db/schema'
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
      statusMessage: 'Invalid post ID'
    })
  }

  const postId = Number(id)

  if (method === 'GET') {
    try {
      const post = await db
        .select()
        .from(forumPostsInDinda)
        .where(eq(forumPostsInDinda.id, postId))
        .limit(1)

      if (post.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Post not found'
        })
      }

      return {
        success: true,
        data: post[0]
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error;
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch post',
        data: error
      })
    }
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event)
      const existing = await db
        .select()
        .from(forumPostsInDinda)
        .where(eq(forumPostsInDinda.id, postId))
        .limit(1)
      if (existing.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Post not found'
        })
      }
      const updated = await db
        .update(forumPostsInDinda)
        .set(body)
        .where(eq(forumPostsInDinda.id, postId))
        .returning()
      return {
        success: true,
        data: updated[0],
        message: 'Post updated successfully'
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error;
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update post',
        data: error
      })
    }
  }

  if (method === 'DELETE') {
    try {
      const existing = await db
        .select()
        .from(forumPostsInDinda)
        .where(eq(forumPostsInDinda.id, postId))
        .limit(1)
      if (existing.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Post not found'
        })
      }
      await db
        .delete(forumPostsInDinda)
        .where(eq(forumPostsInDinda.id, postId))
      return {
        success: true,
        message: 'Post deleted successfully'
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error;
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete post',
        data: error
      })
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})
