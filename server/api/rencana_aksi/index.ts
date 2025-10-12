import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { rencanaAksiInDinda } from '~/lib/db/schema';
import { desc, like, and, eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = postgres(process.env.DATABASE_URL, {
  onnotice: () => {},
  max: 10,
});
const db = drizzle(sql);

// JWT Secret (should match /api/auth/login and /api/auth/me)
const JWT_SECRET = process.env.JWT_SECRET || 'dinda-cilegon-secret-key-2024';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    try {
      const query = getQuery(event);
      const { ide_inovasi_id, search, limit = 10, offset = 0, status } = query;
      let whereConditions = [];
      if (ide_inovasi_id) {
        whereConditions.push(eq(rencanaAksiInDinda.ideInovasiId, Number(ide_inovasi_id)));
      }
      if (status) {
        whereConditions.push(eq(rencanaAksiInDinda.tahap, String(status)));
      }
      if (search && search !== '') {
        whereConditions.push(like(rencanaAksiInDinda.judulAksi, `%${search}%`));
      }
      const data = await db
        .select()
        .from(rencanaAksiInDinda)
        .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
        .orderBy(desc(rencanaAksiInDinda.createdAt))
        .limit(Number(limit))
        .offset(Number(offset));
      return { success: true, data, total: data.length };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event);

      // createdBy sekarang diisi dari frontend (localStorage user.id)

      // Debug: tampilkan body dan ideInovasiId yang diterima
      if (!body.ideInovasiId || !body.judulAksi) {
        return {
          success: false,
          error: 'ideInovasiId dan judulAksi wajib diisi',
        };
      }
      // Validasi dan konversi tanggal sebelum insert
      if (typeof body.periodeMulai === 'string' && body.periodeMulai.trim() !== '') {
        const mulaiDate = new Date(body.periodeMulai);
        if (!isNaN(mulaiDate.getTime())) {
          body.periodeMulai = mulaiDate;
        } else {
          delete body.periodeMulai;
        }
      }

      if (typeof body.periodeSelesai === 'string' && body.periodeSelesai.trim() !== '') {
        const selesaiDate = new Date(body.periodeSelesai);
        if (!isNaN(selesaiDate.getTime())) {
          body.periodeSelesai = selesaiDate;
        } else {
          delete body.periodeSelesai;
        }
      }

      if (typeof body.picPelaksana === 'string' && body.picPelaksana.trim() === '') {
        delete body.picPelaksana;
      }
      if (!body.status) {
        body.status = 'draft'; // atau default lain sesuai enum
      }
      console.log("Final payload sebelum insert:", body);
      console.log('Payload yang dikirim:', body);
      const inserted = await db.insert(rencanaAksiInDinda).values(body).returning();
      return { success: true, data: inserted[0], message: 'Rencana aksi berhasil dibuat' };
    } catch (error: any) {
      console.error('DB Error Cause:', error?.dbError?.cause || error?.cause || error);
      return {
        success: false,
        error: 'Gagal membuat rencana aksi',
        message: error?.message,
        stack: error?.stack,
        dbError: error,
      };
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed',
  });
});
