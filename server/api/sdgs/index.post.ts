import { db, sdgsInDinda } from '~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const [newSdgs] = await db.insert(sdgsInDinda)
      .values({
        id: body.id,
        tujuanKe: body.tujuanKe,
        sdgs: body.sdgs,
        image: body.image,
        createdAt: new Date().toISOString()
      })
      .returning()

    return {
      success: true,
      data: newSdgs
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create SDGs data'
    })
  }
})