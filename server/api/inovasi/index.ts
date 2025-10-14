import { inovasiInDinda, inovatorInDinda, sdgsInDinda } from '~/lib/db/schema';
import { db } from '~/lib/db';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    // Join inovasi with inovator and sdgs
    const inovasi = await db.select()
      .from(inovasiInDinda)
      .leftJoin(inovatorInDinda, eq(inovasiInDinda.inovatorId, inovatorInDinda.id))
      .leftJoin(sdgsInDinda, eq(inovasiInDinda.sdgs, sdgsInDinda.id));

    // Format response: only selected fields from inovasi, nest inovator and sdgs data
    const data = inovasi.map(row => {
      const { inovasi: inovasiRow, inovator: inovatorRow, sdgs: sdgsRow } = row;
      return {
        id: inovasiRow.id,
        judulInovasi: inovasiRow.judulInovasi,
        urusan: inovasiRow.urusan,
        deskripsi: inovasiRow.deskripsi,
        tahun: inovasiRow.tahun,
        inovator: inovasiRow.inovator,
        sdgs: inovasiRow.sdgs,
        inovatorId: inovasiRow.inovatorId,
        thumbUrl: inovasiRow.thumbUrl,
        videoUrl: inovasiRow.videoUrl,
        inovatorData: inovatorRow || null,
        sdgsData: sdgsRow || null,
      };
    });
    return { success: true, data };
  }

  if (method === 'POST') {
    const body = await readBody(event);
    // Only allow fields that exist in schema
    const allowed = {
      id: body.id,
      createdAt: body.createdAt,
      judulInovasi: body.judulInovasi,
      kld: body.kld,
      urusan: body.urusan,
      deskripsi: body.deskripsi,
      tahun: body.tahun,
      idProvinsi: body.idProvinsi,
      idKabkot: body.idKabkot,
      inovator: body.inovator,
      sdgs: body.sdgs,
      agencyIdPanrb: body.agencyIdPanrb,
      inovatorId: body.inovatorId,
      idKecamatan: body.idKecamatan,
      thumbUrl: body.thumbUrl,
      videoUrl: body.videoUrl,
    };
    const inserted = await db.insert(inovasiInDinda).values(allowed).returning();
    return { success: true, data: inserted[0] };
  }

  return { success: false, error: 'Method not allowed' };
});
