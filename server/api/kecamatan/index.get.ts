import { db, kecamatanInDinda } from '~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    const kecamatan = await db.select().from(kecamatanInDinda)
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