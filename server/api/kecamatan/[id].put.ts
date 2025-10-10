import { db, kecamatanInDinda } from '~/lib/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID is required'
      })
    }

    const [updatedKecamatan] = await db.update(kecamatanInDinda)
      .set({
        nama: body.nama
      })
      .where(eq(kecamatanInDinda.id, parseInt(id)))
      .returning()

    if (!updatedKecamatan) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Kecamatan not found'
      })
    }

    return {
      success: true,
      data: updatedKecamatan
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update kecamatan data'
    })
  }
})