import { chatMessagesInDinda, usersInDinda } from '~/lib/db/schema'
import { db } from '~/lib/db'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'

// JWT Secret (same as /api/auth/me)
const JWT_SECRET = process.env.JWT_SECRET || 'dinda-cilegon-secret-key-2024'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  if (method === 'GET') {
    const query = getQuery(event)
    const room = query.room || 'global'

    // Fetch messages for room with user info
    const rows = await db.select()
      .from(chatMessagesInDinda)
      .leftJoin(usersInDinda, eq(chatMessagesInDinda.userId, usersInDinda.id))
      .where(eq(chatMessagesInDinda.room, String(room)))
      .orderBy(chatMessagesInDinda.createdAt)

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