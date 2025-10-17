import { chatMessagesInDinda, usersInDinda } from '~/lib/db/schema'
import { db } from '~/lib/db'
import { eq, sql } from 'drizzle-orm'
import jwt from 'jsonwebtoken'

// JWT Secret (same as /api/auth/me)
const JWT_SECRET = process.env.JWT_SECRET || 'dinda-cilegon-secret-key-2024'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  if (method === 'GET') {
    const query = getQuery(event)
    const room = query.room || 'global'

    // Require Authorization header with Bearer token for reading messages
    const authHeader = getHeader(event, 'authorization') || ''
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return createError({ statusCode: 401, statusMessage: 'Authentication required' })
    }

    const token = authHeader.substring(7)
    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (err) {
      return createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
    }

    const userIdFromToken = decoded?.id ? Number(decoded.id) : null
    if (!userIdFromToken) {
      return createError({ statusCode: 401, statusMessage: 'Invalid token payload' })
    }

    // Get user role
    const userRows = await db.select({ role: usersInDinda.role })
      .from(usersInDinda)
      .where(eq(usersInDinda.id, userIdFromToken))
      .limit(1)

    if (userRows.length === 0) {
      return createError({ statusCode: 401, statusMessage: 'User not found' })
    }

    const userRole = userRows[0].role

    let messagesQuery = db.select()
      .from(chatMessagesInDinda)
      .leftJoin(usersInDinda, eq(chatMessagesInDinda.userId, usersInDinda.id))
      .where(eq(chatMessagesInDinda.room, String(room)))
      .orderBy(chatMessagesInDinda.createdAt)

    // If not admin, only show messages from current user and admin messages
    if (userRole !== 'admin') {
      // Get admin user IDs
      const adminUsers = await db.select({ id: usersInDinda.id })
        .from(usersInDinda)
        .where(eq(usersInDinda.role, 'admin'))

      const adminIds = adminUsers.map(u => u.id)
      adminIds.push(userIdFromToken) // Include current user

      messagesQuery = db.select()
        .from(chatMessagesInDinda)
        .leftJoin(usersInDinda, eq(chatMessagesInDinda.userId, usersInDinda.id))
        .where(sql`${chatMessagesInDinda.room} = ${String(room)} AND ${chatMessagesInDinda.userId} IN (${adminIds.join(',')})`)
        .orderBy(chatMessagesInDinda.createdAt)
    }

    const rows = await messagesQuery
    const data = rows.map(r => ({
      ...r.chat_messages,
      user: r.users || null
    }))

    return { success: true, data }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const room = body.room || 'global'
    const message = body.message
    const metadata = body.metadata || null

    if (!message || typeof message !== 'string') {
      return createError({ statusCode: 400, statusMessage: 'message is required' })
    }

    // Require Authorization header with Bearer token
    const authHeader = getHeader(event, 'authorization') || ''
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return createError({ statusCode: 401, statusMessage: 'Authentication required' })
    }

    const token = authHeader.substring(7)
    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (err) {
      return createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
    }

    const userIdFromToken = decoded?.id ? Number(decoded.id) : null
    if (!userIdFromToken) {
      return createError({ statusCode: 401, statusMessage: 'Invalid token payload' })
    }

    // Insert message using user from token
    const inserted = await db.insert(chatMessagesInDinda).values({
      room: String(room),
      userId: userIdFromToken,
      message: message,
      metadata: metadata,
    }).returning()

    const created = inserted[0]
    return { success: true, data: created }
  }

  throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
})