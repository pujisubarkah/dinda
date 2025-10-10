import { db, kecamatanInDinda } from '~/lib/db'
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

    const [deletedKecamatan] = await db.delete(kecamatanInDinda)
      .where(eq(kecamatanInDinda.id, parseInt(id)))
      .returning()

    if (!deletedKecamatan) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Kecamatan not found'
      })
    }

    return {
      success: true,
      message: 'Kecamatan deleted successfully'
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete kecamatan data'
    })
  }
})