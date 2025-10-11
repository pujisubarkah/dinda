// GET /api/users - Get all users
// POST /api/users - Create new user
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { usersInDinda } from '~/lib/db/schema'
import { desc, like, and, eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

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
      const { search, role, opd, limit = 50, offset = 0 } = query

      let whereConditions = []
      
      // Search in name, username, or email
      if (search && search !== '') {
        whereConditions.push(
          like(usersInDinda.name, `%${search}%`)
        )
      }
      
      // Filter by role
      if (role && role !== '') {
        whereConditions.push(eq(usersInDinda.role, role as string))
      }
      
      // Filter by OPD
      if (opd && opd !== '') {
        whereConditions.push(eq(usersInDinda.opd, opd as string))
      }

      const users = await db
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
        .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
        .orderBy(desc(usersInDinda.createdAt))
        .limit(Number(limit))
        .offset(Number(offset))

      return {
        success: true,
        data: users,
        total: users.length
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch users',
        data: error
      })
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      
      // Validation
      if (!body.username || !body.name || !body.password) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Username, name, and password are required'
        })
      }

      // Check if username already exists
      const existingUser = await db
        .select()
        .from(usersInDinda)
        .where(eq(usersInDinda.username, body.username))
        .limit(1)

      if (existingUser.length > 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Username already exists'
        })
      }

      // Hash password
      const saltRounds = 12
      const hashedPassword = await bcrypt.hash(body.password, saltRounds)

      const newUser = await db
        .insert(usersInDinda)
        .values({
          username: body.username,
          password: hashedPassword,
          name: body.name,
          email: body.email || null,
          nip: body.nip || null,
          role: body.role || 'user',
          phone: body.phone || null,
          opd: body.opd || null,
          position: body.position || null,
          isVerified: false, // New users need verification
          isActive: true
        })
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
          createdAt: usersInDinda.createdAt
        })

      return {
        success: true,
        data: newUser[0],
        message: 'User created successfully. Please wait for admin verification.'
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create user',
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