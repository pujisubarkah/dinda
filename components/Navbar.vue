<template>
  <nav class="relative text-white shadow-lg border-b-4 border-yellow-500 h-24 md:h-28 flex items-center overflow-hidden">
  
    <div class="absolute inset-0 bg-green-700/70 z-0"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex justify-between h-full items-center">
        <!-- Logo dan Text di pojok kiri -->
        <div class="flex items-center flex-shrink-0 pl-0">
          <!-- Logo Banten, Kota Cilegon & Berakhlak -->
          <div class="flex items-center space-x-3 mr-4">
            <img src="/banten.png" width="60" height="54" alt="Logo Banten" class="mr-0" />
            <img src="https://cilegon.go.id/assets/images/logokotacilegon.png" alt="Logo Kota Cilegon" class="w-20 h-auto mr-0" />
            <img src="/berakhlak.png" width="120" height="54" alt="Logo Berakhlak" class="mr-0" />
          </div>
          <!-- Text Logo -->
          <div class="flex items-center space-x-2 mr-2">
            <span class="text-4xl md:text-5xl font-extrabold tracking-wide text-yellow-400 drop-shadow-lg mr-2">
              DINDA
            </span>
            <span class="hidden sm:block font-bold text-yellow-100 text-xl md:text-2xl drop-shadow-lg">
              Dashboard Inovasi Daerah
            </span>
          </div>
        </div>
        <!-- Menu & Login di pojok kanan -->
        <div class="flex items-center space-x-6 ml-80">
          <!-- Menu Desktop -->
          <div class="hidden md:flex space-x-6">
            <NuxtLink to="/" class="hover:text-yellow-300 transition">Home</NuxtLink>
            <NuxtLink to="/galeri" class="hover:text-yellow-300 transition">Galeri</NuxtLink>
            <NuxtLink to="/dashboard" class="hover:text-yellow-300 transition">Dashboard</NuxtLink>
            <NuxtLink to="/inkubasi" class="hover:text-yellow-300 transition">Inkubasi</NuxtLink>
            <NuxtLink to="/forum" class="hover:text-yellow-300 transition">Forum</NuxtLink>
          </div>
          <!-- User/Profile -->
          <div class="hidden md:flex items-center">
            <button class="border-2 border-yellow-400 text-yellow-300 px-4 py-1 rounded-lg font-semibold hover:bg-yellow-400 hover:text-green-800 transition">
              Login
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
    <div v-if="isOpen" class="md:hidden px-4 pb-3 pt-2 space-y-2 bg-green-700/90 border-b-4 border-yellow-500">
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
