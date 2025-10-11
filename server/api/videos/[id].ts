// GET /api/videos/[id] - Get video by ID
// PUT /api/videos/[id] - Update video by ID  
// DELETE /api/videos/[id] - Delete video by ID
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { videosInDinda } from '~/lib/db/schema'
import { eq } from 'drizzle-orm'

// Database connection
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
      statusMessage: 'Invalid video ID'
    })
  }

  const videoId = Number(id)

  if (method === 'GET') {
    try {
      const video = await db
        .select()
        .from(videosInDinda)
        .where(eq(videosInDinda.id, videoId))
        .limit(1)

      if (video.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Video not found'
        })
      }

      return {
        success: true,
        data: video[0]
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch video',
        data: error
      })
    }
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event)
      
      // Check if video exists
      const existingVideo = await db
        .select()
        .from(videosInDinda)
        .where(eq(videosInDinda.id, videoId))
        .limit(1)

      if (existingVideo.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Video not found'
        })
      }

      // Extract YouTube ID from URL if needed
      let youtubeId = body.youtubeId
      if (body.url && !youtubeId) {
        const urlMatch = body.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
        if (urlMatch) {
          youtubeId = urlMatch[1]
        }
      }

      const updatedVideo = await db
        .update(videosInDinda)
        .set({
          title: body.title || existingVideo[0].title,
          description: body.description !== undefined ? body.description : existingVideo[0].description,
          youtubeId: youtubeId || existingVideo[0].youtubeId,
          url: body.url || existingVideo[0].url,
          category: body.category !== undefined ? body.category : existingVideo[0].category,
          categoryLabel: body.categoryLabel !== undefined ? body.categoryLabel : existingVideo[0].categoryLabel,
          date: body.date ? new Date(body.date) : existingVideo[0].date,
          views: body.views !== undefined ? body.views : existingVideo[0].views,
          duration: body.duration !== undefined ? body.duration : existingVideo[0].duration
        })
        .where(eq(videosInDinda.id, videoId))
        .returning()

      return {
        success: true,
        data: updatedVideo[0],
        message: 'Video updated successfully'
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update video',
        data: error
      })
    }
  }

  if (method === 'DELETE') {
    try {
      // Check if video exists
      const existingVideo = await db
        .select()
        .from(videosInDinda)
        .where(eq(videosInDinda.id, videoId))
        .limit(1)

      if (existingVideo.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Video not found'
        })
      }

      await db
        .delete(videosInDinda)
        .where(eq(videosInDinda.id, videoId))

      return {
        success: true,
        message: 'Video deleted successfully'
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete video',
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