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

    const [kecamatan] = await db.select()
      .from(kecamatanInDinda)
      .where(eq(kecamatanInDinda.id, parseInt(id)))

    if (!kecamatan) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Kecamatan not found'
      })
    }

    return {
      success: true,
      data: kecamatan
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch kecamatan data'
    })
  }
})