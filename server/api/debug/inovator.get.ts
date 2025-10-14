import { db, inovatorInDinda } from '~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    // Get all inovator data to see coordinates
    const inovator = await db.select().from(inovatorInDinda)
    
    return {
      success: true,
      data: inovator,
      count: inovator.length
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch inovator data'
    })
  }
})