<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <h1 class="text-3xl font-bold text-green-800 mb-8">Daftar Inovasi Saya</h1>
    
    <div class="mb-6 flex justify-between items-center">
      <div class="flex space-x-4">
        <select class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
          <option>Semua Kategori</option>
          <option>Teknologi</option>
          <option>Digital</option>
          <option>Lingkungan</option>
          <option>Pertanian</option>
        </select>
        <select class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
          <option>Semua Status</option>
          <option>Draft</option>
          <option>Submitted</option>
          <option>Approved</option>
        </select>
      </div>
      <NuxtLink to="/user/input-inkubasi" class="bg-yellow-400 text-green-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
        + Tambah Inovasi
      </NuxtLink>
    </div>

    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <table class="min-w-full">
        <thead class="bg-green-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Judul</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Kategori</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Tanggal</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(inovasi, index) in daftarInovasi" :key="index" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ inovasi.judul }}</div>
              <div class="text-sm text-gray-500">{{ inovasi.deskripsi }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                {{ inovasi.kategori }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(inovasi.status)" class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ inovasi.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ inovasi.tanggal }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
              <button class="text-green-600 hover:text-green-900">Edit</button>
              <button class="text-blue-600 hover:text-blue-900">Detail</button>
              <button class="text-red-600 hover:text-red-900">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const daftarInovasi = [
  {
    judul: "Smart City Dashboard",
    deskripsi: "Dashboard monitoring kota pintar",
    kategori: "Teknologi",
    status: "Draft",
    tanggal: "2024-10-15"
  },
  {
    judul: "E-Government Portal",
    deskripsi: "Portal layanan pemerintahan digital",
    kategori: "Digital",
    status: "Submitted",
    tanggal: "2024-10-10"
  },
  {
    judul: "Waste Management System",
    deskripsi: "Sistem pengelolaan sampah terintegrasi",
    kategori: "Lingkungan",
    status: "Approved",
    tanggal: "2024-10-05"
  }
]

const getStatusClass = (status) => {
  switch(status) {
    case 'Approved': return 'bg-green-100 text-green-800'
    case 'Submitted': return 'bg-yellow-100 text-yellow-800'
    case 'Draft': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}
</script>