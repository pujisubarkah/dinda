// GET /api/master-opd - Get all OPD
// POST /api/master-opd - Create new OPD
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { opdInDinda } from '~/lib/db/schema'
import { desc, like, and } from 'drizzle-orm'

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
      const { search, limit = 50, offset = 0 } = query

      let whereConditions = []
      
      // Search in nama_opd or kepala_dinas
      if (search && search !== '') {
        whereConditions.push(
          like(opdInDinda.namaOpd, `%${search}%`)
        )
      }

      const opdList = await db
        .select()
        .from(opdInDinda)
        .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
        .orderBy(desc(opdInDinda.createdAt))
        .limit(Number(limit))
        .offset(Number(offset))

      return {
        success: true,
        data: opdList,
        total: opdList.length
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch OPD data',
        data: error
      })
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      
      // Validation
      if (!body.namaOpd) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Nama OPD is required'
        })
      }

      const newOpd = await db
        .insert(opdInDinda)
        .values({
          namaOpd: body.namaOpd,
          kepalaDinas: body.kepalaDinas || null
        })
        .returning()

      return {
        success: true,
        data: newOpd[0],
        message: 'OPD created successfully'
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create OPD',
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