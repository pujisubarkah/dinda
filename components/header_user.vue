<template>
  <header class="text-white shadow-xl border-b-4 border-gray-400" style="background: linear-gradient(to right, #17B3A9, #0FA39B);">
    <div class="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Left Section - Breadcrumb & Title -->
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <img src="/Kota_Cilegon.png" alt="Logo Kota Cilegon" class="h-6 w-auto" />
          </div>
          <div>
            <span class="text-xl font-extrabold tracking-wide text-white drop-shadow-lg">DINDA</span>
            <div class="text-sm text-blue-100 font-light">Dashboard User</div>
          </div>
        </div>
        
        <!-- Breadcrumb -->
        <div class="hidden md:flex items-center space-x-2 text-sm">
          <span class="text-blue-100">User</span>
          <span class="text-blue-200">></span>
          <span class="text-white font-semibold">Dashboard</span>
        </div>
      </div>
      <!-- Right Section - Notifications & Profile -->
      <div class="flex items-center gap-4">
  <!-- Notifications -->
  <button class="relative p-2 rounded-lg hover:bg-white/10 transition-colors" style="background-color: rgba(23, 179, 169, 0.85);">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5-5-5h5m0 0V7a5 5 0 00-10 0v10" />
          </svg>
          <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
        </button>

  <!-- Settings -->
  <button class="p-2 rounded-lg hover:bg-white/10 transition-colors" style="background-color: rgba(23, 179, 169, 0.85);">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <!-- Profile Dropdown -->
        <div class="flex items-center gap-3">
          <div class="hidden md:block text-right">
            <div class="text-sm font-semibold text-white">User DINDA</div>
            <div class="text-xs text-blue-100">Pengguna</div>
          </div>
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold shadow-lg border border-white/30">
            U
          </div>
        </div>

        <!-- Logout Button -->
        <button 
          @click="handleLogout"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition-colors"
        >
          <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const handleLogout = async () => {
  try {
    // Confirm logout
    if (!confirm('Apakah Anda yakin ingin keluar?')) {
      return
    }

    // Clear localStorage
    if (process.client) {
      localStorage.removeItem('dinda_token')
      localStorage.removeItem('dinda_user')
    }

    // Show notification
    alert('Anda telah berhasil logout')

    // Redirect to home page
    await navigateTo('/')
  } catch (error) {
    console.error('Logout error:', error)
    alert('Terjadi kesalahan saat logout')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}
</style>
