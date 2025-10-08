<template>
  <nav class="relative text-white shadow-xl border-b-4 border-yellow-500 h-32 md:h-36 flex items-center overflow-hidden" style="background: linear-gradient(135deg, #2E8B8B 0%, #20B2AA 50%, #4682B4 100%);">
    
    <!-- Decorative elements -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-32 h-32 bg-yellow-300 rounded-full -translate-x-16 -translate-y-16"></div>
      <div class="absolute bottom-0 right-0 w-24 h-24 bg-yellow-300 rounded-full translate-x-12 translate-y-12"></div>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div class="flex justify-between h-full items-center">
        <!-- Logo dan Text di pojok kiri -->
        <div class="flex items-center flex-shrink-0">
          <!-- Logo Banten, Kota Cilegon & Berakhlak -->
          <div class="flex items-center space-x-2 mr-6">
            <img src="/banten.png" width="80" height="72" alt="Logo Banten" class="w-16 h-16 object-contain" />
            <img src="https://cilegon.go.id/assets/images/logokotacilegon.png" alt="Logo Kota Cilegon" class="w-16 h-16 object-contain" />
            <img src="/berakhlak.png" width="120" height="54" alt="Logo Berakhlak" class="w-20 h-16 object-contain" />
          </div>
          <!-- Text Logo -->
          <div class="flex flex-col justify-center">
            <div class="flex items-center space-x-3">
              <span class="text-3xl md:text-4xl font-extrabold tracking-wide text-yellow-400 drop-shadow-2xl">
                DINDA
              </span>
              <span class="text-2xl md:text-3xl font-bold text-yellow-300 drop-shadow-lg">
                CILEGON
              </span>
            </div>
            <div class="mt-1">
              <p class="text-sm md:text-base font-semibold text-yellow-100 drop-shadow-lg">
                Dashboard Inovasi Daerah Kota Cilegon
              </p>
              <p class="text-xs md:text-sm font-medium text-yellow-200 italic drop-shadow-sm">
                Wahana Informasi & Akselerasi Inovasi Kota Cilegon
              </p>
            </div>
          </div>
        </div>
        <!-- Menu & Login di pojok kanan -->
        <div class="flex items-center space-x-6 ml-auto">
          <!-- Menu Desktop -->
          <div class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-white font-semibold hover:text-yellow-300 hover:scale-105 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white/10">Home</NuxtLink>
            <NuxtLink to="/galeri" class="text-white font-semibold hover:text-yellow-300 hover:scale-105 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white/10">Galeri</NuxtLink>
            <NuxtLink to="/dashboard" class="text-white font-semibold hover:text-yellow-300 hover:scale-105 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white/10">Dashboard</NuxtLink>
            <NuxtLink to="/inkubasi" class="text-white font-semibold hover:text-yellow-300 hover:scale-105 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white/10">Inkubasi</NuxtLink>
            <NuxtLink to="/forum" class="text-white font-semibold hover:text-yellow-300 hover:scale-105 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white/10">Forum</NuxtLink>
          </div>
          <!-- User/Profile -->
          <div class="hidden md:flex items-center">
            <button class="bg-yellow-400 text-teal-800 px-6 py-2 rounded-full font-bold shadow-lg hover:bg-yellow-300 hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <i class="fas fa-sign-in-alt mr-2"></i>Login
            </button>
          </div>
          <!-- Hamburger Menu Mobile -->
          <div class="md:hidden flex items-center">
            <button @click="isOpen = !isOpen" class="focus:outline-none text-yellow-300">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden px-4 pb-3 pt-2 space-y-2 border-b-4 border-yellow-500" style="background-color: rgba(46, 139, 139, 0.95);">
      <NuxtLink to="/" class="block py-2 px-2 rounded hover:bg-yellow-400 hover:text-green-900 transition">Home</NuxtLink>
      <NuxtLink to="/galeri" class="block py-2 px-2 rounded hover:bg-yellow-400 hover:text-green-900 transition">Galeri</NuxtLink>
      <NuxtLink to="/dashboard" class="block py-2 px-2 rounded hover:bg-yellow-400 hover:text-green-900 transition">Dashboard</NuxtLink>
      <NuxtLink to="/inkubasi" class="block py-2 px-2 rounded hover:bg-yellow-400 hover:text-green-900 transition">Inkubasi</NuxtLink>
      <NuxtLink to="/forum" class="block py-2 px-2 rounded hover:bg-yellow-400 hover:text-green-900 transition">Forum</NuxtLink>
      <button class="w-full border-2 border-yellow-400 text-yellow-300 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 hover:text-green-800 transition mt-2">Login</button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>
