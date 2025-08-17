<template>
  <header class="bg-gradient-to-r from-green-700 via-green-600 to-yellow-500 text-white shadow-xl border-b-4 border-yellow-400">
    <div class="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Left Section - Logo & Title -->
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
          <img src="/berakhlak.png" alt="Logo BerAKHLAK" class="h-7 w-auto" />
        </div>
        <div>
          <span class="text-xl font-extrabold tracking-wide text-white drop-shadow-lg">Dashboard User</span>
          <div class="text-sm text-yellow-200 font-light">Selamat datang!</div>
        </div>
      </div>
      <!-- Right Section - Profile & Logout -->
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3">
          <div class="hidden md:block text-right">
            <div class="text-sm font-semibold text-white">Nama User</div>
            <div class="text-xs text-yellow-200">User</div>
          </div>
          <div class="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 font-bold shadow-lg">
            U
          </div>
        </div>
        <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition-colors">
          <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  </header>
</template>
