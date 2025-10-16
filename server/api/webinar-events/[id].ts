// GET /api/webinar-events/[id] - Get specific webinar event by ID
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { webinarEventsInDinda } from '~/lib/db/schema'
import { eq } from 'drizzle-orm'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

const sql = postgres(process.env.DATABASE_URL)
const db = drizzle(sql)

export default defineEventHandler(async (event) => {
  try {
    const eventId = getRouterParam(event, 'id')
    
    if (!eventId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Event ID is required'
      })
    }

    const webinarEvent = await db
      .select()
      .from(webinarEventsInDinda)
      .where(eq(webinarEventsInDinda.id, Number(eventId)))
      .limit(1)

    if (webinarEvent.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
        message: 'Webinar event not found'
      })
    }

    return {
      success: true,
      data: webinarEvent[0]
    }
  } catch (error: any) {
    console.error('Error fetching webinar event:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to fetch webinar event'
    })
  }
})