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

      <!-- Filter and Search -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari usulan inovasi..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div class="sm:w-48">
            <select
              v-model="statusFilter"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Semua Status</option>
              <option value="pending">Dalam Review</option>
              <option value="approved">Disetujui</option>
              <option value="rejected">Ditolak</option>
            </select>
          </div>
          <button
            @click="refreshData"
            class="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      <!-- Usulan List -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-600">
          <h2 class="text-xl font-semibold text-white">Daftar Usulan Inovasi</h2>
        </div>

        <div v-if="loading" class="p-8 text-center">
          <div class="inline-flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-gray-600">Memuat data...</span>
          </div>
        </div>

        <div v-else-if="filteredUsulan.length === 0" class="p-8 text-center text-gray-500">
          <div class="text-6xl mb-4">📝</div>
          <p class="text-lg font-medium">Belum ada usulan inovasi</p>
          <p class="text-sm mt-2">
            <NuxtLink to="/user/usulan-inovasi" class="text-teal-600 hover:text-teal-700 font-medium">
              Ajukan usulan pertama Anda →
            </NuxtLink>
          </p>
        </div>

        <div v-else class="divide-y divide-gray-200">
          <div v-for="usulan in filteredUsulan" :key="usulan.id" class="p-6 hover:bg-gray-50 transition-colors">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-3">
                  <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">
                    {{ usulan.ideInovasi || 'Tanpa Judul' }}
                  </h3>
                  <span :class="getStatusBadgeClass(usulan.status || 'pending')" class="px-3 py-1 rounded-full text-xs font-medium">
                    {{ getStatusText(usulan.status || 'pending') }}
                  </span>
                </div>
                
                <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                  {{ usulan.deskripsiSingkat || 'Tidak ada deskripsi' }}
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 mb-3">
                  <div>
                    <span class="font-medium">Stakeholder:</span>
                    <p class="line-clamp-1">{{ usulan.stakeholderInovasi || '-' }}</p>
                  </div>
                  <div>
                    <span class="font-medium">Penerima Manfaat:</span>
                    <p class="line-clamp-1">{{ usulan.penerimaManfaat || '-' }}</p>
                  </div>
                  <div>
                    <span class="font-medium">Tanggal Diajukan:</span>
                    <p>{{ formatDate(usulan.createdAt) }}</p>
                  </div>
                </div>

                <div v-if="usulan.keterangan" class="text-sm">
                  <span class="font-medium text-gray-700">Keterangan:</span>
                  <p class="text-gray-600 line-clamp-2">{{ usulan.keterangan }}</p>
                </div>
              </div>

              <div class="ml-6 flex flex-col gap-2">
                <button
                  @click="viewDetail(usulan)"
                  class="px-4 py-2 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                >
                  Lihat Detail
                </button>
                <button
                  v-if="usulan.status === 'pending'"
                  @click="editUsulan(usulan)"
                  class="px-4 py-2 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="filteredUsulan.length > 0" class="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <p class="text-sm text-gray-700">
            Menampilkan {{ filteredUsulan.length }} dari {{ usulanList.length }} usulan
          </p>
        </div>
      </div>

      <!-- Detail Modal -->
      <div v-if="selectedUsulan" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-4 flex items-center justify-between">
            <h3 class="text-xl font-semibold text-white">Detail Usulan Inovasi</h3>
            <button @click="selectedUsulan = null" class="text-white hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="p-6 space-y-6">
            <div class="flex items-center justify-between">
              <h4 class="text-lg font-semibold">{{ selectedUsulan.ideInovasi || 'Tanpa Judul' }}</h4>
              <span :class="getStatusBadgeClass(selectedUsulan.status || 'pending')" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ getStatusText(selectedUsulan.status || 'pending') }}
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <h5 class="font-medium text-gray-900 mb-2">Latar Belakang</h5>
                  <p class="text-gray-600 text-sm">{{ selectedUsulan.latarBelakang || '-' }}</p>
                </div>

                <div>
                  <h5 class="font-medium text-gray-900 mb-2">Stakeholder Inovasi</h5>
                  <p class="text-gray-600 text-sm">{{ selectedUsulan.stakeholderInovasi || '-' }}</p>
                </div>

                <div>
                  <h5 class="font-medium text-gray-900 mb-2">Sumber Daya</h5>
                  <p class="text-gray-600 text-sm">{{ selectedUsulan.sumberDaya || '-' }}</p>
                </div>

                <div>
                  <h5 class="font-medium text-gray-900 mb-2">Kebaruan/Inovasi</h5>
                  <p class="text-gray-600 text-sm">{{ selectedUsulan.kebaruan || '-' }}</p>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <h5 class="font-medium text-gray-900 mb-2">Deskripsi Singkat</h5>
                  <p class="text-gray-600 text-sm">{{ selectedUsulan.deskripsiSingkat || '-' }}</p>
                </div>

                <div>
                  <h5 class="font-medium text-gray-900 mb-2">Penerima Manfaat</h5>
                  <p class="text-gray-600 text-sm">{{ selectedUsulan.penerimaManfaat || '-' }}</p>
                </div>

                <div>
                  <h5 class="font-medium text-gray-900 mb-2">Keterangan</h5>
                  <p class="text-gray-600 text-sm">{{ selectedUsulan.keterangan || '-' }}</p>
                </div>

                <div>
                  <h5 class="font-medium text-gray-900 mb-2">Tanggal Diajukan</h5>
                  <p class="text-gray-600 text-sm">{{ formatDate(selectedUsulan.createdAt) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'user'
})

import { ref, onMounted, computed } from 'vue'

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
    const token = localStorage.getItem('auth-token')
    
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