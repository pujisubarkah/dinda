import { db, sdgsInDinda } from '~/lib/db'
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

    const [updatedSdgs] = await db.update(sdgsInDinda)
      .set({
        tujuanKe: body.tujuanKe,
        sdgs: body.sdgs,
        image: body.image
      })
      .where(eq(sdgsInDinda.id, parseInt(id)))
      .returning()

    if (!updatedSdgs) {
      throw createError({
        statusCode: 404,
        statusMessage: 'SDGs not found'
      })
    }

    return {
      success: true,
      data: updatedSdgs
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update SDGs data'
    })
  }
})