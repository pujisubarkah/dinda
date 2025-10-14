import { inovasiInDinda, inovatorInDinda } from '~/lib/db/schema';
import { db } from '~/lib/db';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    // Join inovasi with inovator only (skip SDGs for now to avoid column issues)
    const inovasi = await db.select()
      .from(inovasiInDinda)
      .leftJoin(inovatorInDinda, eq(inovasiInDinda.inovatorId, inovatorInDinda.id));

    // Format response
    const data = inovasi.map(row => {
      const { inovasi: inovasiRow, inovator: inovatorRow } = row;
      return {
        id: inovasiRow.id,
        judulInovasi: inovasiRow.judulInovasi,
        urusan: inovasiRow.urusan,
        deskripsi: inovasiRow.deskripsi,
        tahun: inovasiRow.tahun,
        inovator: inovasiRow.inovator,
        sdgs: inovasiRow.sdgs,
        inovatorId: inovasiRow.inovatorId,
        inovatorData: inovatorRow ? {
          id: inovatorRow.id,
          inovator: inovatorRow.inovator,
          longlat: inovatorRow.longlat,
          alamat: inovatorRow.alamat,
          // Debug info
          hasCoordinates: !!inovatorRow.longlat,
          coordinateFormat: inovatorRow.longlat
        } : null,
      };
    });
    
    return { 
      success: true, 
      data,
      debug: {
        totalRecords: data.length,
        recordsWithCoordinates: data.filter(item => item.inovatorData?.longlat).length,
        sampleCoordinates: data.filter(item => item.inovatorData?.longlat).slice(0, 5).map(item => ({
          title: item.judulInovasi,
          coordinates: item.inovatorData!.longlat,
          inovator: item.inovatorData!.inovator
        }))
      }
    };
  } catch (error: any) {
    console.error('Debug API Error:', error);
    return {
      success: false,
      error: error?.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    }
  }
})