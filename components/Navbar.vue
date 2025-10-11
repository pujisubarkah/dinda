<template>
  <nav class="text-white shadow-lg border-b-2 border-gray-400 h-20 md:h-24 flex items-center" style="background: linear-gradient(to right, #20B2AA, #20B2AA);">
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
              <span class="text-xl md:text-2xl font-bold text-gray-100" style="text-shadow: 1px 1px 2px rgba(128, 128, 128, 0.8), -1px -1px 2px rgba(128, 128, 128, 0.3);">
                DINDA CILEGON
              </span>
            </div>
            <p class="text-xs md:text-sm text-gray-200 hidden lg:block" style="text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.6);">
              ( Dashboard Inovasi Daerah Kota Cilegon )
            </p>
            <p class="text-xs text-gray-300 italic hidden lg:block" style="text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.5);">
              Wahana Informasi & Akselerasi Inovasi Kota Cilegon
            </p>
          </div>
        </div>
        
        <!-- Menu & Login di tengah-kanan -->
        <div class="flex items-center space-x-8 ml-auto">
          <!-- Menu Desktop & Tablet -->
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink to="/" class="text-white font-medium hover:text-gray-200 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10 nav-text-outline">
              Home
            </NuxtLink>
            <NuxtLink to="/galeri" class="text-white font-medium hover:text-gray-200 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10 nav-text-outline">
              Galeri
            </NuxtLink>
            <NuxtLink to="/dashboard" class="text-white font-medium hover:text-gray-200 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10 nav-text-outline">
              Dashboard
            </NuxtLink>
            <NuxtLink to="/inkubasi" class="text-white font-medium hover:text-gray-200 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10 nav-text-outline">
              Inkubasi
            </NuxtLink>
            <NuxtLink to="/forum" class="text-white font-medium hover:text-gray-200 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10 nav-text-outline">
              Forum
            </NuxtLink>
            <NuxtLink to="/lomba" class="text-white font-medium hover:text-gray-200 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10 nav-text-outline">
              Lomba
            </NuxtLink>
          </div>
          
          <!-- User/Profile -->
          <div class="hidden md:flex items-center">
            <button @click="showLoginModal = true" class="bg-gray-100 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 hover:shadow-lg transition-all duration-200 transform hover:scale-105" style="color: #20B2AA;">
              Login
            </button>
          </div>
          
          <!-- Mobile Menu - Hanya untuk HP kecil -->
          <div class="md:hidden flex items-center">
            <button @click="showLoginModal = true" class="bg-gray-100 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 mr-3" style="color: #20B2AA;">
              Login
            </button>
            <button @click="isOpen = !isOpen" class="focus:outline-none text-gray-200 p-2 rounded-md hover:bg-white/10 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu - Hanya untuk HP kecil -->
    <div v-if="isOpen" class="md:hidden px-6 py-4 space-y-3 border-t shadow-lg" style="background-color: #20B2AA; border-color: #20B2AA;">
      <NuxtLink to="/" @click="isOpen = false" class="block py-3 px-4 rounded-lg text-white font-medium hover:text-gray-200 transition-all duration-200 hover-tosca nav-text-outline">
        🏠 Home
      </NuxtLink>
      <NuxtLink to="/galeri" @click="isOpen = false" class="block py-3 px-4 rounded-lg text-white font-medium hover:text-gray-200 transition-all duration-200 hover-tosca nav-text-outline">
        🖼️ Galeri
      </NuxtLink>
      <NuxtLink to="/dashboard" @click="isOpen = false" class="block py-3 px-4 rounded-lg text-white font-medium hover:text-gray-200 transition-all duration-200 hover-tosca nav-text-outline">
        📊 Dashboard
      </NuxtLink>
      <NuxtLink to="/inkubasi" @click="isOpen = false" class="block py-3 px-4 rounded-lg text-white font-medium hover:text-gray-200 transition-all duration-200 hover-tosca nav-text-outline">
        🚀 Inkubasi
      </NuxtLink>
      <NuxtLink to="/forum" @click="isOpen = false" class="block py-3 px-4 rounded-lg text-white font-medium hover:text-gray-200 transition-all duration-200 hover-tosca nav-text-outline">
        💬 Forum
      </NuxtLink>
      <NuxtLink to="/lomba" @click="isOpen = false" class="block py-3 px-4 rounded-lg text-white font-medium hover:text-gray-200 transition-all duration-200 hover-tosca nav-text-outline">
        🏆 Lomba
      </NuxtLink>
    </div>

    <!-- Login Modal -->
    <div v-if="showLoginModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative animate-fade-in">
        <!-- Close Button -->
        <button @click="showLoginModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Header -->
        <div class="text-center mb-8">
          <div class="flex justify-center items-center space-x-3 mb-4">
            <img src="https://cilegon.go.id/assets/images/logokotacilegon.png" alt="Logo Kota Cilegon" class="w-12 h-12 object-contain" />
            <h2 class="text-2xl font-bold text-teal-700">DINDA CILEGON</h2>
          </div>
          <p class="text-gray-600 text-center">Dashboard Inovasi Daerah Kota Cilegon</p>
          <p class="text-gray-500 text-sm text-center italic">Wahana Informasi & Akselerasi Inovasi Kota Cilegon</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email / Username</label>
            <input 
              v-model="loginForm.email" 
              type="email" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="Masukkan email atau username"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              v-model="loginForm.password" 
              type="password" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="Masukkan password"
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300 text-teal-600 focus:ring-teal-500">
              <span class="ml-2 text-sm text-gray-600">Ingat saya</span>
            </label>
            <a href="#" class="text-sm text-teal-600 hover:text-teal-700 font-medium">Lupa password?</a>
          </div>

          <button 
            type="submit" 
            class="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Masuk
          </button>
        </form>

        <!-- Divider -->
        <div class="my-6 flex items-center">
          <div class="flex-1 border-t border-gray-300"></div>
          <span class="px-4 text-sm text-gray-500">atau</span>
          <div class="flex-1 border-t border-gray-300"></div>
        </div>

        <!-- Register Link -->
        <div class="text-center">
          <p class="text-gray-600">
            Belum punya akun? 
            <a href="#" class="text-teal-600 hover:text-teal-700 font-semibold">Daftar sekarang</a>
          </p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const showLoginModal = ref(false)
const loginForm = ref({
  email: '',
  password: ''
})

const handleLogin = () => {
  // Simulasi login sementara
  console.log('Login attempt:', loginForm.value)
  alert('Login berhasil! (Demo)')
  showLoginModal.value = false
  loginForm.value = { email: '', password: '' }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.hover-tosca:hover {
  background-color: rgba(32, 178, 170, 0.3);
}

.nav-text-outline {
  text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.7), 
               -1px -1px 1px rgba(128, 128, 128, 0.3),
               1px -1px 1px rgba(128, 128, 128, 0.3),
               -1px 1px 1px rgba(128, 128, 128, 0.3);
}
</style>
