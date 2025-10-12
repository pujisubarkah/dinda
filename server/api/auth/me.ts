// GET /api/auth/me - Get current user info from token
import jwt from 'jsonwebtoken'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { usersInDinda } from '~/lib/db/schema'
import { eq } from 'drizzle-orm'

// Database connection
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

const sql = postgres(process.env.DATABASE_URL)
const db = drizzle(sql)

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'dinda-cilegon-secret-key-2024'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  if (method !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    // Get token from Authorization header
    const authHeader = getHeader(event, 'authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'No token provided'
      })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify token
    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (jwtError) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid or expired token'
      })
    }

    // Get fresh user data from database
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
      .where(eq(usersInDinda.id, decoded.id))
      .limit(1)

    if (users.length === 0) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User not found'
      })
    }

    const user = users[0]

    // Check if user is still active
    if (!user.isActive) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Account is deactivated'
      })
    }

    return {
      success: true,
      data: {
        user: user,
        tokenData: {
          id: decoded.id,
          username: decoded.username,
          role: decoded.role,
          exp: decoded.exp,
          iat: decoded.iat
        }
      }
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    
    console.error('Token verification error:', error)
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication failed',
      data: error
    })
  }
})