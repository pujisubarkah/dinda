<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
    <!-- Header with Gradient -->
    <div class="bg-gradient-to-r from-green-600 via-green-700 to-teal-700 shadow-xl">
      <div class="px-6 py-8">
        <div class="flex items-center justify-between">
          <div class="text-white">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
                <span class="text-2xl">🏛️</span>
              </div>
              <div>
                <h1 class="text-3xl font-bold drop-shadow-lg">Master OPD</h1>
                <p class="text-green-100 text-sm font-light">Kelola data Organisasi Perangkat Daerah Kota Cilegon</p>
              </div>
            </div>
          </div>
          <button 
            @click="showAddModal = true"
            class="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-green-900 px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Tambah OPD Baru
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="px-6 py-8 -mt-4">
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm font-medium">Total OPD</p>
              <p class="text-3xl font-bold">{{ opdList.length }}</p>
            </div>
            <div class="w-16 h-16 bg-blue-400 bg-opacity-30 rounded-2xl flex items-center justify-center">
              <span class="text-3xl">🏢</span>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm font-medium">OPD Aktif</p>
              <p class="text-3xl font-bold">{{ opdList.length }}</p>
            </div>
            <div class="w-16 h-16 bg-green-400 bg-opacity-30 rounded-2xl flex items-center justify-center">
              <span class="text-3xl">✅</span>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-yellow-100 text-sm font-medium">Pencarian</p>
              <p class="text-3xl font-bold">{{ filteredOPD.length }}</p>
            </div>
            <div class="w-16 h-16 bg-yellow-400 bg-opacity-30 rounded-2xl flex items-center justify-center">
              <span class="text-3xl">🔍</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Search Bar with Enhanced Design -->
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
              placeholder="Cari nama OPD atau kepala dinas..."
              class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 shadow-sm"
            >
          </div>
          <button
            @click="loadOPD"
            class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-2xl shadow-xl p-12 text-center font-poppins">
        <div class="flex flex-col items-center gap-4">
          <div class="relative">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-green-200"></div>
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent absolute top-0"></div>
          </div>
          <div>
            <p class="text-lg font-semibold text-gray-800">Memuat Data OPD</p>
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

      <!-- OPD Table -->
      <div v-else class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div class="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
          <h3 class="text-white font-poppins font-semibold text-lg flex items-center gap-2">
            <span class="text-xl">📋</span>
            Daftar Organisasi Perangkat Daerah
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full font-poppins">
            <thead class="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-green-200">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 tracking-wide">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs text-green-600 font-bold">#</span>
                    No
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 tracking-wide">
                  <div class="flex items-center gap-2">
                    <span class="text-green-600">🏛️</span>
                    Nama OPD
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 tracking-wide">
                  <div class="flex items-center gap-2">
                    <span class="text-blue-600">👤</span>
                    Kepala Dinas
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 tracking-wide">
                  <div class="flex items-center gap-2">
                    <span class="text-green-600">✅</span>
                    Status
                  </div>
                </th>
                <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700 tracking-wide">
                  <div class="flex items-center justify-center gap-2">
                    <span class="text-purple-600">⚙️</span>
                    Aksi
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-if="filteredOPD.length === 0">
                <td colspan="5" class="px-6 py-12 text-center">
                  <div class="flex flex-col items-center gap-4">
                    <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <span class="text-4xl text-gray-400">📄</span>
                    </div>
                    <div class="text-gray-500 font-poppins">
                      <p class="text-lg font-medium">Tidak ada data OPD</p>
                      <p class="text-sm">Silakan tambah data OPD baru</p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr v-for="(opd, index) in filteredOPD" :key="opd.id" class="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-200">
                <td class="px-6 py-5">
                  <div class="flex items-center">
                    <span class="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold font-poppins">
                      {{ index + 1 }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-lg">
                      🏛️
                    </div>
                    <div>
                      <div class="text-sm font-semibold text-gray-900 font-poppins">{{ opd.namaOpd }}</div>
                      <div class="text-xs text-gray-500 font-poppins">Organisasi Perangkat Daerah</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span class="text-blue-600 text-sm">👤</span>
                    </div>
                    <span class="text-sm font-medium text-gray-700 font-poppins">
                      {{ opd.kepalaDinas || 'Belum diisi' }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-poppins">
                    <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Aktif
                  </span>
                </td>
                <td class="px-6 py-5 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      @click="editOPD(opd)"
                      class="group bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110"
                      title="Edit OPD"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button
                      @click="confirmDelete(opd)"
                      class="group bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110"
                      title="Hapus OPD"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
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

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-poppins">
      <div class="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-white text-xl">
            {{ showEditModal ? '✏️' : '➕' }}
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900">
              {{ showEditModal ? 'Edit OPD' : 'Tambah OPD Baru' }}
            </h3>
            <p class="text-sm text-gray-500">{{ showEditModal ? 'Perbarui informasi OPD' : 'Masukkan informasi OPD baru' }}</p>
          </div>
        </div>
        
        <form @submit.prevent="showEditModal ? updateOPD() : createOPD()">
          <div class="space-y-6">
            <div>
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <span class="text-green-600">🏛️</span>
                Nama OPD *
              </label>
              <input
                v-model="formData.nama_opd"
                type="text"
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 font-medium transition-all duration-200"
                placeholder="Masukkan nama OPD"
              >
            </div>
            <div>
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <span class="text-blue-600">👤</span>
                Kepala Dinas
              </label>
              <input
                v-model="formData.kode_opd"
                type="text"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 font-medium transition-all duration-200"
                placeholder="Masukkan nama kepala dinas (opsional)"
              >
            </div>
          </div>
          
          <div class="flex justify-end gap-4 mt-8">
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 font-semibold shadow-lg"
            >
              {{ submitting ? 'Menyimpan...' : (showEditModal ? 'Update Data' : 'Simpan Data') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-poppins">
      <div class="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center">
            <span class="text-3xl">⚠️</span>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900">Konfirmasi Hapus</h3>
            <p class="text-sm text-gray-600">Data yang dihapus tidak dapat dikembalikan</p>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 mb-6 border border-red-200">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🏛️</span>
            <div>
              <p class="font-semibold text-gray-900">{{ selectedOPD?.namaOpd }}</p>
              <p class="text-sm text-gray-600">Organisasi Perangkat Daerah</p>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end gap-4">
          <button
            @click="showDeleteModal = false"
            class="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-semibold"
          >
            Batal
          </button>
          <button
            @click="deleteOPD"
            :disabled="submitting"
            class="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl transition-all duration-200 disabled:opacity-50 font-semibold shadow-lg"
          >
            {{ submitting ? 'Menghapus...' : 'Hapus Data' }}
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
const opdList = ref([])
const loading = ref(true)
const error = ref('')
const searchQuery = ref('')
const submitting = ref(false)

// Modal states
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)

// Form data
const formData = ref({
  nama_opd: '',
  kode_opd: ''
})

const selectedOPD = ref(null)

// Computed
const filteredOPD = computed(() => {
  if (!searchQuery.value) return opdList.value
  
  return opdList.value.filter(opd => 
    opd.namaOpd.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Methods
const loadOPD = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const response = await $fetch('/api/master-opd')
    opdList.value = response.data || []
  } catch (err) {
    console.error('Error loading OPD:', err)
    error.value = 'Gagal memuat data OPD'
    opdList.value = []
  } finally {
    loading.value = false
  }
}

const createOPD = async () => {
  try {
    submitting.value = true
    
    const response = await $fetch('/api/master-opd', {
      method: 'POST',
      body: formData.value
    })
    
    if (response.success) {
      await loadOPD()
      closeModal()
      showNotification('OPD berhasil ditambahkan', 'success')
    }
  } catch (err) {
    console.error('Error creating OPD:', err)
    showNotification('Gagal menambahkan OPD', 'error')
  } finally {
    submitting.value = false
  }
}

const editOPD = (opd) => {
  selectedOPD.value = opd
  formData.value = {
    nama_opd: opd.namaOpd,
    kode_opd: opd.kepalaDinas || ''
  }
  showEditModal.value = true
}

const updateOPD = async () => {
  try {
    submitting.value = true
    
    const response = await $fetch(`/api/master-opd/${selectedOPD.value.id}`, {
      method: 'PUT',
      body: formData.value
    })
    
    if (response.success) {
      await loadOPD()
      closeModal()
      showNotification('OPD berhasil diperbarui', 'success')
    }
  } catch (err) {
    console.error('Error updating OPD:', err)
    showNotification('Gagal memperbarui OPD', 'error')
  } finally {
    submitting.value = false
  }
}

const confirmDelete = (opd) => {
  selectedOPD.value = opd
  showDeleteModal.value = true
}

const deleteOPD = async () => {
  try {
    submitting.value = true
    
    const response = await $fetch(`/api/master-opd/${selectedOPD.value.id}`, {
      method: 'DELETE'
    })
    
    if (response.success) {
      await loadOPD()
      showDeleteModal.value = false
      showNotification('OPD berhasil dihapus', 'success')
    }
  } catch (err) {
    console.error('Error deleting OPD:', err)
    showNotification('Gagal menghapus OPD', 'error')
  } finally {
    submitting.value = false
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  formData.value = {
    nama_opd: '',
    kode_opd: ''
  }
  selectedOPD.value = null
}

const showNotification = (message, type = 'info') => {
  // Simple notification - you can enhance this with a proper notification system
  if (type === 'success') {
    alert(`✅ ${message}`)
  } else if (type === 'error') {
    alert(`❌ ${message}`)
  } else {
    alert(message)
  }
}

// Load data on mount
onMounted(() => {
  loadOPD()
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

/* Smooth animations */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #10b981, #14b8a6);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(90deg, #059669, #0d9488);
}
</style>
