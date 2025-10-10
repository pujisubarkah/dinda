import { db, inovatorInDinda } from '~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const [newInovator] = await db.insert(inovatorInDinda)
      .values({
        id: body.id,
        inovator: body.inovator,
        agencyIdPanrb: body.agencyIdPanrb,
        idKabkot: body.idKabkot,
        idProvinsi: body.idProvinsi,
        longlat: body.longlat,
        alamat: body.alamat,
        idKecamatan: body.idKecamatan
      })
      .returning()

    return {
      success: true,
      data: newInovator
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create inovator data'
    })
  }
})