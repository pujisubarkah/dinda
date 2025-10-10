import { db, inovatorInDinda } from '~/lib/db'
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

    const [inovator] = await db.select()
      .from(inovatorInDinda)
      .where(eq(inovatorInDinda.id, parseInt(id)))

    if (!inovator) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Inovator not found'
      })
    }

    return {
      success: true,
      data: inovator
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch inovator data'
    })
  }
})