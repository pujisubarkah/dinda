<template>
  <nav class="bg-green-700 text-white shadow-lg border-b-4 border-yellow-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        
        <!-- Logo -->
        <div class="flex items-center space-x-4">
          <!-- Logo Banten & Berakhlak -->
          <div class="flex items-center space-x-2">
            <img src="/banten.png" class="img-fluid bg-transparent" width="50" height="45" alt="Logo Banten" style="background: transparent;" />
            <img src="/berakhlak.png" class="img-fluid bg-transparent" width="100" height="45" alt="Logo Berakhlak" style="background: transparent;" />
          </div>
          
          <!-- Text Logo -->
          <div class="flex items-center space-x-2">
            <span class="text-2xl font-extrabold tracking-wide text-yellow-400">
            DINDA
            </span>
            <span class="hidden sm:block font-light text-yellow-200">
              Dashboard Inovasi Daerah
            </span>
          </div>
        </div>

        <!-- Menu Desktop -->
        <div class="hidden md:flex space-x-6">
          <NuxtLink to="/" class="hover:text-yellow-300 transition">Home</NuxtLink>
          <NuxtLink to="/galeri" class="hover:text-yellow-300 transition">Galeri</NuxtLink>
          <NuxtLink to="/dashboard" class="hover:text-yellow-300 transition">Dashboard</NuxtLink>
          <NuxtLink to="/inkubasi" class="hover:text-yellow-300 transition">Inkubasi</NuxtLink>
          <NuxtLink to="/forum" class="hover:text-yellow-300 transition">Forum</NuxtLink>
        </div>

        <!-- User/Profile -->
        <div class="flex items-center space-x-4">
          <button class="border-2 border-yellow-400 text-yellow-300 px-4 py-1 rounded-lg font-semibold hover:bg-yellow-400 hover:text-green-800 transition">
            Login
          </button>
        </div>

        <!-- Mobile Button -->
        <div class="md:hidden">
          <button @click="isOpen = !isOpen" class="focus:outline-none text-yellow-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden px-4 pb-3 space-y-2">
      <NuxtLink to="/" class="block hover:text-yellow-300">Home</NuxtLink>
      <NuxtLink to="/galeri" class="block hover:text-yellow-300">Galeri</NuxtLink>
      <NuxtLink to="/dashboard" class="block hover:text-yellow-300">Dashboard</NuxtLink>
      <NuxtLink to="/inkubasi" class="block hover:text-yellow-300">Inkubasi</NuxtLink>
      <NuxtLink to="/forum" class="block hover:text-yellow-300">Forum</NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>
