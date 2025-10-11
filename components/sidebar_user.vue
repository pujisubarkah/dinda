<template>
  <aside class="h-screen w-64 bg-gradient-to-b from-green-700 via-green-800 to-green-900 shadow-xl flex flex-col text-white">
    <!-- Menu List -->
    <nav class="flex-1 py-6 px-4 space-y-3">
      <!-- Dashboard Menu -->
      <NuxtLink to="/user" class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-green-900 transition-all duration-300 transform hover:scale-105">
        <div class="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-green-900 group-hover:bg-white transition-colors">
          <span class="text-lg">🏠</span>
        </div>
        <span class="group-hover:font-bold">Dashboard</span>
      </NuxtLink>
      
      <!-- Usulan Inovasi Menu -->
      <NuxtLink to="/user/usulan-inovasi" class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-green-900 transition-all duration-300 transform hover:scale-105">
        <div class="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center text-white group-hover:bg-white group-hover:text-blue-600 transition-colors">
          <span class="text-lg">�</span>
        </div>
        <span class="group-hover:font-bold">Usulan Inovasi</span>
      </NuxtLink>
      
      <!-- Status Usulan Menu -->
      <NuxtLink to="/user/status-usulan" class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-green-900 transition-all duration-300 transform hover:scale-105">
        <div class="w-8 h-8 bg-purple-400 rounded-lg flex items-center justify-center text-white group-hover:bg-white group-hover:text-purple-600 transition-colors">
          <span class="text-lg">📋</span>
        </div>
        <span class="group-hover:font-bold">Status Usulan</span>
      </NuxtLink>
      
      <!-- Galeri Inovasi Menu -->
      <NuxtLink to="/user/galeri-inovasi" class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-green-900 transition-all duration-300 transform hover:scale-105">
        <div class="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center text-white group-hover:bg-white group-hover:text-orange-600 transition-colors">
          <span class="text-lg">🎨</span>
        </div>
        <span class="group-hover:font-bold">Galeri Inovasi</span>
      </NuxtLink>
      
      <!-- Forum Diskusi Menu -->
      <NuxtLink to="/user/forum-diskusi" class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-green-900 transition-all duration-300 transform hover:scale-105">
        <div class="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center text-white group-hover:bg-white group-hover:text-teal-600 transition-colors">
          <span class="text-lg">�</span>
        </div>
        <span class="group-hover:font-bold">Forum Diskusi</span>
      </NuxtLink>
      
      <!-- Profil Menu -->
      <NuxtLink to="/user/profil" class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-green-900 transition-all duration-300 transform hover:scale-105">
        <div class="w-8 h-8 bg-indigo-400 rounded-lg flex items-center justify-center text-white group-hover:bg-white group-hover:text-indigo-600 transition-colors">
          <span class="text-lg">👤</span>
        </div>
        <span class="group-hover:font-bold">Profil</span>
      </NuxtLink>
    </nav>

    <!-- User Profile Section -->
    <div class="px-4 py-4 border-t border-green-600">
      <div class="flex items-center gap-3 px-4 py-3 bg-green-800 rounded-lg">
        <div class="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 font-bold">
          U
        </div>
        <div>
          <div class="text-sm font-semibold text-white">User</div>
          <div class="text-xs text-green-300">Online</div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-6 py-4 border-t border-yellow-400 text-xs text-yellow-200 text-center bg-green-800">
      <div class="text-yellow-300 font-semibold">DINDA</div>
      <div>&copy; 2025 Kota Cilegon</div>
    </div>
  </aside>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}
</style>
