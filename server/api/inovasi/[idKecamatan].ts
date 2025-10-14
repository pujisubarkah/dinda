import { inovasiInDinda, inovatorInDinda } from '~/lib/db/schema';
import { db } from '~/lib/db';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const idKecamatan = event.context.params?.idKecamatan;
  if (!idKecamatan) {
    return { success: false, error: 'idKecamatan is required' };
  }

  // Join inovasi with inovator, filter by inovator.idKecamatan
  const inovasi = await db.select()
    .from(inovasiInDinda)
    .leftJoin(inovatorInDinda, eq(inovasiInDinda.inovatorId, inovatorInDinda.id))
    .where(eq(inovatorInDinda.idKecamatan, Number(idKecamatan)));

  // Format response: only selected fields from inovasi, nest inovator as 'inovatorData'
  const data = inovasi.map(row => {
    const { inovasi: inovasiRow, inovator: inovatorRow } = row;
    return {
      judulInovasi: inovasiRow.judulInovasi,
      urusan: inovasiRow.urusan,
      deskripsi: inovasiRow.deskripsi,
      tahun: inovasiRow.tahun,
      inovator: inovasiRow.inovator,
      sdgs: inovasiRow.sdgs,
      inovatorId: inovasiRow.inovatorId,
      inovatorData: inovatorRow || null,
    };
  });
  return { success: true, data };
});
