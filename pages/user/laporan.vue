<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <h1 class="text-3xl font-bold text-green-800 mb-8">Laporan Inovasi</h1>
    
    <!-- Filter dan Export -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Periode</label>
          <select class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Bulan ini</option>
            <option>3 Bulan terakhir</option>
            <option>6 Bulan terakhir</option>
            <option>1 Tahun terakhir</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Semua Status</option>
            <option>Draft</option>
            <option>Submitted</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
          <select class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Semua Kategori</option>
            <option>Teknologi</option>
            <option>Digital</option>
            <option>Lingkungan</option>
            <option>Pertanian</option>
          </select>
        </div>
        <div class="flex items-end">
          <button class="w-full bg-yellow-400 text-green-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
            📊 Export PDF
          </button>
        </div>
      </div>
    </div>

    <!-- Statistik -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-full mr-4">
            <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-800">{{ statistik.total }}</p>
            <p class="text-sm text-gray-600">Total Inovasi</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-full mr-4">
            <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-800">{{ statistik.approved }}</p>
            <p class="text-sm text-gray-600">Disetujui</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 rounded-full mr-4">
            <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-800">{{ statistik.pending }}</p>
            <p class="text-sm text-gray-600">Pending</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
        <div class="flex items-center">
          <div class="p-3 bg-red-100 rounded-full mr-4">
            <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-800">{{ statistik.rejected }}</p>
            <p class="text-sm text-gray-600">Ditolak</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabel Laporan -->
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800">Detail Laporan Inovasi</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul Inovasi</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Submit</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in laporanData" :key="index" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ item.judul }}</div>
                <div class="text-sm text-gray-500">{{ item.deskripsi }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ item.kategori }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.tanggal }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(item.status)" class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{{ item.feedback }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const statistik = {
  total: 15,
  approved: 8,
  pending: 4,
  rejected: 3
}

const laporanData = [
  {
    judul: "Smart Traffic Management",
    deskripsi: "Sistem manajemen lalu lintas pintar",
    kategori: "Teknologi",
    tanggal: "2024-10-15",
    status: "Approved",
    feedback: "Inovasi sangat baik dan layak untuk diimplementasikan"
  },
  {
    judul: "Digital Document System",
    deskripsi: "Sistem dokumen digital terintegrasi",
    kategori: "Digital",
    tanggal: "2024-10-12",
    status: "Pending",
    feedback: "Sedang dalam proses review tim teknis"
  },
  {
    judul: "Green Energy Initiative",
    deskripsi: "Inisiatif energi hijau untuk perkantoran",
    kategori: "Lingkungan",
    tanggal: "2024-10-10",
    status: "Rejected",
    feedback: "Perlu perbaikan pada aspek teknis dan anggaran"
  },
  {
    judul: "Mobile Health Service",
    deskripsi: "Layanan kesehatan mobile untuk masyarakat",
    kategori: "Kesehatan",
    tanggal: "2024-10-08",
    status: "Approved",
    feedback: "Sangat inovatif dan memberikan dampak positif"
  },
  {
    judul: "Smart Waste Collection",
    deskripsi: "Sistem pengumpulan sampah pintar",
    kategori: "Lingkungan",
    tanggal: "2024-10-05",
    status: "Pending",
    feedback: "Menunggu persetujuan anggaran"
  }
]

const getStatusClass = (status) => {
  switch(status) {
    case 'Approved': return 'bg-green-100 text-green-800'
    case 'Pending': return 'bg-yellow-100 text-yellow-800'
    case 'Rejected': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}
</script>