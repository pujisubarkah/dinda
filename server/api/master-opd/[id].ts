// GET /api/master-opd/[id] - Get OPD by ID
// PUT /api/master-opd/[id] - Update OPD by ID  
// DELETE /api/master-opd/[id] - Delete OPD by ID
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { opdInDinda } from '~/lib/db/schema'
import { eq } from 'drizzle-orm'

// Database connection
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

const sql = postgres(process.env.DATABASE_URL)
const db = drizzle(sql)

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')

  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid OPD ID'
    })
  }

  const opdId = Number(id)

  if (method === 'GET') {
    try {
      const opd = await db
        .select()
        .from(opdInDinda)
        .where(eq(opdInDinda.id, opdId))
        .limit(1)

      if (opd.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'OPD not found'
        })
      }

      return {
        success: true,
        data: opd[0]
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error;
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch OPD',
        data: error
      })
    }
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event)
      
      // Check if OPD exists
      const existingOpd = await db
        .select()
        .from(opdInDinda)
        .where(eq(opdInDinda.id, opdId))
        .limit(1)

      if (existingOpd.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'OPD not found'
        })
      }

      // Validation
      if (!body.namaOpd) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Nama OPD is required'
        })
      }

      const updatedOpd = await db
        .update(opdInDinda)
        .set({
          namaOpd: body.namaOpd,
          kepalaDinas: body.kepalaDinas !== undefined ? body.kepalaDinas : existingOpd[0].kepalaDinas
        })
        .where(eq(opdInDinda.id, opdId))
        .returning()

      return {
        success: true,
        data: updatedOpd[0],
        message: 'OPD updated successfully'
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error;
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update OPD',
        data: error
      })
    }
  }

  if (method === 'DELETE') {
    try {
      // Check if OPD exists
      const existingOpd = await db
        .select()
        .from(opdInDinda)
        .where(eq(opdInDinda.id, opdId))
        .limit(1)

      if (existingOpd.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'OPD not found'
        })
      }

      await db
        .delete(opdInDinda)
        .where(eq(opdInDinda.id, opdId))

      return {
        success: true,
        message: 'OPD deleted successfully'
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error;
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete OPD',
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