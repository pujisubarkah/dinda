// POST /api/auth/login - User login
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { usersInDinda } from '~/lib/db/schema'
import { eq, or } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Database connection
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

const sql = postgres(process.env.DATABASE_URL)
const db = drizzle(sql)

// JWT Secret (in production, this should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'dinda-cilegon-secret-key-2024'

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
    if (!body.username || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Username and password are required'
      })
    }

    // Find user by username or email
    const users = await db
      .select()
      .from(usersInDinda)
      .where(
        or(
          eq(usersInDinda.username, body.username),
          eq(usersInDinda.email, body.username)
        )
      )
      .limit(1)

    if (users.length === 0) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid username or password'
      })
    }

    const user = users[0]

    // Check if user is active
    if (!user.isActive) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Account is deactivated. Please contact administrator.'
      })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(body.password, user.password)
    
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid username or password'
      })
    }

    // Update last login
    await db
      .update(usersInDinda)
      .set({ 
        lastLogin: new Date(),
        updatedAt: new Date()
      })
      .where(eq(usersInDinda.id, user.id))

    // Generate JWT token
    const tokenPayload = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      opd: user.opd,
      isVerified: user.isVerified
    }

    const token = jwt.sign(tokenPayload, JWT_SECRET, { 
      expiresIn: '7d' // Token expires in 7 days
    })

    // Return user data (without password) and token
    return {
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          nip: user.nip,
          role: user.role,
          phone: user.phone,
          opd: user.opd,
          position: user.position,
          isVerified: user.isVerified,
          isActive: user.isActive,
          lastLogin: new Date(),
          createdAt: user.createdAt
        },
        token: token,
        expiresIn: '7d'
      }
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    
    console.error('Login error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Login failed. Please try again.',
      data: error
    })
  }
})