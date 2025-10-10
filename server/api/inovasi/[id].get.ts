import { db, inovasiInDinda, inovatorInDinda, sdgsInDinda } from '~/lib/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID is required'
      })
    }

    const [inovasi] = await db.select()
      .from(inovasiInDinda)
      .leftJoin(inovatorInDinda, eq(inovasiInDinda.inovatorId, inovatorInDinda.id))
      .leftJoin(sdgsInDinda, eq(inovasiInDinda.sdgs, sdgsInDinda.id))
      .where(eq(inovasiInDinda.id, parseInt(id)))

    if (!inovasi) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Inovasi not found'
      })
    }

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