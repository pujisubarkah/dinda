import { db, inovatorInDinda } from '~/lib/db'
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

    const [updatedInovator] = await db.update(inovatorInDinda)
      .set({
        inovator: body.inovator,
        agencyIdPanrb: body.agencyIdPanrb,
        idKabkot: body.idKabkot,
        idProvinsi: body.idProvinsi,
        longlat: body.longlat,
        alamat: body.alamat,
        idKecamatan: body.idKecamatan
      })
      .where(eq(inovatorInDinda.id, parseInt(id)))
      .returning()

    if (!updatedInovator) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Inovator not found'
      })
    }

    return {
      success: true,
      data: updatedInovator
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update inovator data'
    })
  }
})