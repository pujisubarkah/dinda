<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- Header with Gradient -->
    <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 shadow-xl">
      <div class="px-6 py-8">
        <div class="flex items-center justify-between">
          <div class="text-white">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
                <span class="text-2xl">✅</span>
              </div>
              <div>
                <h1 class="text-3xl font-bold drop-shadow-lg font-poppins">Verifikasi User</h1>
                <p class="text-indigo-100 text-sm font-light">Kelola persetujuan dan verifikasi akun pengguna dengan role 'user'</p>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <button
              @click="loadUsers"
              class="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="px-6 py-8 -mt-4">
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm font-medium">Total User</p>
              <p class="text-3xl font-bold">{{ userStats.total }}</p>
            </div>
            <div class="w-16 h-16 bg-blue-400 bg-opacity-30 rounded-2xl flex items-center justify-center">
              <span class="text-3xl">👥</span>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-orange-100 text-sm font-medium">Pending</p>
              <p class="text-3xl font-bold">{{ userStats.pending }}</p>
            </div>
            <div class="w-16 h-16 bg-orange-400 bg-opacity-30 rounded-2xl flex items-center justify-center">
              <span class="text-3xl">⏳</span>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm font-medium">Terverifikasi</p>
              <p class="text-3xl font-bold">{{ userStats.verified }}</p>
            </div>
            <div class="w-16 h-16 bg-green-400 bg-opacity-30 rounded-2xl flex items-center justify-center">
              <span class="text-3xl">✅</span>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-red-100 text-sm font-medium">Ditolak</p>
              <p class="text-3xl font-bold">{{ userStats.rejected }}</p>
            </div>
            <div class="w-16 h-16 bg-red-400 bg-opacity-30 rounded-2xl flex items-center justify-center">
              <span class="text-3xl">❌</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="filter in filterTabs"
            :key="filter.value"
            @click="activeFilter = filter.value"
            :class="[
              'px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105',
              activeFilter === filter.value
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            <span class="mr-2">{{ filter.icon }}</span>
            {{ filter.label }}
            <span v-if="filter.count > 0" class="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
              {{ filter.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
        <div class="flex items-center gap-4">
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari nama, email, atau OPD user..."
              class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 shadow-sm font-poppins"
            >
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-2xl shadow-xl p-12 text-center font-poppins">
        <div class="flex flex-col items-center gap-4">
          <div class="relative">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent absolute top-0"></div>
          </div>
          <div>
            <p class="text-lg font-semibold text-gray-800">Memuat Data User</p>
            <p class="text-sm text-gray-500">Mohon tunggu sebentar...</p>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 mb-8 font-poppins">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-red-200 rounded-xl flex items-center justify-center">
            <span class="text-2xl">❌</span>
          </div>
          <div>
            <p class="font-semibold text-red-800">Terjadi Kesalahan</p>
            <p class="text-red-600 text-sm">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div v-else class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <h3 class="text-white font-poppins font-semibold text-lg flex items-center gap-2">
            <span class="text-xl">👥</span>
            Daftar User (Role: User) - {{ activeFilterLabel }}
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full font-poppins">
            <thead class="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-indigo-200">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs text-indigo-600 font-bold">#</span>
                    No
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div class="flex items-center gap-2">
                    <span class="text-blue-600">👤</span>
                    Data User
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div class="flex items-center gap-2">
                    <span class="text-green-600">🏛️</span>
                    OPD
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div class="flex items-center gap-2">
                    <span class="text-yellow-600">📋</span>
                    Status
                  </div>
                </th>
                <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  <div class="flex items-center justify-center gap-2">
                    <span class="text-purple-600">⚙️</span>
                    Aksi
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-if="filteredUsers.length === 0">
                <td colspan="5" class="px-6 py-12 text-center">
                  <div class="flex flex-col items-center gap-4">
                    <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <span class="text-4xl text-gray-400">👥</span>
                    </div>
                    <div class="text-gray-500 font-poppins">
                      <p class="text-lg font-medium">Tidak ada data user</p>
                      <p class="text-sm">Belum ada user yang perlu diverifikasi</p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr v-for="(user, index) in filteredUsers" :key="user.id" class="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200">
                <td class="px-6 py-5">
                  <div class="flex items-center">
                    <span class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold font-poppins">
                      {{ index + 1 }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-lg font-bold">
                      {{ user.name?.charAt(0).toUpperCase() || 'U' }}
                    </div>
                    <div>
                      <div class="text-sm font-semibold text-gray-900 font-poppins">{{ user.name || 'Nama tidak tersedia' }}</div>
                      <div class="text-xs text-gray-500 font-poppins">{{ user.email || 'Email tidak tersedia' }}</div>
                      <div class="text-xs text-gray-400 font-poppins">{{ user.role || 'Role tidak tersedia' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span class="text-green-600 text-sm">🏛️</span>
                    </div>
                    <span class="text-sm font-medium text-gray-700 font-poppins">
                      {{ user.opd || 'Belum dipilih' }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <span :class="getStatusClass(user.isVerified)" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold font-poppins">
                    <span :class="getStatusDotClass(user.isVerified)" class="w-2 h-2 rounded-full"></span>
                    {{ getStatusText(user.isVerified) }}
                  </span>
                </td>
                <td class="px-6 py-5 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      v-if="!user.isVerified"
                      @click="verifyUser(user, true)"
                      class="group bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-700 p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110"
                      title="Verifikasi User"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </button>
                    <button
                      v-if="user.isVerified"
                      @click="verifyUser(user, false)"
                      class="group bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110"
                      title="Batalkan Verifikasi"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                    <button
                      @click="viewUserDetail(user)"
                      class="group bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110"
                      title="Lihat Detail"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- User Detail Modal -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-poppins">
      <div class="bg-white rounded-2xl p-8 w-full max-w-lg mx-4 shadow-2xl max-h-96 overflow-y-auto">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            {{ selectedUser?.name?.charAt(0).toUpperCase() || 'U' }}
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900">Detail User</h3>
            <p class="text-sm text-gray-500">Informasi lengkap pengguna</p>
          </div>
        </div>
        
        <div class="space-y-4" v-if="selectedUser">
          <div class="bg-gray-50 rounded-xl p-4">
            <label class="text-sm font-semibold text-gray-600">Nama Lengkap</label>
            <p class="text-lg font-medium text-gray-900">{{ selectedUser.name || 'Tidak tersedia' }}</p>
          </div>
          
          <div class="bg-gray-50 rounded-xl p-4">
            <label class="text-sm font-semibold text-gray-600">Email</label>
            <p class="text-lg font-medium text-gray-900">{{ selectedUser.email || 'Tidak tersedia' }}</p>
          </div>
          
          <div class="bg-gray-50 rounded-xl p-4">
            <label class="text-sm font-semibold text-gray-600">Role</label>
            <p class="text-lg font-medium text-gray-900">{{ selectedUser.role || 'Tidak tersedia' }}</p>
          </div>
          
          <div class="bg-gray-50 rounded-xl p-4">
            <label class="text-sm font-semibold text-gray-600">OPD</label>
            <p class="text-lg font-medium text-gray-900">{{ selectedUser.opd || 'Belum dipilih' }}</p>
          </div>
          
          <div class="bg-gray-50 rounded-xl p-4">
            <label class="text-sm font-semibold text-gray-600">Status Verifikasi</label>
            <span :class="getStatusClass(selectedUser.isVerified)" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mt-2">
              <span :class="getStatusDotClass(selectedUser.isVerified)" class="w-2 h-2 rounded-full"></span>
              {{ getStatusText(selectedUser.isVerified) }}
            </span>
          </div>
        </div>
        
        <div class="flex justify-end gap-4 mt-8">
          <button
            @click="showDetailModal = false"
            class="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-semibold"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

// Reactive data
const userList = ref([])
const opdList = ref([])
const loading = ref(true)
const error = ref('')
const searchQuery = ref('')
const activeFilter = ref('all')
const showDetailModal = ref(false)
const selectedUser = ref(null)

// Filter tabs
const filterTabs = computed(() => [
  { value: 'all', label: 'Semua User', icon: '👥', count: userStats.value.total },
  { value: 'pending', label: 'Pending', icon: '⏳', count: userStats.value.pending },
  { value: 'verified', label: 'Terverifikasi', icon: '✅', count: userStats.value.verified }
])

// Computed
const userStats = computed(() => {
  const total = userList.value.length
  const pending = userList.value.filter(user => !user.isVerified).length
  const verified = userList.value.filter(user => user.isVerified).length
  const rejected = 0 // Assuming no rejected status for now
  
  return { total, pending, verified, rejected }
})

const activeFilterLabel = computed(() => {
  const filter = filterTabs.value.find(f => f.value === activeFilter.value)
  return filter ? filter.label : 'Semua User'
})

const filteredUsers = computed(() => {
  let filtered = userList.value

  // Filter by status
  if (activeFilter.value === 'pending') {
    filtered = filtered.filter(user => !user.isVerified)
  } else if (activeFilter.value === 'verified') {
    filtered = filtered.filter(user => user.isVerified)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(user => 
      (user.name && user.name.toLowerCase().includes(query)) ||
      (user.email && user.email.toLowerCase().includes(query)) ||
      (user.role && user.role.toLowerCase().includes(query))
    )
  }

  return filtered
})

// Methods
const loadUsers = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // Fetch users with role filter for 'user' only
    const response = await $fetch('/api/users', {
      query: {
        role: 'user'
      }
    })
    userList.value = response.data || []
  } catch (err) {
    console.error('Error loading users:', err)
    error.value = 'Gagal memuat data user'
    userList.value = []
  } finally {
    loading.value = false
  }
}



const getStatusClass = (isVerified) => {
  return isVerified 
    ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800'
    : 'bg-gradient-to-r from-orange-100 to-red-200 text-orange-800'
}

const getStatusDotClass = (isVerified) => {
  return isVerified ? 'bg-green-500' : 'bg-orange-500 animate-pulse'
}

const getStatusText = (isVerified) => {
  return isVerified ? 'Terverifikasi' : 'Pending'
}

const verifyUser = async (user, isVerified) => {
  try {
    const action = isVerified ? 'memverifikasi' : 'membatalkan verifikasi'
    if (!confirm(`Apakah Anda yakin ingin ${action} user ${user.name}?`)) {
      return
    }

    const response = await $fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      body: {
        isVerified: isVerified
      }
    })

    if (response.success) {
      await loadUsers()
      const message = isVerified ? 'User berhasil diverifikasi' : 'Verifikasi user berhasil dibatalkan'
      alert(`✅ ${message}`)
    }
  } catch (err) {
    console.error('Error verifying user:', err)
    alert('❌ Gagal mengubah status verifikasi user')
  }
}

const viewUserDetail = (user) => {
  selectedUser.value = user
  showDetailModal.value = true
}

// Load data on mount
onMounted(() => {
  loadUsers()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
}
</style>