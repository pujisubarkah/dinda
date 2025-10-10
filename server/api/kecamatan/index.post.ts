import { db, kecamatanInDinda } from '~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const [newKecamatan] = await db.insert(kecamatanInDinda)
      .values({
        id: body.id,
        nama: body.nama
      })
      .returning()

    return {
      success: true,
      data: newKecamatan
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create kecamatan data'
    })
  }
})