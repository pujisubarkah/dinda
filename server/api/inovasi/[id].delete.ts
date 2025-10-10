import { db, inovasiInDinda } from '~/lib/db'
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

    const [deletedInovasi] = await db.delete(inovasiInDinda)
      .where(eq(inovasiInDinda.id, parseInt(id)))
      .returning()

    if (!deletedInovasi) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Inovasi not found'
      })
    }

    return {
      success: true,
      message: 'Inovasi deleted successfully'
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete inovasi data'
    })
  }
})