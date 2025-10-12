// GET /api/ide-inovasi - Get all ide inovasi
// POST /api/ide-inovasi - Create new ide inovasi
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { ideInovasiInDinda, usersInDinda } from '~/lib/db/schema'
import { desc, like, and, eq } from 'drizzle-orm'

// Database connection
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

const sql = postgres(process.env.DATABASE_URL)
const db = drizzle(sql)

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  if (method === 'GET') {
    try {
      const query = getQuery(event)
      const { search, created_by, limit = 50, offset = 0 } = query

      let whereConditions = []
      
      // Search in ide_inovasi, deskripsi_singkat, or latar_belakang
      if (search && search !== '') {
        whereConditions.push(
          like(ideInovasiInDinda.ideInovasi, `%${search}%`)
        )
      }
      
      // Filter by creator
      if (created_by && created_by !== '') {
        whereConditions.push(eq(ideInovasiInDinda.createdBy, Number(created_by)))
      }

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
          // Include creator info
          creatorName: usersInDinda.name,
          creatorOpd: usersInDinda.opd,
        })
        .from(ideInovasiInDinda)
        .leftJoin(usersInDinda, eq(ideInovasiInDinda.createdBy, usersInDinda.id))
        .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
        .orderBy(desc(ideInovasiInDinda.createdAt))
        .limit(Number(limit))
        .offset(Number(offset))

      return {
        success: true,
        data: ideInovasiList,
        total: ideInovasiList.length
      }
    } catch (error) {
      console.error('Error fetching ide inovasi:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch ide inovasi',
        data: error
      })
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      
      // Validation
      if (!body.ide_inovasi) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Ide inovasi is required'
        })
      }

      if (!body.created_by) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Created by (user ID) is required'
        })
      }

      // Verify user exists
      const userExists = await db
        .select()
        .from(usersInDinda)
        .where(eq(usersInDinda.id, Number(body.created_by)))
        .limit(1)

      if (userExists.length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid user ID'
        })
      }

      const newIdeInovasi = await db
        .insert(ideInovasiInDinda)
        .values({
          latarBelakang: body.latar_belakang || null,
          ideInovasi: body.ide_inovasi,
          stakeholderInovasi: body.stakeholder_inovasi || null,
          sumberDaya: body.sumber_daya || null,
          penerimaManfaat: body.penerima_manfaat || null,
          deskripsiSingkat: body.deskripsi_singkat || null,
          keterangan: body.keterangan || null,
          kebaruan: body.kebaruan || null,
          createdBy: Number(body.created_by)
        })
        .returning()

      return {
        success: true,
        data: newIdeInovasi[0],
        message: 'Ide inovasi created successfully'
      }
    } catch (error) {
      console.error('Error creating ide inovasi:', error)
      
      if (typeof error === 'object' && error !== null && 'statusCode' in error) {
        throw error
      }
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create ide inovasi',
        data: error
      })
    }
  }

  // Method not allowed
  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})