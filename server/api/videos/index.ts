// GET /api/videos - Get all videos
// POST /api/videos - Create new video
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { videosInDinda } from '~/lib/db/schema'
import { desc, like, and, eq } from 'drizzle-orm'

// Database connection
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

console.log('🔗 Database URL configured:', process.env.DATABASE_URL ? 'Yes' : 'No')

const sql = postgres(process.env.DATABASE_URL, {
  onnotice: () => {}, // Suppress notices
  max: 10, // Connection pool size
})
const db = drizzle(sql)

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  if (method === 'GET') {
    try {
      const query = getQuery(event)
      const { category, search, limit = 10, offset = 0 } = query

      let whereConditions = []
      
      // Filter by category
      if (category && category !== '') {
        whereConditions.push(eq(videosInDinda.category, category as string))
      }
      
      // Search in title or description
      if (search && search !== '') {
        whereConditions.push(
          like(videosInDinda.title, `%${search}%`)
        )
      }

      const videos = await db
        .select()
        .from(videosInDinda)
        .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
        .orderBy(desc(videosInDinda.createdAt))
        .limit(Number(limit))
        .offset(Number(offset))

      return {
        success: true,
        data: videos,
        total: videos.length
      }
    } catch (error) {
      console.error('❌ Database error in /api/videos:', error)
      
      // Return fallback data if database fails
      const fallbackVideos = [
        {
          id: 1,
          title: "Launching SAKIP Kota Cilegon 2024",
          description: "Peluncuran Sistem Akuntabilitas Kinerja Instansi Pemerintah (SAKIP) Kota Cilegon untuk meningkatkan transparansi dan akuntabilitas pemerintahan.",
          youtubeId: "4TUD2qDslww",
          url: "https://youtu.be/4TUD2qDslww",
          category: "kegiatan",
          categoryLabel: "🎪 Kegiatan",
          date: null,
          views: 2100,
          duration: "12:34",
          createdAt: "2025-10-11T12:46:59.097Z"
        },
        {
          id: 2,
          title: "Inovasi Pelayanan Digital Kota Cilegon",
          description: "Transformasi digital pelayanan publik Kota Cilegon melalui berbagai aplikasi dan sistem online untuk kemudahan masyarakat.",
          youtubeId: "m9xJQXw2nC0",
          url: "https://youtu.be/m9xJQXw2nC0",
          category: "inovasi",
          categoryLabel: "💡 Inovasi",
          date: null,
          views: 3500,
          duration: "15:42",
          createdAt: "2025-10-11T12:46:59.097Z"
        }
      ]

      console.log('⚠️ Using fallback video data due to database error')
      
      return {
        success: true,
        data: fallbackVideos,
        total: fallbackVideos.length,
        message: 'Using fallback data - database not available'
      }
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      
      // Validation
      if (!body.title || !body.youtubeId || !body.url) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Title, YouTube ID, and URL are required'
        })
      }

      // Extract YouTube ID from URL if needed
      let youtubeId = body.youtubeId
      if (body.url && !youtubeId) {
        const urlMatch = body.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
        if (urlMatch) {
          youtubeId = urlMatch[1]
        }
      }

      const newVideo = await db
        .insert(videosInDinda)
        .values({
          title: body.title,
          description: body.description || null,
          youtubeId: youtubeId,
          url: body.url,
          category: body.category || null,
          categoryLabel: body.categoryLabel || null,
          date: body.date ? new Date(body.date) : new Date(),
          views: body.views || 0,
          duration: body.duration || null
        })
        .returning()

      return {
        success: true,
        data: newVideo[0],
        message: 'Video created successfully'
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create video',
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