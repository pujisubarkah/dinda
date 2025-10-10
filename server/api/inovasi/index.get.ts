import { db, inovasiInDinda, inovatorInDinda, sdgsInDinda } from '~/lib/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // Get query parameters for filtering
    const query = getQuery(event)
    
    // Simple approach - get all inovasi and their relations
    const inovasi = await db.select()
      .from(inovasiInDinda)
      .leftJoin(inovatorInDinda, eq(inovasiInDinda.inovatorId, inovatorInDinda.id))
      .leftJoin(sdgsInDinda, eq(inovasiInDinda.sdgs, sdgsInDinda.id))

    return {
      success: true,
      data: inovasi
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch inovasi data'
    })
  }
})