// POST /api/auth/register - User registration
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

  if (method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    const body = await readBody(event)
    
    // Validation
    if (!body.username || !body.name || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Username, name, and password are required'
      })
    }

    if (body.password.length < 8) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password must be at least 8 characters long'
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

    // Check if email already exists (if provided)
    if (body.email) {
      const existingEmail = await db
        .select()
        .from(usersInDinda)
        .where(eq(usersInDinda.email, body.email))
        .limit(1)

      if (existingEmail.length > 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Email already exists'
        })
      }
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(body.password, saltRounds)

    // Create new user
    const newUser = await db
      .insert(usersInDinda)
      .values({
        username: body.username,
        password: hashedPassword,
        name: body.name,
        email: body.email || null,
        nip: body.nip || null,
        role: 'user', // Default role
        phone: body.phone || null,
        opd: body.opd || null,
        position: body.position || null,
        isVerified: false, // New users need admin verification
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
      message: 'Registration successful! Please wait for admin verification before you can login.',
      data: newUser[0]
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    
    console.error('Registration error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Registration failed. Please try again.',
      data: error
    })
  }
})