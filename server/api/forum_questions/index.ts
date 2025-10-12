// GET /api/forum_questions - Get all questions
// POST /api/forum_questions - Create new question
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { forumQuestionsInDinda } from '~/lib/db/schema'
import { desc, and, like } from 'drizzle-orm'

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
      if (search && search !== '') {
        whereConditions.push(
          like(forumQuestionsInDinda.judul, `%${search}%`)
        )
      }
      const questionList = await db
        .select()
        .from(forumQuestionsInDinda)
        .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
        .orderBy(desc(forumQuestionsInDinda.createdAt))
        .limit(Number(limit))
        .offset(Number(offset))
      return {
        success: true,
        data: questionList,
        total: questionList.length
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch questions',
        data: error
      })
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      if (!body.judul || !body.deskripsi) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Judul dan deskripsi wajib diisi'
        })
      }
      const inserted = await db
        .insert(forumQuestionsInDinda)
        .values(body)
        .returning()
      return {
        success: true,
        data: inserted[0],
        message: 'Pertanyaan berhasil dikirim'
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Gagal membuat pertanyaan',
        data: error
      })
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})
