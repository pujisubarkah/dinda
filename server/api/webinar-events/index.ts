// GET /api/webinar-events - Get all webinar events
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { webinarEventsInDinda } from '~/lib/db/schema'
import { desc, like, eq, and, or, count } from 'drizzle-orm'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

const sqlClient = postgres(process.env.DATABASE_URL)
const db = drizzle(sqlClient)

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { 
      search = '', 
      category = '', 
      status = '', 
      limit = 50, 
      offset = 0,
      sort = 'date_desc' 
    } = query

    // Build where conditions
    const whereConditions: any[] = []
    
    if (search) {
      whereConditions.push(
        or(
          like(webinarEventsInDinda.title, `%${search}%`),
          like(webinarEventsInDinda.description, `%${search}%`)
        )
      )
    }

    if (category) {
      whereConditions.push(eq(webinarEventsInDinda.category, category as string))
    }

    if (status) {
      whereConditions.push(eq(webinarEventsInDinda.status, status as string))
    }

    // Build main query
    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined

    // Apply sorting
    let orderBy
    switch (sort) {
      case 'date_asc':
        orderBy = webinarEventsInDinda.dateStart
        break
      case 'date_desc':
        orderBy = desc(webinarEventsInDinda.dateStart)
        break
      case 'title_asc':
        orderBy = webinarEventsInDinda.title
        break
      case 'title_desc':
        orderBy = desc(webinarEventsInDinda.title)
        break
      default:
        orderBy = desc(webinarEventsInDinda.createdAt)
    }

    // Get data with pagination
    const webinarEvents = await db
      .select()
      .from(webinarEventsInDinda)
      .where(whereClause)
      .orderBy(orderBy)
      .limit(Number(limit))
      .offset(Number(offset))

    // Get total count
    const [{ count: totalCount }] = await db
      .select({ count: count() })
      .from(webinarEventsInDinda)
      .where(whereClause)

    return {
      success: true,
      data: webinarEvents,
      pagination: {
        total: totalCount,
        limit: Number(limit),
        offset: Number(offset),
        totalPages: Math.ceil(totalCount / Number(limit))
      }
    }
  } catch (error) {
    console.error('Error fetching webinar events:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to fetch webinar events'
    })
  }
})