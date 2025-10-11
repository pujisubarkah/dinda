import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

// Database connection
const connectionString = process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/dinda_db'
const sql = postgres(connectionString, { max: 1 })
const db = drizzle(sql)

// Run migrations
async function main() {
  try {
    console.log('🚀 Starting database migration...')
    
    await migrate(db, { migrationsFolder: './drizzle' })
    
    console.log('✅ Database migration completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

main()