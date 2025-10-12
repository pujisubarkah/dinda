// GET /api/kecamatan - Get all kecamatan data
export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  if (method !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    console.log('=== DEBUGGING KECAMATAN API ===')
    
    // Check DATABASE_URL
    const dbUrl = process.env.DATABASE_URL
    console.log('DATABASE_URL exists:', !!dbUrl)
    console.log('DATABASE_URL length:', dbUrl?.length || 0)
    
    if (!dbUrl) {
      throw new Error('DATABASE_URL environment variable is not set')
    }

    // Try importing modules
    console.log('Importing drizzle modules...')
    const { drizzle } = await import('drizzle-orm/postgres-js')
    const postgres = await import('postgres')
    console.log('Modules imported successfully')

    // Try importing schema
    console.log('Importing schema...')
    const { kecamatanInDinda } = await import('~/lib/db/schema')
    console.log('Schema imported successfully')

    // Try database connection
    console.log('Creating database connection...')
    const sql = postgres.default(dbUrl)
    const db = drizzle(sql)
    console.log('Database connection created')

    // Try simple query first
    console.log('Testing database connection with simple query...')
    const testResult = await sql`SELECT 1 as test`
    console.log('Database connection test result:', testResult)

    // Try the actual query
    console.log('Fetching kecamatan data...')
    const kecamatan = await db
      .select({
        id: kecamatanInDinda.id,
        nama: kecamatanInDinda.nama,
        svgPath: kecamatanInDinda.svgPath
      })
      .from(kecamatanInDinda)

    console.log(`Found ${kecamatan.length} kecamatan records`)
    console.log('Sample data:', kecamatan[0])

    // Close connection
    await sql.end()

    return {
      success: true,
      data: kecamatan,
      count: kecamatan.length
    }
  } catch (error: any) {
    console.error('=== DETAILED ERROR INFO ===')
    console.error('Error type:', typeof error)
    console.error('Error name:', error?.constructor?.name)
    console.error('Error message:', error?.message)
    console.error('Error stack:', error?.stack)
    console.error('Full error:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Database connection failed',
      data: {
        errorType: error?.constructor?.name,
        errorMessage: error?.message,
        timestamp: new Date().toISOString()
      }
    })
  }
})