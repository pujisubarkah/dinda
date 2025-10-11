// GET /api/users/[id] - Get user by ID
// PUT /api/users/[id] - Update user by ID  
// DELETE /api/users/[id] - Delete user by ID
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { usersInDinda } from '~/lib/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

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
      statusMessage: 'Invalid user ID'
    })
  }

  const userId = Number(id)

  if (method === 'GET') {
    try {
      const user = await db
        .select({
          id: usersInDinda.id,
          username: usersInDinda.username,
          name: usersInDinda.name,
          email: usersInDinda.email,
          nip: usersInDinda.nip,
          role: usersInDinda.role,
          phone: usersInDinda.phone,
          opd: usersInDinda.opd,
          position: usersInDinda.position,
          isVerified: usersInDinda.isVerified,
          isActive: usersInDinda.isActive,
          lastLogin: usersInDinda.lastLogin,
          createdAt: usersInDinda.createdAt,
          updatedAt: usersInDinda.updatedAt
        })
        .from(usersInDinda)
        .where(eq(usersInDinda.id, userId))
        .limit(1)

      if (user.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'User not found'
        })
      }

      return {
        success: true,
        data: user[0]
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch user',
        data: error
      })
    }
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event)
      
      // Check if user exists
      const existingUser = await db
        .select()
        .from(usersInDinda)
        .where(eq(usersInDinda.id, userId))
        .limit(1)

      if (existingUser.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'User not found'
        })
      }

      // Check if username is being changed and if it already exists
      if (body.username && body.username !== existingUser[0].username) {
        const usernameExists = await db
          .select()
          .from(usersInDinda)
          .where(eq(usersInDinda.username, body.username))
          .limit(1)

        if (usernameExists.length > 0) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Username already exists'
          })
        }
      }

      // Prepare update data
      const updateData: any = {
        username: body.username || existingUser[0].username,
        name: body.name || existingUser[0].name,
        email: body.email !== undefined ? body.email : existingUser[0].email,
        nip: body.nip !== undefined ? body.nip : existingUser[0].nip,
        role: body.role !== undefined ? body.role : existingUser[0].role,
        phone: body.phone !== undefined ? body.phone : existingUser[0].phone,
        opd: body.opd !== undefined ? body.opd : existingUser[0].opd,
        position: body.position !== undefined ? body.position : existingUser[0].position,
        isVerified: body.isVerified !== undefined ? body.isVerified : existingUser[0].isVerified,
        isActive: body.isActive !== undefined ? body.isActive : existingUser[0].isActive,
        updatedAt: new Date()
      }

      // Hash new password if provided
      if (body.password) {
        const saltRounds = 12
        updateData.password = await bcrypt.hash(body.password, saltRounds)
      }

      const updatedUser = await db
        .update(usersInDinda)
        .set(updateData)
        .where(eq(usersInDinda.id, userId))
        .returning({
          id: usersInDinda.id,
          username: usersInDinda.username,
          name: usersInDinda.name,
          email: usersInDinda.email,
          nip: usersInDinda.nip,
          role: usersInDinda.role,
          phone: usersInDinda.phone,
          opd: usersInDinda.opd,
          position: usersInDinda.position,
          isVerified: usersInDinda.isVerified,
          isActive: usersInDinda.isActive,
          lastLogin: usersInDinda.lastLogin,
          createdAt: usersInDinda.createdAt,
          updatedAt: usersInDinda.updatedAt
        })

      return {
        success: true,
        data: updatedUser[0],
        message: 'User updated successfully'
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update user',
        data: error
      })
    }
  }

  if (method === 'DELETE') {
    try {
      // Check if user exists
      const existingUser = await db
        .select()
        .from(usersInDinda)
        .where(eq(usersInDinda.id, userId))
        .limit(1)

      if (existingUser.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'User not found'
        })
      }

      await db
        .delete(usersInDinda)
        .where(eq(usersInDinda.id, userId))

      return {
        success: true,
        message: 'User deleted successfully'
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete user',
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