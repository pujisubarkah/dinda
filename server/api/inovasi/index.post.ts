import { db, inovasiInDinda } from '~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const [newInovasi] = await db.insert(inovasiInDinda)
      .values({
        id: body.id,
        createdAt: new Date().toISOString(),
        judulInovasi: body.judulInovasi,
        kld: body.kld,
        urusan: body.urusan,
        deskripsi: body.deskripsi,
        tahun: body.tahun,
        idProvinsi: body.idProvinsi,
        idKabkot: body.idKabkot,
        inovator: body.inovator,
        sdgs: body.sdgs,
        agencyIdPanrb: body.agencyIdPanrb,
        inovatorId: body.inovatorId,
        idKecamatan: body.idKecamatan
      })
      .returning()

    return {
      success: true,
      data: newInovasi
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create inovasi data'
    })
  }
})