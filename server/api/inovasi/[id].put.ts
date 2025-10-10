import { db, inovasiInDinda } from '~/lib/db'
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

    const [updatedInovasi] = await db.update(inovasiInDinda)
      .set({
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
      .where(eq(inovasiInDinda.id, parseInt(id)))
      .returning()

    if (!updatedInovasi) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Inovasi not found'
      })
    }

    return {
      success: true,
      data: updatedInovasi
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update inovasi data'
    })
  }
})