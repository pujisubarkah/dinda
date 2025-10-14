import { inovasiInDinda, inovatorInDinda, kecamatanInDinda } from '~/lib/db/schema';
import { db } from '~/lib/db';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    // First, get inovasi with inovator (we know this works)
    const inovasi = await db.select()
      .from(inovasiInDinda)
      .leftJoin(inovatorInDinda, eq(inovasiInDinda.inovatorId, inovatorInDinda.id));

    // For now, let's use a simple approach to get specific kecamatan names
    // We'll manually map some common IDs we know exist
    const commonKecamatanNames = new Map([
      [367208, 'Citangkil'],
      [367205, 'Jombang'],
      [367207, 'Cibeber'],
      [367206, 'Pulomerak'],
      [367204, 'Purwakarta'],
      [367203, 'Grogol'],
      [367202, 'Kramatwatu'],
      [367201, 'Ciwandan']
    ]);

    // Format response with kecamatan data from map
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
          idKecamatan: inovatorRow.idKecamatan,
          // Debug info
          hasCoordinates: !!inovatorRow.longlat,
          coordinateFormat: inovatorRow.longlat,
          // Kecamatan data with manual mapping for now
          kecamatanData: {
            id: inovatorRow.idKecamatan,
            nama: commonKecamatanNames.get(inovatorRow.idKecamatan) || 'Tidak diketahui'
          }
        } : null,
      };
    });
    
    return { 
      success: true, 
      data,
      debug: {
        totalRecords: data.length,
        recordsWithCoordinates: data.filter(item => item.inovatorData?.longlat).length,
        recordsWithKecamatan: data.filter(item => item.inovatorData?.idKecamatan).length,
        sampleCoordinates: data.filter(item => item.inovatorData?.longlat).slice(0, 5).map(item => ({
          title: item.judulInovasi,
          coordinates: item.inovatorData!.longlat,
          inovator: item.inovatorData!.inovator,
          kecamatanId: item.inovatorData!.idKecamatan
        })),
        sampleKecamatan: data.slice(0, 10).map(item => ({
          title: item.judulInovasi,
          inovator: item.inovatorData?.inovator,
          kecamatanId: item.inovatorData?.idKecamatan
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