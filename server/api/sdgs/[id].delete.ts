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

    const [deletedSdgs] = await db.delete(sdgsInDinda)
      .where(eq(sdgsInDinda.id, parseInt(id)))
      .returning()

    if (!deletedSdgs) {
      throw createError({
        statusCode: 404,
        statusMessage: 'SDGs not found'
      })
    }

    return {
      success: true,
      message: 'SDGs deleted successfully'
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete SDGs data'
    })
  }
})