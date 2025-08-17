<script setup>
definePageMeta({ layout: 'admin' })
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-green-800">🏠 Dashboard Admin DINDA</h1>
      <p class="text-yellow-600 mt-2">Selamat datang di dashboard admin. Pantau, kelola, dan analisis inovasi daerah secara terpusat.</p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <div class="bg-gradient-to-br from-green-200 to-green-400 border-2 border-green-600 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-green-800">156</h2>
        <p class="text-base text-green-900 font-semibold">Total Inovasi</p>
      </div>
      <div class="bg-gradient-to-br from-yellow-100 to-yellow-400 border-2 border-yellow-400 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-yellow-700">12</h2>
        <p class="text-base text-yellow-900 font-semibold">Bulan Ini</p>
      </div>
      <div class="bg-gradient-to-br from-blue-100 to-blue-400 border-2 border-blue-400 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-blue-800">8</h2>
        <p class="text-base text-blue-900 font-semibold">Terjadwal</p>
      </div>
      <div class="bg-gradient-to-br from-orange-100 to-orange-400 border-2 border-orange-400 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-orange-800">24</h2>
        <p class="text-base text-orange-900 font-semibold">Dibagikan</p>
      </div>
    </div>

    <!-- Navigation Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      <NuxtLink to="/admin/statistik_inovasi" class="bg-white border-2 border-green-600 rounded-xl shadow-lg p-8 flex flex-col items-center hover:bg-green-50 transition">
        <span class="text-4xl mb-2">📊</span>
        <h3 class="font-bold text-green-700 mb-2">Statistik Inovasi</h3>
        <p class="text-gray-600 text-center">Lihat statistik, grafik, dan performa inovasi daerah.</p>
      </NuxtLink>
      <NuxtLink to="/admin/status_inkubasi" class="bg-white border-2 border-yellow-400 rounded-xl shadow-lg p-8 flex flex-col items-center hover:bg-yellow-50 transition">
        <span class="text-4xl mb-2">🚀</span>
        <h3 class="font-bold text-yellow-700 mb-2">Status Inkubasi</h3>
        <p class="text-gray-600 text-center">Pantau dan kelola status proses inkubasi inovasi.</p>
      </NuxtLink>
      <NuxtLink to="/admin/laporan" class="bg-white border-2 border-orange-400 rounded-xl shadow-lg p-8 flex flex-col items-center hover:bg-orange-50 transition">
        <span class="text-4xl mb-2">📋</span>
        <h3 class="font-bold text-orange-700 mb-2">Laporan</h3>
        <p class="text-gray-600 text-center">Generate dan kelola laporan inovasi daerah.</p>
      </NuxtLink>
    </div>

    <!-- Recent Activities -->
    <div class="bg-white border border-yellow-300 rounded-xl shadow p-6">
      <h3 class="font-semibold text-green-700 mb-4">📋 Aktivitas Terbaru</h3>
      <div class="space-y-4">
        <div class="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
          <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">U</div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">Progress Smart Lampu Jalan diperbarui dari 5% menjadi 10%</p>
            <p class="text-xs text-gray-500">2 jam lalu</p>
          </div>
          <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold">Ide Baru</span>
        </div>
        <div class="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
          <div class="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-sm font-bold">S</div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">E-Perizinan berubah status dari Ide Baru ke Sedang Proses</p>
            <p class="text-xs text-gray-500">5 jam lalu</p>
          </div>
          <span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">Sedang Proses</span>
        </div>
        <div class="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
          <div class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">N</div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">Catatan baru ditambahkan untuk Sistem Absensi Digital</p>
            <p class="text-xs text-gray-500">1 hari lalu</p>
          </div>
          <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">Uji Coba</span>
        </div>
        <div class="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
          <div class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">C</div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">Cilegon Smart City telah selesai dan siap implementasi</p>
            <p class="text-xs text-gray-500">2 hari lalu</p>
          </div>
          <span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Selesai</span>
        </div>
      </div>
    </div>
  </div>
</template>
