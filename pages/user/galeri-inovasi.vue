<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Galeri Inovasi</h1>
        <p class="mt-2 text-gray-600">
          Jelajahi berbagai inovasi yang telah dikembangkan dan diimplementasikan
        </p>
      </div>

      <!-- Filter and Search -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari inovasi..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div class="sm:w-48">
            <select
              v-model="categoryFilter"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Semua Kategori</option>
              <option value="teknologi">Teknologi</option>
              <option value="pelayanan">Pelayanan</option>
              <option value="administrasi">Administrasi</option>
              <option value="lingkungan">Lingkungan</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Innovation Gallery Grid -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-gray-600">Memuat galeri inovasi...</span>
        </div>
      </div>

      <div v-else-if="filteredInnovations.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">🎨</div>
        <p class="text-lg font-medium text-gray-900">Belum ada inovasi tersedia</p>
        <p class="text-sm text-gray-600 mt-2">Galeri inovasi akan segera diisi dengan berbagai karya inovatif</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="innovation in filteredInnovations" :key="innovation.id" class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <!-- Image -->
          <div class="h-48 bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
            <div class="text-6xl text-white opacity-50">🚀</div>
          </div>
          
          <!-- Content -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">
                {{ innovation.title }}
              </h3>
              <span :class="getCategoryBadgeClass(innovation.category)" class="px-2 py-1 rounded-full text-xs font-medium">
                {{ innovation.category }}
              </span>
            </div>
            
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ innovation.description }}
            </p>
            
            <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div class="flex items-center gap-2">
                <span class="text-lg">👤</span>
                <span>{{ innovation.creator }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">📅</span>
                <span>{{ formatDate(innovation.createdAt) }}</span>
              </div>
            </div>
            
            <div class="flex gap-2">
              <button
                @click="viewDetail(innovation)"
                class="flex-1 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors text-sm"
              >
                Lihat Detail
              </button>
              <button
                @click="likeInnovation(innovation.id)"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
              >
                👍 {{ innovation.likes }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Modal -->
      <div v-if="selectedInnovation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-4 flex items-center justify-between">
            <h3 class="text-xl font-semibold text-white">Detail Inovasi</h3>
            <button @click="selectedInnovation = null" class="text-white hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h4 class="text-2xl font-bold text-gray-900">{{ selectedInnovation.title }}</h4>
              <span :class="getCategoryBadgeClass(selectedInnovation.category)" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ selectedInnovation.category }}
              </span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="space-y-6">
                <div>
                  <h5 class="font-semibold text-gray-900 mb-2">Deskripsi</h5>
                  <p class="text-gray-600">{{ selectedInnovation.description }}</p>
                </div>

                <div>
                  <h5 class="font-semibold text-gray-900 mb-2">Fitur Utama</h5>
                  <ul class="list-disc list-inside text-gray-600 space-y-1">
                    <li v-for="feature in selectedInnovation.features" :key="feature">{{ feature }}</li>
                  </ul>
                </div>

                <div>
                  <h5 class="font-semibold text-gray-900 mb-2">Manfaat</h5>
                  <p class="text-gray-600">{{ selectedInnovation.benefits }}</p>
                </div>
              </div>

              <div class="space-y-6">
                <div class="h-64 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <div class="text-8xl text-white opacity-50">🚀</div>
                </div>

                <div class="bg-gray-50 p-4 rounded-lg">
                  <h5 class="font-semibold text-gray-900 mb-3">Informasi</h5>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Pembuat:</span>
                      <span class="font-medium">{{ selectedInnovation.creator }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Tanggal:</span>
                      <span class="font-medium">{{ formatDate(selectedInnovation.createdAt) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Status:</span>
                      <span class="font-medium text-green-600">Aktif</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Likes:</span>
                      <span class="font-medium">{{ selectedInnovation.likes }}</span>
                    </div>
                  </div>
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

import { ref, computed, onMounted } from 'vue'

// State
const loading = ref(true)
const searchQuery = ref('')
const categoryFilter = ref('')
const selectedInnovation = ref(null)
const innovations = ref([])

// Mock data - replace with real API call
const mockInnovations = [
  {
    id: 1,
    title: 'Sistem Pelayanan Digital Terpadu',
    description: 'Platform digital yang mengintegrasikan berbagai layanan pemerintahan dalam satu sistem untuk memudahkan masyarakat mengakses layanan publik.',
    category: 'teknologi',
    creator: 'Tim IT Diskominfo',
    createdAt: '2024-10-01',
    likes: 24,
    features: ['Antrian online', 'Tracking status', 'Notifikasi real-time', 'Multi-channel support'],
    benefits: 'Mengurangi waktu tunggu pelayanan hingga 70% dan meningkatkan kepuasan masyarakat dalam mengakses layanan publik.'
  },
  {
    id: 2,
    title: 'Program Sampah Bank Digital',
    description: 'Inovasi pengelolaan sampah berbasis teknologi yang memberikan reward kepada masyarakat untuk mendaur ulang sampah.',
    category: 'lingkungan',
    creator: 'Dinas Lingkungan Hidup',
    createdAt: '2024-09-15',
    likes: 18,
    features: ['QR Code tracking', 'Point reward system', 'Marketplace sampah', 'Edukasi lingkungan'],
    benefits: 'Mengurangi volume sampah kota hingga 30% dan meningkatkan kesadaran masyarakat tentang lingkungan.'
  },
  {
    id: 3,
    title: 'Aplikasi Perizinan Express',
    description: 'Sistem perizinan online yang mempercepat proses pengurusan izin usaha dan dokumen lainnya.',
    category: 'administrasi',
    creator: 'DPMPTSP Kota Cilegon',
    createdAt: '2024-08-20',
    likes: 31,
    features: ['Upload dokumen online', 'Verifikasi otomatis', 'Payment gateway', 'Dashboard monitoring'],
    benefits: 'Mempercepat proses perizinan dari 14 hari menjadi 3 hari kerja dan mengurangi birokrasi.'
  }
]

// Computed
const filteredInnovations = computed(() => {
  let filtered = innovations.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(innovation => 
      innovation.title.toLowerCase().includes(query) ||
      innovation.description.toLowerCase().includes(query) ||
      innovation.creator.toLowerCase().includes(query)
    )
  }

  if (categoryFilter.value) {
    filtered = filtered.filter(innovation => innovation.category === categoryFilter.value)
  }

  return filtered
})

// Methods
const getCategoryBadgeClass = (category) => {
  const classMap = {
    'teknologi': 'bg-blue-100 text-blue-800',
    'pelayanan': 'bg-green-100 text-green-800',
    'administrasi': 'bg-purple-100 text-purple-800',
    'lingkungan': 'bg-orange-100 text-orange-800'
  }
  return classMap[category] || 'bg-gray-100 text-gray-800'
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

const viewDetail = (innovation) => {
  selectedInnovation.value = innovation
}

const likeInnovation = (id) => {
  const innovation = innovations.value.find(item => item.id === id)
  if (innovation) {
    innovation.likes++
  }
}

// Load data
onMounted(async () => {
  loading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  innovations.value = mockInnovations
  loading.value = false
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
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