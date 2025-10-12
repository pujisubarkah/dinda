import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { ideInovasiInDinda, usersInDinda } from '~/lib/db/schema'
import { desc, eq } from 'drizzle-orm'

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL environment variable is required')
}
const sql = postgres(process.env.DATABASE_URL)
const db = drizzle(sql)

export default defineEventHandler(async (event) => {
	const { created_by } = event.context.params || {}
	if (!created_by) {
		throw createError({ statusCode: 400, statusMessage: 'Missing created_by param' })
	}
	try {
		const ideInovasiList = await db
			.select({
				id: ideInovasiInDinda.id,
				latarBelakang: ideInovasiInDinda.latarBelakang,
				ideInovasi: ideInovasiInDinda.ideInovasi,
				stakeholderInovasi: ideInovasiInDinda.stakeholderInovasi,
				sumberDaya: ideInovasiInDinda.sumberDaya,
				penerimaManfaat: ideInovasiInDinda.penerimaManfaat,
				deskripsiSingkat: ideInovasiInDinda.deskripsiSingkat,
				keterangan: ideInovasiInDinda.keterangan,
				kebaruan: ideInovasiInDinda.kebaruan,
				createdBy: ideInovasiInDinda.createdBy,
				createdAt: ideInovasiInDinda.createdAt,
				updatedAt: ideInovasiInDinda.updatedAt,
				creatorName: usersInDinda.name,
				creatorOpd: usersInDinda.opd,
			})
			.from(ideInovasiInDinda)
			.leftJoin(usersInDinda, eq(ideInovasiInDinda.createdBy, usersInDinda.id))
			.where(eq(ideInovasiInDinda.createdBy, Number(created_by)))
			.orderBy(desc(ideInovasiInDinda.createdAt))

		return {
			success: true,
			data: ideInovasiList,
			total: ideInovasiList.length
		}
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to fetch ide inovasi by user',
			data: error
		})
	}
})
