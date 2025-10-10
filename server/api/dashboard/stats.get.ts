import { db, inovasiInDinda, inovatorInDinda, sdgsInDinda } from '~/lib/db'
import { sql, count } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // Get total counts
    const totalInovasi = await db.select({ count: count() }).from(inovasiInDinda)
    const totalInovator = await db.select({ count: count() }).from(inovatorInDinda)
    const totalSDGs = await db.select({ count: count() }).from(sdgsInDinda)

    // Get inovasi by year
    const inovasiByYear = await db.select({
      tahun: inovasiInDinda.tahun,
      count: count()
    })
    .from(inovasiInDinda)
    .groupBy(inovasiInDinda.tahun)
    .orderBy(inovasiInDinda.tahun)

    // Get inovasi by province
    const inovasiByProvince = await db.select({
      idProvinsi: inovasiInDinda.idProvinsi,
      count: count()
    })
    .from(inovasiInDinda)
    .groupBy(inovasiInDinda.idProvinsi)
    .orderBy(inovasiInDinda.idProvinsi)

    // Get inovasi by SDGs
    const inovasiBySDGs = await db.select({
      sdgsId: sdgsInDinda.id,
      sdgsName: sdgsInDinda.sdgs,
      tujuanKe: sdgsInDinda.tujuanKe,
      count: count()
    })
    .from(inovasiInDinda)
    .leftJoin(sdgsInDinda, sql`${inovasiInDinda.sdgs} = ${sdgsInDinda.id}`)
    .groupBy(sdgsInDinda.id, sdgsInDinda.sdgs, sdgsInDinda.tujuanKe)
    .orderBy(sdgsInDinda.tujuanKe)

    return {
      success: true,
      data: {
        totals: {
          inovasi: totalInovasi[0]?.count || 0,
          inovator: totalInovator[0]?.count || 0,
          sdgs: totalSDGs[0]?.count || 0
        },
        charts: {
          inovasiByYear,
          inovasiByProvince,
          inovasiBySDGs
        }
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch dashboard data'
    })
  }
})