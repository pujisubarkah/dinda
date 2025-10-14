import { db, sdgsInDinda } from '~/lib/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const sdgsData = await db.select().from(sdgsInDinda)
    
    // Debug log to check SDGs structure
    console.log('SDGs API - Total records:', sdgsData.length)
    if (sdgsData.length > 0) {
      console.log('SDGs API - Sample record:', sdgsData[0])
    }
    
    return {
      success: true,
      data: sdgsData
    }
  } catch (error) {
    console.error('SDGs API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch SDGs data'
    })
  }
})