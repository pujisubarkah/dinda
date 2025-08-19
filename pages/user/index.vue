<script setup>
definePageMeta({ layout: 'user' })
const userStats = {
  inovasi: 7,
  laporan: 3,
  status: 'Aktif',
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8 bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600 flex items-center gap-4">
        <img src="/berakhlak.png" alt="Logo BerAKHLAK" class="h-10 mr-4" />
        <div>
          <h1 class="text-3xl font-bold text-green-800">👤 Dashboard User</h1>
          <p class="text-yellow-600 mt-1">Selamat datang di dashboard inovasi Anda!</p>
        </div>
      </div>

      <!-- Statistik User -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div class="bg-gradient-to-br from-green-200 to-green-400 border-2 border-green-600 rounded-xl p-6 text-center shadow-lg">
          <h2 class="text-2xl font-extrabold text-green-800">{{ userStats.inovasi }}</h2>
          <p class="text-base text-green-900 font-semibold">Inovasi Saya</p>
        </div>
        <div class="bg-gradient-to-br from-yellow-100 to-yellow-400 border-2 border-yellow-400 rounded-xl p-6 text-center shadow-lg">
          <h2 class="text-2xl font-extrabold text-yellow-700">{{ userStats.laporan }}</h2>
          <p class="text-base text-yellow-900 font-semibold">Laporan Saya</p>
        </div>
        <div class="bg-gradient-to-br from-blue-100 to-blue-400 border-2 border-blue-400 rounded-xl p-6 text-center shadow-lg">
          <h2 class="text-2xl font-extrabold text-blue-800">{{ userStats.status }}</h2>
          <p class="text-base text-blue-900 font-semibold">Status Akun</p>
        </div>
      </div>

  <!-- Navigasi Fitur User -->
  <!-- Link ke profil, inovasi, dan laporan dihapus sementara untuk menghindari error prerender -->
    </div>
  </div>
</template>
