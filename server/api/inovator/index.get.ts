import { db, inovatorInDinda } from '~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    const inovator = await db.select().from(inovatorInDinda)
    return {
      success: true,
      data: inovator
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch inovator data'
    })
  }
})