import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { rencanaAksiInDinda } from '~/lib/db/schema';
import { desc, like, and, eq } from 'drizzle-orm';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = postgres(process.env.DATABASE_URL, {
  onnotice: () => {},
  max: 10,
});
const db = drizzle(sql);

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
        whereConditions.push(eq(rencanaAksiInDinda.status, String(status)));
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
  // Debug: tampilkan body dan ideInovasiId yang diterima
      if (!body.ideInovasiId || !body.judulAksi) {
        return {
          success: false,
          error: 'ideInovasiId dan judulAksi wajib diisi',
        };
      }
      const inserted = await db.insert(rencanaAksiInDinda).values(body).returning();
      return { success: true, data: inserted[0], message: 'Rencana aksi berhasil dibuat' };
    } catch (error: any) {
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
