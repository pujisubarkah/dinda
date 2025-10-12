import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { rencanaAksiInDinda } from '~/lib/db/schema';
import { eq } from 'drizzle-orm';

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
  const id = Number(event.context.params?.id);
  if (!id) return { success: false, error: 'ID is required' };

  if (method === 'GET') {
    try {
      const data = await db.select().from(rencanaAksiInDinda).where(eq(rencanaAksiInDinda.id, id));
      return { success: true, data: data[0] };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event);
      const updated = await db.update(rencanaAksiInDinda)
        .set(body)
        .where(eq(rencanaAksiInDinda.id, id))
        .returning();
      return { success: true, data: updated[0] };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  if (method === 'DELETE') {
    try {
      await db.delete(rencanaAksiInDinda).where(eq(rencanaAksiInDinda.id, id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  return {
    success: false,
    error: 'Method not allowed',
  };
});
