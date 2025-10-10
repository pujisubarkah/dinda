import { db, sdgsInDinda } from '~/lib/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const sdgs = await db.select().from(sdgsInDinda)
    return {
      success: true,
      data: sdgs
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch SDGs data'
    })
  }
})