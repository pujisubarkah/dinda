<template>
  <aside class="h-screen w-64 bg-gradient-to-b from-green-700 via-green-800 to-yellow-500 shadow-xl flex flex-col text-white">
    <!-- Logo & Title -->
    <div class="flex items-center gap-3 px-6 py-8 border-b border-yellow-400 bg-gradient-to-r from-green-600 to-yellow-500">
      <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
        <img src="/berakhlak.png" alt="Logo BerAKHLAK" class="h-8 w-auto" />
      </div>
      <div>
        <span class="text-xl font-extrabold tracking-wide text-white drop-shadow-lg">USER</span>
        <div class="text-sm text-yellow-100 font-light">DINDA</div>
      </div>
    </div>

    <!-- Menu List -->
    <nav class="flex-1 py-6 px-4 space-y-3">
      <!-- Dashboard Menu -->
      <NuxtLink to="/user" class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-green-900 transition-all duration-300 transform hover:scale-105">
        <div class="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-green-900 group-hover:bg-white transition-colors">
          <span class="text-lg">🏠</span>
        </div>
        <span class="group-hover:font-bold">Dashboard</span>
      </NuxtLink>
      <!-- Input Inkubasi Menu -->
      <NuxtLink to="/user/input-inkubasi" class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-green-400 hover:to-yellow-400 hover:text-green-900 transition-all duration-300 transform hover:scale-105">
        <div class="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center text-white group-hover:bg-white group-hover:text-green-600 transition-colors">
          <span class="text-lg">📝</span>
        </div>
        <span class="group-hover:font-bold">Input Inkubasi</span>
      </NuxtLink>
      <!-- Status Inovasi Menu -->
      <NuxtLink to="/user/status-inovasi" class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-green-400 hover:text-green-900 transition-all duration-300 transform hover:scale-105">
        <div class="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center text-white group-hover:bg-white group-hover:text-blue-600 transition-colors">
          <span class="text-lg">📊</span>
        </div>
        <span class="group-hover:font-bold">Status Inovasi</span>
      </NuxtLink>
    </nav>
  </aside>
</template>
