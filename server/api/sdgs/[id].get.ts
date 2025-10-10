import { db, sdgsInDinda } from '~/lib/db'
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

    const [sdgs] = await db.select()
      .from(sdgsInDinda)
      .where(eq(sdgsInDinda.id, parseInt(id)))

    if (!sdgs) {
      throw createError({
        statusCode: 404,
        statusMessage: 'SDGs not found'
      })
    }

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