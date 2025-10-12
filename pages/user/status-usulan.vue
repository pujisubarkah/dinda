<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Status Usulan Inovasi</h1>
        <p class="mt-2 text-gray-600">
          Pantau status dan progress usulan inovasi yang telah Anda ajukan
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-lg">📝</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Usulan</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span class="text-lg">⏳</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Dalam Review</p>
              <p class="text-2xl font-bold text-yellow-600">{{ stats.pending }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-lg">✅</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Disetujui</p>
              <p class="text-2xl font-bold text-green-600">{{ stats.approved }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span class="text-lg">❌</span>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Ditolak</p>
              <p class="text-2xl font-bold text-red-600">{{ stats.rejected }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter, Search, and Input Button -->
      <div class="bg-white rounded-lg shadow p-6 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div class="flex flex-1 gap-4 w-full">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari usulan inovasi..."
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          <select
            v-model="statusFilter"
            class="w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">Semua Status</option>
            <option value="pending">Dalam Review</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
          <button
            @click="refreshData"
            class="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
          >
            Refresh
          </button>
        </div>
        <button
          @click="showModal = true"
          class="mt-4 sm:mt-0 px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-md hover:from-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors font-semibold shadow-lg"
        >
          + Input Usulan Inovasi
        </button>
      </div>
      <!-- Modal Form Usulan Inovasi -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 relative animate-fade-in max-h-[90vh] overflow-y-auto">
          <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div class="px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-t-2xl">
            <h2 class="text-xl font-semibold text-white">Form Usulan Inovasi</h2>
          </div>
          <form @submit.prevent="submitForm" class="p-6 space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Latar Belakang <span class="text-red-500">*</span></label>
              <textarea v-model="form.latarBelakang" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Ide Inovasi <span class="text-red-500">*</span></label>
              <textarea v-model="form.ideInovasi" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Stakeholder Inovasi <span class="text-red-500">*</span></label>
              <textarea v-model="form.stakeholderInovasi" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sumber Daya <span class="text-red-500">*</span></label>
              <textarea v-model="form.sumberDaya" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Penerima Manfaat <span class="text-red-500">*</span></label>
              <textarea v-model="form.penerimaManfaat" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi Singkat <span class="text-red-500">*</span></label>
              <textarea v-model="form.deskripsiSingkat" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Keterangan Tambahan</label>
              <textarea v-model="form.keterangan" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Kebaruan/Inovasi</label>
              <textarea v-model="form.kebaruan" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"></textarea>
            </div>
            <div class="flex justify-end space-x-4 pt-6 border-t">
              <button type="button" @click="resetForm" class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">Reset</button>
              <button type="submit" :disabled="isSubmitting" class="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-md hover:from-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <span v-if="isSubmitting" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim...
                </span>
                <span v-else>Ajukan Usulan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useToast } from 'vue-toastification'
const toast = useToast()

definePageMeta({ layout: 'user' })

// State
const usulanList = ref([])
const loading = ref(true)
const searchQuery = ref('')
const statusFilter = ref('')
const selectedUsulan = ref(null)
const user = ref(null)

// Stats
const stats = computed(() => {
  return {
    total: usulanList.value.length,
    pending: usulanList.value.filter(u => (u.status || 'pending') === 'pending').length,
    approved: usulanList.value.filter(u => u.status === 'approved').length,
    rejected: usulanList.value.filter(u => u.status === 'rejected').length
  }
})

// Filtered usulan
const filteredUsulan = computed(() => {
  let filtered = usulanList.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(usulan => 
      (usulan.ideInovasi && usulan.ideInovasi.toLowerCase().includes(query)) ||
      (usulan.deskripsiSingkat && usulan.deskripsiSingkat.toLowerCase().includes(query)) ||
      (usulan.latarBelakang && usulan.latarBelakang.toLowerCase().includes(query))
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(usulan => (usulan.status || 'pending') === statusFilter.value)
  }

  return filtered
})

// Get current user and fetch data
onMounted(async () => {
  try {
    const token = localStorage.getItem('dinda_token')
    
    if (token) {
      const response = await $fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.success) {
        user.value = response.data.user
        await fetchUsulanData()
      }
    } else {
      await navigateTo('/login')
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    await navigateTo('/login')
  }
})

// Fetch usulan data
const fetchUsulanData = async () => {
  try {
    loading.value = true
    const response = await $fetch(`/api/ide-inovasi?created_by=${user.value.id}`)
    
    if (response.success) {
      usulanList.value = response.data
    }
  } catch (error) {
    console.error('Error fetching usulan:', error)
  } finally {
    loading.value = false
  }
}

// Utility functions
const getStatusText = (status) => {
  const statusMap = {
    'pending': 'Dalam Review',
    'approved': 'Disetujui',
    'rejected': 'Ditolak'
  }
  return statusMap[status] || 'Dalam Review'
}

const getStatusBadgeClass = (status) => {
  const classMap = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800'
  }
  return classMap[status] || 'bg-yellow-100 text-yellow-800'
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const viewDetail = (usulan) => {
  selectedUsulan.value = usulan
}

const editUsulan = (usulan) => {
  navigateTo(`/user/usulan-inovasi/edit/${usulan.id}`)
}

const refreshData = () => {
  fetchUsulanData()
}

// Modal state & form data
const showModal = ref(false)
const form = ref({
  latarBelakang: '',
  ideInovasi: '',
  stakeholderInovasi: '',
  sumberDaya: '',
  penerimaManfaat: '',
  deskripsiSingkat: '',
  keterangan: '',
  kebaruan: ''
})
const isSubmitting = ref(false)

const submitForm = async () => {
  if (isSubmitting.value) return
  // Validate required fields
  const requiredFields = ['latarBelakang', 'ideInovasi', 'stakeholderInovasi', 'sumberDaya', 'penerimaManfaat', 'deskripsiSingkat']
  const missingFields = requiredFields.filter(field => !form.value[field].trim())
  if (missingFields.length > 0) {
    toast.error('Harap lengkapi semua field yang wajib diisi')
    return
  }
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('dinda_token')
    const userRes = await $fetch('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } })
    if (!userRes.success || !userRes.data?.user) throw new Error('User tidak ditemukan')
    const response = await $fetch('/api/ide-inovasi', {
      method: 'POST',
      body: {
        latar_belakang: form.value.latarBelakang,
        ide_inovasi: form.value.ideInovasi,
        stakeholder_inovasi: form.value.stakeholderInovasi,
        sumber_daya: form.value.sumberDaya,
        penerima_manfaat: form.value.penerimaManfaat,
        deskripsi_singkat: form.value.deskripsiSingkat,
        keterangan: form.value.keterangan,
        kebaruan: form.value.kebaruan,
        created_by: userRes.data.user.id
      }
    })
    if (response.success) {
      toast.success('Anda telah berhasil mengajukan ide inovasi!')
      showModal.value = false
      resetForm()
      await fetchUsulanData()
    } else {
      toast.error('Gagal mengajukan usulan inovasi')
    }
  } catch (error) {
    toast.error('Terjadi kesalahan saat mengajukan usulan')
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  form.value = {
    latarBelakang: '',
    ideInovasi: '',
    stakeholderInovasi: '',
    sumberDaya: '',
    penerimaManfaat: '',
    deskripsiSingkat: '',
    keterangan: '',
    kebaruan: ''
  }
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Apply Poppins font to all text */
* {
  font-family: 'Poppins', sans-serif;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>