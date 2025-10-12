<template>
  <nav class="text-white shadow-lg border-b-2 border-gray-400 h-20 md:h-24 flex items-center" style="background: linear-gradient(to right, #20B2AA, #20B2AA);">
    <div class="w-full px-0">
      <div class="flex items-center justify-between h-full pl-1 pr-4 sm:pl-2 sm:pr-6 lg:pl-3 lg:pr-8">
        <!-- Logo dan Text di pojok kiri -->
        <div class="flex items-center flex-shrink-0">
          <!-- Logo Banten, Kota Cilegon & Berakhlak -->
          <div class="flex items-center space-x-2 mr-2">
            <img src="/banten.png" alt="Logo Banten" class="w-12 h-12 object-contain" />
            <img src="https://cilegon.go.id/assets/images/logokotacilegon.png" alt="Logo Kota Cilegon" class="w-12 h-12 object-contain" />
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 border border-white/20">
              <img src="/berakhlak.png" alt="Logo Berakhlak" class="w-18 h-14 object-contain" />
            </div>
          </div>
          <!-- Text Logo -->
          <div class="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div class="flex items-center">
              <span class="text-xl md:text-3xl font-extrabold text-white tracking-wide" 
                    style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 1px 1px 2px rgba(255, 255, 255, 0.3); 
                           background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #ffffff 100%); 
                           background-clip: text; 
                           -webkit-background-clip: text;">
                DINDA CILEGON
              </span>
            </div>
            <p class="text-sm md:text-base text-white font-semibold hidden lg:block mt-1" 
               style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(255, 255, 255, 0.2);">
              ( Dashboard Inovasi Daerah Kota Cilegon )
            </p>
            <p class="text-xs md:text-sm text-blue-100 italic hidden lg:block font-medium" 
               style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3), 0px 0px 3px rgba(173, 216, 230, 0.5);">
              Wahana Informasi & Akselerasi Inovasi Kota Cilegon
            </p>
          </div>
        </div>
        
        <!-- Menu & Login di tengah-kanan -->
        <div class="flex items-center space-x-10 ml-auto">
          <!-- Menu Desktop & Tablet -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/" class="nav-link">
              Home
            </NuxtLink>
            <NuxtLink to="/galeri" class="nav-link">
              Galeri
            </NuxtLink>
            <NuxtLink to="/inkubasi" class="nav-link">
              Inkubasi
            </NuxtLink>
            <NuxtLink to="/forum" class="nav-link">
              Forum
            </NuxtLink>
            <NuxtLink to="/lomba" class="nav-link">
              Lomba
            </NuxtLink>
          </div>
          
          <!-- User/Profile -->
          <div class="hidden md:flex items-center space-x-4">
            <div v-if="!isLoggedIn">
              <button @click="showLoginModal = true" class="bg-gray-100 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 hover:shadow-lg transition-all duration-200 transform hover:scale-105" style="color: #20B2AA;">
                Login
              </button>
            </div>
            <div v-else class="flex items-center space-x-4">
              <!-- Admin Menu -->
              <NuxtLink v-if="currentUser?.role === 'admin'" to="/admin" class="nav-link-admin">
                Admin
              </NuxtLink>
              <!-- User Info -->
              <div class="flex items-center space-x-3">
                <div class="text-right">
                  <p class="text-sm font-medium text-white">{{ currentUser?.name }}</p>
                  <p class="text-xs text-blue-100">{{ currentUser?.role }} - {{ currentUser?.opd }}</p>
                </div>
                <button @click="handleNavbarLogout" class="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          <!-- Mobile Menu - Hanya untuk HP kecil -->
          <div class="md:hidden flex items-center">
            <button v-if="!isLoggedIn" @click="showLoginModal = true" class="bg-gray-100 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 mr-3" style="color: #20B2AA;">
              Login
            </button>
            <div v-else class="flex items-center space-x-2 mr-3">
              <span class="text-white text-sm">{{ currentUser?.name }}</span>
              <button @click="handleNavbarLogout" class="bg-red-100 text-red-700 px-3 py-1 rounded text-sm">
                Logout
              </button>
            </div>
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
        🎨 Galeri
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
      <NuxtLink v-if="currentUser?.role === 'admin'" to="/admin" @click="isOpen = false" class="block py-3 px-4 rounded-lg text-white font-medium hover:text-gray-200 transition-all duration-200 hover-tosca nav-text-outline">
        ⚙️ Admin Dashboard
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
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white text-gray-900"
              placeholder="Masukkan email atau username"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              v-model="loginForm.password" 
              type="password" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white text-gray-900"
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
            :disabled="isLoginLoading"
            class="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="isLoginLoading">Masuk...</span>
            <span v-else>Masuk</span>
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
            <button @click="showRegisterModal = true; showLoginModal = false" class="text-teal-600 hover:text-teal-700 font-semibold">Daftar sekarang</button>
          </p>
        </div>
      </div>
    </div>

    <!-- Register Modal -->
    <div v-if="showRegisterModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-fade-in max-h-[90vh] overflow-y-auto relative">
        <button @click="showRegisterModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div class="p-8">
          <h2 class="text-2xl font-bold text-center text-gray-900 mb-2">Daftar Akun DINDA</h2>
          <p class="text-gray-600 text-center">Bergabung dengan platform inovasi Kota Cilegon</p>

          <!-- Register Form -->
          <form @submit.prevent="handleRegister" class="space-y-4 mt-6">
            <!-- Username -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Username *</label>
              <input
                v-model="registerForm.username"
                type="text"
                required
                class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-sm bg-white text-gray-900"
                placeholder="Contoh: puji.diskominfo"
              />
            </div>

            <!-- Nama Lengkap -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
              <input
                v-model="registerForm.name"
                type="text"
                required
                class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-sm bg-white text-gray-900"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                v-model="registerForm.email"
                type="email"
                class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-sm bg-white text-gray-900"
                placeholder="nama@cilegon.go.id"
              />
            </div>

            <!-- OPD -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">OPD *</label>
              <select
                v-model="registerForm.opd"
                required
                :disabled="loadingOpd"
                class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-sm disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-white text-gray-900"
                style="background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 5\'><path d=\'M2 0L0 2h4zm0 5L0 3h4z\' fill=\'%23666\'/></svg>'); background-repeat: no-repeat; background-position: right 12px center; background-size: 12px;"
              >
                <option value="" disabled style="color: #9CA3AF; background-color: #F9FAFB;">
                  {{ loadingOpd ? 'Memuat OPD...' : 'Pilih OPD' }}
                </option>
                <option 
                  v-for="opd in opdList" 
                  :key="opd.id" 
                  :value="opd.namaOpd"
                  style="color: #1F2937; background-color: #FFFFFF; padding: 8px 12px;"
                >
                  {{ opd.namaOpd }}
                </option>
              </select>
              
              <!-- Debug info - sementara -->
              <div class="text-xs text-gray-400 mt-1">
                <span v-if="loadingOpd">🔄 Loading OPD...</span>
                <span v-else-if="opdList.length > 0">✅ {{ opdList.length }} OPD tersedia</span>
                <span v-else>❌ Data OPD tidak tersedia</span>
              </div>
            </div>

            <!-- Jabatan -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
              <input
                v-model="registerForm.position"
                type="text"
                class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-sm bg-white text-gray-900"
                placeholder="Contoh: Staff IT, Kabid Inovasi"
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <div class="relative">
                <input
                  v-model="registerForm.password"
                  :type="showRegisterPassword ? 'text' : 'password'"
                  required
                  class="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-sm bg-white text-gray-900"
                  placeholder="Minimal 8 karakter"
                />
                <button
                  type="button"
                  @click="showRegisterPassword = !showRegisterPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg v-if="showRegisterPassword" class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <svg v-else class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password *</label>
              <input
                v-model="registerForm.confirmPassword"
                type="password"
                required
                class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-sm bg-white text-gray-900"
                placeholder="Ulangi password"
              />
            </div>

            <button 
              type="submit" 
              :disabled="isRegisterLoading"
              class="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isRegisterLoading">Mendaftar...</span>
              <span v-else>Daftar Sekarang</span>
            </button>
          </form>

          <!-- Divider -->
          <div class="my-6 flex items-center">
            <div class="flex-1 border-t border-gray-300"></div>
            <span class="px-4 text-sm text-gray-500">atau</span>
            <div class="flex-1 border-t border-gray-300"></div>
          </div>

          <!-- Login Link -->
          <div class="text-center">
            <p class="text-gray-600">
              Sudah punya akun? 
              <button @click="showLoginModal = true; showRegisterModal = false" class="text-teal-600 hover:text-teal-700 font-semibold">Masuk di sini</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const isOpen = ref(false)
const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const showRegisterPassword = ref(false)
const isRegisterLoading = ref(false)
const isLoginLoading = ref(false)

// User state
const currentUser = ref(null)
const isLoggedIn = ref(false)

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  username: '',
  name: '',
  email: '',
  opd: '',
  position: '',
  password: '',
  confirmPassword: ''
})

// OPD data from API
const opdList = ref([])
const loadingOpd = ref(false)

// Fetch OPD list
const fetchOpdList = async () => {
  try {
    loadingOpd.value = true
    console.log('🔄 Fetching OPD list...')
    
    const response = await $fetch('/api/master-opd')
    console.log('📡 OPD API Response:', response)
    
    if (response.success && response.data && response.data.length > 0) {
      opdList.value = response.data
      console.log('✅ OPD list loaded from API:', opdList.value.length, 'items')
    } else {
      console.warn('⚠️ API response empty, using fallback data')
      opdList.value = fallbackOpd
    }
  } catch (error) {
    console.error('❌ Error fetching OPD list, using fallback data:', error)
    opdList.value = fallbackOpd
  } finally {
    loadingOpd.value = false
  }
}

// Load OPD when register modal is opened
watch(showRegisterModal, (newValue) => {
  if (newValue && opdList.value.length === 0) {
    console.log('🎯 Register modal opened, fetching OPD list...')
    fetchOpdList()
  }
})

// Fallback OPD data for testing
const fallbackOpd = [
  { id: 1, namaOpd: 'Dinas Komunikasi dan Informatika' },
  { id: 2, namaOpd: 'Badan Perencanaan Pembangunan Daerah' },
  { id: 3, namaOpd: 'Dinas Pendidikan dan Kebudayaan' },
  { id: 4, namaOpd: 'Dinas Kesehatan' },
  { id: 5, namaOpd: 'Dinas Pekerjaan Umum dan Penataan Ruang' }
]

// Check user login state
const checkLoginState = () => {
  try {
    const token = localStorage.getItem('dinda_token')
    const userData = localStorage.getItem('dinda_user')
    
    if (token && userData) {
      currentUser.value = JSON.parse(userData)
      isLoggedIn.value = true
      console.log('✅ User logged in:', currentUser.value.name, 'Role:', currentUser.value.role)
    } else {
      currentUser.value = null
      isLoggedIn.value = false
    }
  } catch (error) {
    console.error('Error checking login state:', error)
    currentUser.value = null
    isLoggedIn.value = false
  }
}

// Logout function
const handleNavbarLogout = () => {
  localStorage.removeItem('dinda_token')
  localStorage.removeItem('dinda_user')
  currentUser.value = null
  isLoggedIn.value = false
  navigateTo('/')
}

// Load fallback data if API fails
onMounted(() => {
  console.log('🚀 Component mounted')
  checkLoginState()
})

const handleLogin = async () => {
  isLoginLoading.value = true
  
  try {
    console.log('🔄 Login attempt:', loginForm.value.email)
    
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: loginForm.value.email, // Can be username or email
        password: loginForm.value.password
      }
    })

    console.log('✅ Login response:', response)

    if (response.success) {
      // Store token in localStorage (you might want to use a more secure method)
      localStorage.setItem('dinda_token', response.data.token)
      localStorage.setItem('dinda_user', JSON.stringify(response.data.user))

      // Update component state
      currentUser.value = response.data.user
      isLoggedIn.value = true

      alert(`Login berhasil! Selamat datang, ${response.data.user.name}`)
      
      // Close modal and reset form
      showLoginModal.value = false
      loginForm.value = { email: '', password: '' }

      // Redirect based on user role
      if (response.data.user.role === 'admin') {
        await navigateTo('/admin')
      } else if (response.data.user.role === 'user') {
        // Regular users go to user dashboard
        await navigateTo('/user')
      } else {
        // Default fallback
        await navigateTo('/dashboard')
      }
    }
  } catch (error) {
    console.error('❌ Login error:', error)
    
    let errorMessage = 'Login gagal. Silakan coba lagi.'
    
    if (error.data?.statusMessage) {
      errorMessage = error.data.statusMessage
    } else if (error.statusMessage) {
      errorMessage = error.statusMessage
    }
    
    alert(errorMessage)
  } finally {
    isLoginLoading.value = false
  }
}

const handleRegister = async () => {
  // Validasi form
  if (!registerForm.value.username || !registerForm.value.name || !registerForm.value.opd || !registerForm.value.password) {
    alert('Mohon lengkapi semua field yang wajib diisi!')
    return
  }

  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('Konfirmasi password tidak sesuai!')
    return
  }

  if (registerForm.value.password.length < 8) {
    alert('Password minimal 8 karakter!')
    return
  }

  isRegisterLoading.value = true

  try {
    console.log('🔄 Register attempt:', registerForm.value.username)
    
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        username: registerForm.value.username,
        name: registerForm.value.name,
        email: registerForm.value.email || null,
        password: registerForm.value.password,
        opd: registerForm.value.opd,
        position: registerForm.value.position || null
      }
    })

    console.log('✅ Register response:', response)

    if (response.success) {
      alert(`Pendaftaran berhasil! Akun ${registerForm.value.username} telah dibuat. Silakan tunggu verifikasi admin sebelum dapat login.`)
      
      // Reset form dan tutup modal
      showRegisterModal.value = false
      registerForm.value = {
        username: '',
        name: '',
        email: '',
        opd: '',
        position: '',
        password: '',
        confirmPassword: ''
      }
    }
  } catch (error) {
    console.error('❌ Register error:', error)
    
    let errorMessage = 'Pendaftaran gagal. Silakan coba lagi.'
    
    if (error.data?.statusMessage) {
      errorMessage = error.data.statusMessage
    } else if (error.statusMessage) {
      errorMessage = error.statusMessage
    }
    
    alert(errorMessage)
  } finally {
    isRegisterLoading.value = false
  }
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

@keyframes underlineSlide {
  from {
    width: 0;
  }
  to {
    width: 100%;
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

/* Enhanced Navigation Link Styles */
.nav-link {
  color: white;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  display: inline-block;
  text-shadow: 1px 1px 1px rgba(128, 128, 128, 0.7), 
               -1px -1px 1px rgba(128, 128, 128, 0.3),
               1px -1px 1px rgba(128, 128, 128, 0.3),
               -1px 1px 1px rgba(128, 128, 128, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Background fade effect */
.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 6px;
}

/* Underline animation */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8));
  transform: translateX(-50%);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 1px;
}

/* Hover effects */
.nav-link:hover {
  color: rgba(255, 255, 255, 0.95);
  transform: translateY(-1px);
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link:hover::after {
  width: calc(100% - 24px);
}

/* Active state */
.nav-link.router-link-active {
  color: rgba(255, 255, 255, 1);
}

.nav-link.router-link-active::before {
  opacity: 0.15;
}

.nav-link.router-link-active::after {
  width: calc(100% - 24px);
  background: rgba(255, 255, 255, 0.9);
}

/* Admin nav link styling */
.nav-link-admin {
  color: white;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.nav-link-admin:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Dropdown styling */
select option {
  color: #1F2937 !important;
  background-color: #FFFFFF !important;
  padding: 8px 12px !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
}

select option:hover {
  background-color: #F3F4F6 !important;
  color: #111827 !important;
}

select option:checked {
  background-color: #10B981 !important;
  color: #FFFFFF !important;
}

/* Ensure dropdown is visible */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/* Input styling - ensure text is always visible */
input[type="text"],
input[type="email"], 
input[type="password"] {
  color: #1F2937 !important;
  background-color: #FFFFFF !important;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  color: #111827 !important;
  background-color: #FFFFFF !important;
}

/* Placeholder styling */
input::placeholder {
  color: #9CA3AF !important;
  opacity: 1 !important;
}

/* Ensure autocomplete doesn't override colors */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: #1F2937 !important;
  -webkit-box-shadow: 0 0 0px 1000px #FFFFFF inset !important;
  background-color: #FFFFFF !important;
}
</style>
