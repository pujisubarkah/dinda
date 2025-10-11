// GET /api/ide-inovasi/[id] - Get ide inovasi by ID
// PUT /api/ide-inovasi/[id] - Update ide inovasi by ID  
// DELETE /api/ide-inovasi/[id] - Delete ide inovasi by ID
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { ideInovasiInDinda, usersInDinda } from '~/lib/db/schema'
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
      statusMessage: 'Invalid ide inovasi ID'
    })
  }

  const ideInovasiId = Number(id)

  if (method === 'GET') {
    try {
      const ideInovasi = await db
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
          creatorEmail: usersInDinda.email
        })
        .from(ideInovasiInDinda)
        .leftJoin(usersInDinda, eq(ideInovasiInDinda.createdBy, usersInDinda.id))
        .where(eq(ideInovasiInDinda.id, ideInovasiId))
        .limit(1)

      if (ideInovasi.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Ide inovasi not found'
        })
      }

      return {
        success: true,
        data: ideInovasi[0]
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error
      
      console.error('Error fetching ide inovasi:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch ide inovasi',
        data: error
      })
    }
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event)
      
      // Check if ide inovasi exists
      const existingIdeInovasi = await db
        .select()
        .from(ideInovasiInDinda)
        .where(eq(ideInovasiInDinda.id, ideInovasiId))
        .limit(1)

      if (existingIdeInovasi.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Ide inovasi not found'
        })
      }

      // Prepare update data
      const updateData: any = {
        latarBelakang: body.latar_belakang !== undefined ? body.latar_belakang : existingIdeInovasi[0].latarBelakang,
        ideInovasi: body.ide_inovasi !== undefined ? body.ide_inovasi : existingIdeInovasi[0].ideInovasi,
        stakeholderInovasi: body.stakeholder_inovasi !== undefined ? body.stakeholder_inovasi : existingIdeInovasi[0].stakeholderInovasi,
        sumberDaya: body.sumber_daya !== undefined ? body.sumber_daya : existingIdeInovasi[0].sumberDaya,
        penerimaManfaat: body.penerima_manfaat !== undefined ? body.penerima_manfaat : existingIdeInovasi[0].penerimaManfaat,
        deskripsiSingkat: body.deskripsi_singkat !== undefined ? body.deskripsi_singkat : existingIdeInovasi[0].deskripsiSingkat,
        keterangan: body.keterangan !== undefined ? body.keterangan : existingIdeInovasi[0].keterangan,
        kebaruan: body.kebaruan !== undefined ? body.kebaruan : existingIdeInovasi[0].kebaruan,
        updatedAt: new Date()
      }

      const updatedIdeInovasi = await db
        .update(ideInovasiInDinda)
        .set(updateData)
        .where(eq(ideInovasiInDinda.id, ideInovasiId))
        .returning()

      return {
        success: true,
        data: updatedIdeInovasi[0],
        message: 'Ide inovasi updated successfully'
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error
      
      console.error('Error updating ide inovasi:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update ide inovasi',
        data: error
      })
    }
  }

  if (method === 'DELETE') {
    try {
      // Check if ide inovasi exists
      const existingIdeInovasi = await db
        .select()
        .from(ideInovasiInDinda)
        .where(eq(ideInovasiInDinda.id, ideInovasiId))
        .limit(1)

      if (existingIdeInovasi.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Ide inovasi not found'
        })
      }

      await db
        .delete(ideInovasiInDinda)
        .where(eq(ideInovasiInDinda.id, ideInovasiId))

      return {
        success: true,
        message: 'Ide inovasi deleted successfully'
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error
      
      console.error('Error deleting ide inovasi:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete ide inovasi',
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