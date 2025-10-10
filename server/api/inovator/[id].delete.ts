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

    const [deletedInovator] = await db.delete(inovatorInDinda)
      .where(eq(inovatorInDinda.id, parseInt(id)))
      .returning()

    if (!deletedInovator) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Inovator not found'
      })
    }

    return {
      success: true,
      message: 'Inovator deleted successfully'
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete inovator data'
    })
  }
})