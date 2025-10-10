<template>
  <nav class="bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg border-b-2 border-yellow-400 h-20 md:h-24 flex items-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="flex items-center justify-between h-full">
        <!-- Logo dan Text di pojok kiri -->
        <div class="flex items-center flex-shrink-0">
          <!-- Logo Banten, Kota Cilegon & Berakhlak -->
          <div class="flex items-center space-x-2 mr-8">
            <img src="/banten.png" alt="Logo Banten" class="w-12 h-12 object-contain" />
            <img src="https://cilegon.go.id/assets/images/logokotacilegon.png" alt="Logo Kota Cilegon" class="w-12 h-12 object-contain" />
            <img src="/berakhlak.png" alt="Logo Berakhlak" class="w-16 h-12 object-contain" />
          </div>
          <!-- Text Logo -->
          <div>
            <div class="flex items-center">
              <span class="text-xl md:text-2xl font-bold text-yellow-400">
                DINDA CILEGON
              </span>
            </div>
            <p class="text-xs md:text-sm text-yellow-100 hidden md:block">
              Dashboard Inovasi Daerah Kota Cilegon
            </p>
          </div>
        </div>
        
        <!-- Menu & Login di tengah-kanan -->
        <div class="flex items-center space-x-8 ml-auto">
          <!-- Menu Desktop -->
          <div class="hidden lg:flex items-center space-x-8">
            <NuxtLink to="/" class="text-white font-medium hover:text-yellow-300 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10">
              Home
            </NuxtLink>
            <NuxtLink to="/galeri" class="text-white font-medium hover:text-yellow-300 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10">
              Galeri
            </NuxtLink>
            <NuxtLink to="/dashboard" class="text-white font-medium hover:text-yellow-300 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10">
              Dashboard
            </NuxtLink>
            <NuxtLink to="/inkubasi" class="text-white font-medium hover:text-yellow-300 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10">
              Inkubasi
            </NuxtLink>
            <NuxtLink to="/forum" class="text-white font-medium hover:text-yellow-300 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10">
              Forum
            </NuxtLink>
          </div>
          
          <!-- User/Profile -->
          <div class="hidden md:flex items-center">
            <button class="bg-yellow-400 text-teal-800 px-6 py-2.5 rounded-lg font-semibold hover:bg-yellow-300 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              Login
            </button>
          </div>
          <!-- Hamburger Menu Mobile -->
          <div class="lg:hidden flex items-center">
            <button @click="isOpen = !isOpen" class="focus:outline-none text-yellow-300 p-2 rounded-md hover:bg-white/10 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="lg:hidden px-6 py-4 space-y-3 bg-teal-700 border-t border-teal-600 shadow-lg">
      <NuxtLink to="/" class="block py-3 px-4 rounded-lg text-white font-medium hover:bg-teal-600 hover:text-yellow-300 transition-all duration-200">
        Home
      </NuxtLink>
      <NuxtLink to="/galeri" class="block py-3 px-4 rounded-lg text-white font-medium hover:bg-teal-600 hover:text-yellow-300 transition-all duration-200">
        Galeri
      </NuxtLink>
      <NuxtLink to="/dashboard" class="block py-3 px-4 rounded-lg text-white font-medium hover:bg-teal-600 hover:text-yellow-300 transition-all duration-200">
        Dashboard
      </NuxtLink>
      <NuxtLink to="/inkubasi" class="block py-3 px-4 rounded-lg text-white font-medium hover:bg-teal-600 hover:text-yellow-300 transition-all duration-200">
        Inkubasi
      </NuxtLink>
      <NuxtLink to="/forum" class="block py-3 px-4 rounded-lg text-white font-medium hover:bg-teal-600 hover:text-yellow-300 transition-all duration-200">
        Forum
      </NuxtLink>
      <div class="pt-3 border-t border-teal-600">
        <button class="w-full bg-yellow-400 text-teal-800 px-4 py-3 rounded-lg font-semibold hover:bg-yellow-300 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
          Login
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>
