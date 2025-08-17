<template>
  <aside class="h-screen w-64 bg-gradient-to-b from-green-700 via-green-800 to-green-900 shadow-xl flex flex-col text-white">
    <!-- Logo & Title -->
    <div class="flex items-center gap-3 px-6 py-8 border-b border-yellow-400 bg-gradient-to-r from-green-600 to-yellow-500">
      <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
        <img src="/banten.png" alt="Logo Banten" class="h-8 w-auto" />
      </div>
      <div>
        <span class="text-xl font-extrabold tracking-wide text-white drop-shadow-lg">ADMIN</span>
        <div class="text-sm text-yellow-100 font-light">DINDA</div>
      </div>
    </div>

    <!-- Quick Dashboard Stats -->
    <div class="px-4 py-4 border-b border-green-600">
      <div class="grid grid-cols-2 gap-2 text-center">
        <div class="bg-green-600 rounded-lg p-2">
          <div class="text-lg font-bold text-yellow-300">156</div>
          <div class="text-xs text-green-200">Total</div>
        </div>
        <div class="bg-yellow-500 rounded-lg p-2">
          <div class="text-lg font-bold text-green-900">12</div>
          <div class="text-xs text-green-800">Bulan Ini</div>
        </div>
      </div>
    </div>

    <!-- Menu List -->
    <nav class="flex-1 py-6 px-4 space-y-3">
      <!-- Dashboard Menu -->
      <NuxtLink to="/admin" class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-green-900 transition-all duration-300 transform hover:scale-105">
        <div class="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-green-900 group-hover:bg-white transition-colors">
          <span class="text-lg">🏠</span>
        </div>
        <span class="group-hover:font-bold">Dashboard</span>
      </NuxtLink>
      
      <!-- Statistik Menu -->
      <NuxtLink to="/admin/statistik_inovasi" class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-green-900 transition-all duration-300 transform hover:scale-105">
        <div class="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center text-white group-hover:bg-white group-hover:text-blue-600 transition-colors">
          <span class="text-lg">📊</span>
        </div>
        <span class="group-hover:font-bold">Statistik Inovasi</span>
      </NuxtLink>
      
      <!-- Status Inkubasi Menu -->
      <NuxtLink to="/admin/status_inkubasi" class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-green-900 transition-all duration-300 transform hover:scale-105">
        <div class="w-8 h-8 bg-purple-400 rounded-lg flex items-center justify-center text-white group-hover:bg-white group-hover:text-purple-600 transition-colors">
          <span class="text-lg">🚀</span>
        </div>
        <span class="group-hover:font-bold">Status Inkubasi</span>
      </NuxtLink>
      
      <!-- Laporan Menu -->
      <NuxtLink to="/admin/laporan" class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-green-900 transition-all duration-300 transform hover:scale-105">
        <div class="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center text-white group-hover:bg-white group-hover:text-orange-600 transition-colors">
          <span class="text-lg">📋</span>
        </div>
        <span class="group-hover:font-bold">Laporan</span>
      </NuxtLink>
    </nav>

    <!-- Admin Profile Section -->
    <div class="px-4 py-4 border-t border-green-600">
      <div class="flex items-center gap-3 px-4 py-3 bg-green-800 rounded-lg">
        <div class="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 font-bold">
          A
        </div>
        <div>
          <div class="text-sm font-semibold text-white">Admin</div>
          <div class="text-xs text-green-300">Online</div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-6 py-4 border-t border-yellow-400 text-xs text-yellow-200 text-center bg-green-800">
      <div class="text-yellow-300 font-semibold">DINDA</div>
      <div>&copy; 2025 Prov. Banten</div>
    </div>
  </aside>
</template>

<script setup>
// No script needed for static sidebar
</script>
