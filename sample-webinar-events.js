// Script untuk menambahkan sample data webinar_events
// Jalankan dengan: node sample-webinar-events.js

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { webinarEventsInDinda } from './lib/db/schema.js'

const DATABASE_URL = process.env.DATABASE_URL || 'your-database-url-here'

if (!DATABASE_URL || DATABASE_URL === 'your-database-url-here') {
  console.error('Please set DATABASE_URL environment variable')
  process.exit(1)
}

const sql = postgres(DATABASE_URL)
const db = drizzle(sql)

const sampleData = [
  {
    kodeEvent: 'WEB-001',
    title: 'Transformasi Digital dalam Pelayanan Publik',
    description: 'Webinar tentang implementasi teknologi digital untuk meningkatkan kualitas pelayanan publik di era modern. Membahas strategi, tantangan, dan best practices dalam transformasi digital.',
    imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    category: 'Teknologi',
    dateStart: new Date('2024-12-20T09:00:00Z'),
    dateEnd: new Date('2024-12-20T11:00:00Z'),
    durationHours: 2,
    platform: 'Zoom Meeting',
    meetingLink: 'https://zoom.us/j/1234567890',
    speaker: 'Dr. Ahmad Wijaya, M.T.',
    organizer: 'Kementerian Komunikasi dan Informatika',
    status: 'upcoming',
    totalParticipants: 150
  },
  {
    kodeEvent: 'WEB-002',
    title: 'Inovasi Pelayanan Kesehatan Berbasis AI',
    description: 'Diskusi mendalam tentang penerapan artificial intelligence dalam sistem pelayanan kesehatan untuk meningkatkan efisiensi dan akurasi diagnosis.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    category: 'Kesehatan',
    dateStart: new Date('2024-12-25T13:00:00Z'),
    dateEnd: new Date('2024-12-25T16:00:00Z'),
    durationHours: 3,
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    speaker: 'Prof. Dr. Siti Nurhaliza, Sp.KJ',
    organizer: 'Kementerian Kesehatan RI',
    status: 'active',
    totalParticipants: 89
  },
  {
    kodeEvent: 'WEB-003',
    title: 'Smart City dan Sustainable Development',
    description: 'Webinar series tentang konsep smart city dalam mendukung pembangunan berkelanjutan. Membahas implementasi IoT, big data, dan green technology.',
    imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=600&fit=crop',
    category: 'Lingkungan',
    dateStart: new Date('2024-11-15T10:00:00Z'),
    dateEnd: new Date('2024-11-15T15:00:00Z'),
    durationHours: 5,
    platform: 'Microsoft Teams',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/xyz',
    speaker: 'Ir. Bambang Santoso, M.Sc',
    organizer: 'Kementerian PPN/Bappenas',
    status: 'completed',
    totalParticipants: 245
  },
  {
    kodeEvent: 'WEB-004',
    title: 'Blockchain untuk Transparansi Pemerintahan',
    description: 'Eksplorasi penggunaan teknologi blockchain dalam meningkatkan transparansi dan akuntabilitas pemerintahan digital.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    category: 'Teknologi',
    dateStart: new Date('2025-01-10T14:00:00Z'),
    dateEnd: new Date('2025-01-10T17:00:00Z'),
    durationHours: 3,
    platform: 'Zoom Webinar',
    meetingLink: 'https://zoom.us/w/9876543210',
    speaker: 'Dr. Maya Sari, Ph.D',
    organizer: 'BSN (Badan Siber dan Sandi Negara)',
    status: 'upcoming',
    totalParticipants: 67
  },
  {
    kodeEvent: 'WEB-005',
    title: 'E-Government dan Digitalisasi Layanan',
    description: 'Workshop komprehensif tentang implementasi e-government, dari perencanaan hingga evaluasi. Termasuk studi kasus dan best practices.',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
    category: 'Pemerintahan',
    dateStart: new Date('2024-12-28T08:00:00Z'),
    dateEnd: new Date('2024-12-28T17:00:00Z'),
    durationHours: 8,
    platform: 'Hybrid (Online + Offline)',
    meetingLink: 'https://webinar.kemendagri.go.id/egov-workshop',
    speaker: 'Tim Ahli Kemendagri',
    organizer: 'Kementerian Dalam Negeri',
    status: 'upcoming',
    totalParticipants: 320
  }
]

async function insertSampleData() {
  try {
    console.log('Inserting sample webinar events data...')
    
    const result = await db.insert(webinarEventsInDinda).values(sampleData).returning()
    
    console.log(`Successfully inserted ${result.length} webinar events:`)
    result.forEach(event => {
      console.log(`- ${event.title} (ID: ${event.id})`)
    })
    
  } catch (error) {
    console.error('Error inserting sample data:', error)
  } finally {
    await sql.end()
  }
}

insertSampleData()