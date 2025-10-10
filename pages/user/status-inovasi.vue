<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <h1 class="text-3xl font-bold text-green-800 mb-8">Status Inovasi Saya</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(inovasi, index) in daftarInovasi" :key="index" 
           class="bg-white rounded-xl shadow-lg border border-yellow-300 p-6">
        <h3 class="text-xl font-semibold text-green-700 mb-3">{{ inovasi.judul }}</h3>
        <div class="space-y-2 mb-4">
          <p class="text-sm text-gray-600"><strong>Kategori:</strong> {{ inovasi.kategori }}</p>
          <p class="text-sm text-gray-600"><strong>Tanggal Submit:</strong> {{ inovasi.tanggal }}</p>
          <div class="flex items-center">
            <span class="text-sm font-medium mr-2">Status:</span>
            <span :class="getStatusClass(inovasi.status)" class="px-3 py-1 rounded-full text-xs font-semibold">
              {{ inovasi.status }}
            </span>
          </div>
        </div>
        <div class="flex justify-between">
          <button class="bg-yellow-400 text-green-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
            Detail
          </button>
          <button class="border border-green-600 text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition">
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const daftarInovasi = [
  {
    judul: "Sistem Manajemen Sampah Digital",
    kategori: "Teknologi",
    tanggal: "15 Oktober 2024",
    status: "Dalam Review"
  },
  {
    judul: "Aplikasi Layanan Publik Mobile",
    kategori: "Digital",
    tanggal: "10 Oktober 2024",
    status: "Disetujui"
  },
  {
    judul: "Smart Farming IoT",
    kategori: "Pertanian",
    tanggal: "5 Oktober 2024",
    status: "Ditolak"
  }
]

const getStatusClass = (status) => {
  switch(status) {
    case 'Disetujui': return 'bg-green-100 text-green-800'
    case 'Dalam Review': return 'bg-yellow-100 text-yellow-800'
    case 'Ditolak': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}
</script>