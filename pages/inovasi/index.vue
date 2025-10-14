<template>
  <div class="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-yellow-50">
    <!-- Header Section -->
    <div class="bg-white/80 backdrop-blur-sm shadow-sm border-b border-teal-100">
      <div class="max-w-7xl mx-auto px-6 py-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold text-teal-800 flex items-center gap-3">
              <i class="fas fa-map-marked-alt text-yellow-500"></i>
              Peta Sebaran Inovasi
            </h1>
            <p class="text-teal-600 mt-1">Eksplorasi inovasi daerah dan lokasinya di Kota Cilegon</p>
          </div>
          <button @click="showForm = true" 
            class="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            <i class="fas fa-plus mr-2"></i>Tambah Inovasi
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Map Container -->
      <div class="bg-white rounded-2xl shadow-xl border border-teal-100 overflow-hidden mb-8">
        <div class="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-4">
          <h2 class="text-xl font-semibold flex items-center gap-2">
            <i class="fas fa-globe text-yellow-400"></i>
            Peta Sebaran Inovator
          </h2>
        </div>
        <div class="relative">
          <div id="map" class="h-96 w-full bg-gray-100"></div>
          <div v-if="isLoadingMap" class="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div class="text-teal-600">
              <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
              <p>Memuat peta...</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Control Section -->
      <div class="bg-white rounded-2xl shadow-xl border border-teal-100 mb-8 p-6">
        <h3 class="text-lg font-semibold text-teal-800 mb-4 flex items-center gap-2">
          <i class="fas fa-filter text-yellow-500"></i>
          Filter & Pencarian
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search Bar -->
          <div class="relative">
            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400"></i>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Cari judul inovasi, deskripsi, atau nama inovator..."
              class="w-full pl-12 pr-4 py-3 border-2 border-teal-100 rounded-xl focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all"
            >
          </div>
          
          <!-- Kecamatan Filter -->
          <select 
            v-model="selectedCategory"
            class="w-full px-4 py-3 border-2 border-teal-100 rounded-xl focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all bg-white"
          >
            <option value="">Semua Kecamatan</option>
            <option value="Cibeber">Kecamatan Cibeber</option>
            <option value="Cilegon">Kecamatan Cilegon</option>
            <option value="Citangkil">Kecamatan Citangkil</option>
            <option value="Ciwandan">Kecamatan Ciwandan</option>
            <option value="Jombang">Kecamatan Jombang</option>
            <option value="Pulomerak">Kecamatan Pulomerak</option>
            <option value="Purwakarta">Kecamatan Purwakarta</option>
            <option value="Grogol">Kecamatan Grogol</option>
          </select>

          <!-- SDGs Filter -->
          <select 
            v-model="selectedSdgs"
            class="w-full px-4 py-3 border-2 border-teal-100 rounded-xl focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all bg-white"
          >
            <option value="">Semua SDGs</option>
            <option v-for="[id, sdg] in sdgsMap" :key="id" :value="id">
              SDG {{ sdg.tujuanKe || id }}: {{ sdg.sdgs }}
            </option>
          </select>
        </div>
      </div>

      <!-- Innovation List Table -->
      <div class="bg-white rounded-2xl shadow-xl border border-teal-100">
        <div class="bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-800 px-6 py-4">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold flex items-center gap-2">
              <i class="fas fa-lightbulb text-white"></i>
              Daftar Inovasi ({{ filteredInovasi.length }})
            </h2>
            <div v-if="filteredInovasi.length > 0" class="text-sm flex items-center gap-4">
              <span>Menampilkan {{ paginationInfo.start }}-{{ paginationInfo.end }} dari {{ paginationInfo.total }} hasil</span>
              <div class="flex items-center gap-2">
                <label class="text-xs">Per halaman:</label>
                <select 
                  v-model="itemsPerPage" 
                  @change="changeItemsPerPage(itemsPerPage)"
                  class="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500 bg-white"
                >
                  <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="isLoading" class="p-8 text-center">
          <i class="fas fa-spinner fa-spin text-3xl text-teal-400 mb-4"></i>
          <p class="text-teal-600">Memuat data inovasi...</p>
        </div>

        <div v-else-if="filteredInovasi.length === 0" class="p-8 text-center">
          <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
          <p class="text-gray-500">Tidak ada inovasi yang ditemukan</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-teal-200">
            <thead class="bg-teal-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider">#</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider">Judul Inovasi</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider">Inovator</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider">SDGs</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider">Kecamatan</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider">Tahun</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-teal-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            
            <!-- Table Body -->
            <tbody class="bg-white divide-y divide-teal-50">
              <tr 
                v-for="(inovasi, index) in paginatedInovasi" 
                :key="inovasi.id || index"
                :class="['hover:bg-teal-50 transition-colors cursor-pointer', selectedInovasi?.id === inovasi.id ? 'bg-teal-100' : '']"
                @click="highlightInovasi(inovasi)"
              >
                <!-- Nomor -->
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ ((currentPage - 1) * itemsPerPage) + index + 1 }}
                </td>
                
                <!-- Judul Inovasi -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  <div class="max-w-sm">
                    <div class="font-semibold text-teal-800 leading-tight mb-2 whitespace-normal break-words">{{ inovasi.judulInovasi }}</div>
                    <div class="text-gray-500 text-xs leading-tight whitespace-normal break-words">{{ inovasi.deskripsi }}</div>
                  </div>
                </td>
                
                <!-- Inovator -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-user text-teal-400"></i>
                    <span class="font-medium">{{ inovasi.inovatorData?.inovator || 'Tidak diketahui' }}</span>
                  </div>
                </td>
                
                <!-- SDGs -->
                <td class="px-6 py-4 text-sm">
                  <div v-if="inovasi.sdgs && getSdgsData(inovasi.sdgs)" class="flex items-center gap-3">
                    <img 
                      v-if="getSdgsData(inovasi.sdgs).image" 
                      :src="getSdgsData(inovasi.sdgs).image" 
                      :alt="'SDG ' + getSdgsData(inovasi.sdgs).sdgs"
                      class="w-12 h-12 object-contain rounded-lg shadow-sm border border-gray-200"
                      :title="getSdgsData(inovasi.sdgs).sdgs"
                    >
                    <div v-else class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                      <span class="text-white text-xs font-bold">{{ inovasi.sdgs }}</span>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="font-semibold text-blue-800 text-xs leading-tight">
                        {{ getSdgsData(inovasi.sdgs).sdgs || `SDG ${inovasi.sdgs}` }}
                      </div>
                    </div>
                  </div>
                  <div v-else-if="inovasi.sdgs" class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center shadow-sm">
                      <span class="text-white text-xs font-bold">{{ inovasi.sdgs }}</span>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="font-semibold text-gray-700 text-xs leading-tight">
                        SDG {{ inovasi.sdgs }}
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-gray-400 text-xs flex items-center justify-center h-12">
                    <i class="fas fa-minus"></i>
                  </div>
                </td>
                
                <!-- Kecamatan -->
                <td class="px-6 py-4 text-sm">
                  <span 
                    :class="getKecamatanColor(inovasi.inovatorData?.kecamatanData?.nama || 'Tidak diketahui')"
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  >
                    Kecamatan {{ inovasi.inovatorData?.kecamatanData?.nama || 'Tidak diketahui' }}
                  </span>
                </td>
                
                <!-- Tahun -->
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ inovasi.tahun }}
                </td>
                
                <!-- Actions -->
                <td class="px-6 py-4 text-sm">
                  <div class="flex items-center justify-center">
                    <button 
                      @click.stop="inovasi.inovatorData?.longlat ? focusOnMap(inovasi.inovatorData.longlat) : viewDetails(inovasi)"
                      :class="[
                        'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        inovasi.inovatorData?.longlat 
                          ? 'bg-teal-100 hover:bg-teal-200 text-teal-700' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      ]"
                      :title="inovasi.inovatorData?.longlat ? 'Lihat di Peta' : 'Lihat Detail'"
                    >
                      <i class="fas fa-eye"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Pagination Controls -->
          <div v-if="totalPages > 1" class="bg-gray-50 px-6 py-4 border-t border-teal-100">
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-600">
                Halaman {{ currentPage }} dari {{ totalPages }}
              </div>
              
              <div class="flex items-center gap-2">
                <!-- Previous Button -->
                <button 
                  @click="prevPage" 
                  :disabled="currentPage === 1"
                  :class="[
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    currentPage === 1 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                  ]"
                >
                  <i class="fas fa-chevron-left mr-1"></i>
                  Sebelumnya
                </button>
                
                <!-- Page Numbers -->
                <div class="flex items-center gap-1">
                  <!-- First page -->
                  <button 
                    v-if="currentPage > 3" 
                    @click="goToPage(1)"
                    class="w-8 h-8 text-sm font-medium rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    1
                  </button>
                  
                  <!-- Ellipsis -->
                  <span v-if="currentPage > 4" class="text-gray-500 px-2">...</span>
                  
                  <!-- Page numbers around current page -->
                  <button 
                    v-for="page in getVisiblePages()" 
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                      'w-8 h-8 text-sm font-medium rounded-lg transition-colors',
                      page === currentPage
                        ? 'bg-teal-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                  
                  <!-- Ellipsis -->
                  <span v-if="currentPage < totalPages - 3" class="text-gray-500 px-2">...</span>
                  
                  <!-- Last page -->
                  <button 
                    v-if="currentPage < totalPages - 2" 
                    @click="goToPage(totalPages)"
                    class="w-8 h-8 text-sm font-medium rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    {{ totalPages }}
                  </button>
                </div>
                
                <!-- Next Button -->
                <button 
                  @click="nextPage" 
                  :disabled="currentPage === totalPages"
                  :class="[
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    currentPage === totalPages 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                  ]"
                >
                  Selanjutnya
                  <i class="fas fa-chevron-right ml-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Modal -->
    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
        <button @click="showForm = false" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
        <h2 class="text-2xl font-bold text-teal-700 mb-4">Form Pendaftaran Inovasi</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-teal-700 mb-1">Nama Inovasi</label>
            <input v-model="form.nama" type="text" placeholder="Nama Inovasi" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400" required />
          </div>
          <div>
            <label class="block text-sm font-semibold text-teal-700 mb-1">Deskripsi</label>
            <textarea v-model="form.deskripsi" placeholder="Deskripsi singkat inovasi" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400" rows="3" required></textarea>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-teal-700 mb-1">Kategori</label>
              <select v-model="form.kategori" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" required>
                <option value="">Pilih Kategori</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Digital">Digital</option>
                <option value="Lingkungan">Lingkungan</option>
                <option value="Infrastruktur">Infrastruktur</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-teal-700 mb-1">OPD</label>
              <input v-model="form.opd" type="text" placeholder="Nama OPD" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-teal-700 mb-1">Kontak Pengusul</label>
            <input v-model="form.kontak" type="text" placeholder="Email/HP" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-400" required />
          </div>
          <button type="submit" class="w-full bg-teal-600 text-white py-2 rounded font-bold hover:bg-teal-700 transition">Kirim Ide</button>
        </form>
        <div v-if="formSuccess" class="mt-4 text-teal-700 font-bold">Ide berhasil didaftarkan!</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'

// SEO Meta
useSeoMeta({
  title: 'Peta Inovasi - DINDA Cilegon',
  description: 'Eksplorasi peta sebaran inovasi daerah di Kota Cilegon dengan visualisasi interaktif'
})

// Reactive State
const showForm = ref(false)
const formSuccess = ref(false)
const form = ref({ nama: '', opd: '', deskripsi: '', kategori: '', kontak: '' })

const isLoading = ref(true)
const isLoadingMap = ref(true)
const inovasiData = ref([])
const map = ref(null)
const markers = ref([])

// Filter state
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedSdgs = ref('')
const selectedInovasi = ref(null)

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(25)
const itemsPerPageOptions = [25, 50, 100]

// Fetch data inovasi dan SDGs
const { data: apiData } = await useFetch('/api/debug/inovasi')
const { data: sdgsData } = await useFetch('/api/sdgs')

// Create SDGs lookup map
const sdgsMap = ref(new Map())
if (sdgsData.value?.success) {
  sdgsData.value.data.forEach(sdg => {
    sdgsMap.value.set(sdg.id, sdg) // Use sdg.id as key
  })
  console.log('SDGs loaded:', sdgsMap.value.size)
  console.log('Sample SDG data:', sdgsData.value.data[0]) // Debug: check SDG structure
}

// Process inovasi data
if (apiData.value?.success) {
  inovasiData.value = apiData.value.data
  console.log('Loaded inovasi data:', inovasiData.value.length)
  console.log('Debug info:', apiData.value.debug)
  
  // Debug: Check structure of inovasi data
  if (inovasiData.value.length > 0) {
    console.log('Sample inovasi structure:', inovasiData.value[0])
    console.log('Sample inovatorData:', inovasiData.value[0]?.inovatorData)
    console.log('Sample kecamatanData:', inovasiData.value[0]?.inovatorData?.kecamatanData)
  }
  
  // Log sample data
  if (apiData.value.debug?.sampleCoordinates) {
    console.log('Sample coordinates:', apiData.value.debug.sampleCoordinates)
  }
  
  isLoading.value = false
} else {
  console.error('Failed to load inovasi data:', apiData.value)
  isLoading.value = false
}

// Computed filtered data
const filteredInovasi = computed(() => {
  return inovasiData.value.filter(inovasi => {
    // Enhanced search: judul inovasi, deskripsi, atau nama inovator
    const matchesSearch = !searchQuery.value || 
      inovasi.judulInovasi?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      inovasi.deskripsi?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      inovasi.inovatorData?.inovator?.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Filter by kecamatan
    const matchesCategory = !selectedCategory.value || 
      inovasi.inovatorData?.kecamatanData?.nama?.toLowerCase().includes(selectedCategory.value.toLowerCase())
    
    // Filter by SDGs
    const matchesSdgs = !selectedSdgs.value || 
      (inovasi.sdgs && inovasi.sdgs.toString() === selectedSdgs.value.toString())
    
    return matchesSearch && matchesCategory && matchesSdgs
  })
})

// Computed paginated data
const paginatedInovasi = computed(() => {
  const filtered = filteredInovasi.value
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return filtered.slice(startIndex, endIndex)
})

// Computed pagination info
const totalPages = computed(() => {
  return Math.ceil(filteredInovasi.value.length / itemsPerPage.value)
})

const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value + 1
  const end = Math.min(currentPage.value * itemsPerPage.value, filteredInovasi.value.length)
  const total = filteredInovasi.value.length
  return { start, end, total }
})

// SDGs helper function
const getSdgsData = (sdgsId) => {
  return sdgsMap.value.get(sdgsId) || null
}

// Kecamatan color helper function
const getKecamatanColor = (kecamatanName) => {
  const colors = {
    'Cibeber': 'bg-blue-100 text-blue-800',
    'Cilegon': 'bg-green-100 text-green-800',
    'Citangkil': 'bg-purple-100 text-purple-800',
    'Ciwandan': 'bg-pink-100 text-pink-800',
    'Jombang': 'bg-indigo-100 text-indigo-800',
    'Pulomerak': 'bg-red-100 text-red-800',
    'Purwakarta': 'bg-orange-100 text-orange-800',
    'Gerogol': 'bg-cyan-100 text-cyan-800',
    'Tidak diketahui': 'bg-gray-100 text-gray-800'
  }
  
  // Jika kecamatan tidak ada dalam daftar, generate warna berdasarkan hash nama
  if (!colors[kecamatanName]) {
    const hash = kecamatanName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    
    const colorList = [
      'bg-emerald-100 text-emerald-800',
      'bg-teal-100 text-teal-800',
      'bg-sky-100 text-sky-800',
      'bg-violet-100 text-violet-800',
      'bg-fuchsia-100 text-fuchsia-800',
      'bg-rose-100 text-rose-800',
      'bg-amber-100 text-amber-800',
      'bg-lime-100 text-lime-800'
    ]
    
    return colorList[Math.abs(hash) % colorList.length]
  }
  
  return colors[kecamatanName]
}

// Leaflet Map Functions
const initMap = async () => {
  if (typeof window === 'undefined' || !window.L) {
    console.log('Leaflet not available')
    return
  }
  
  await nextTick()
  
  if (map.value) {
    map.value.remove()
  }
  
  console.log('Initializing map...')
  
  try {
    // Initialize map centered on Cilegon
    map.value = window.L.map('map').setView([-6.0175, 106.0641], 12)
    
    // Add tile layer
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.value)
    
    console.log('Map initialized successfully')
    
    // Add markers after map is loaded
    setTimeout(() => {
      addMarkersToMap()
      isLoadingMap.value = false
    }, 500)
    
  } catch (error) {
    console.error('Error initializing map:', error)
    isLoadingMap.value = false
  }
}

const addMarkersToMap = () => {
  if (!map.value) {
    console.log('Map not initialized yet')
    return
  }
  
  console.log('Adding markers to map, total filtered inovasi:', filteredInovasi.value.length)
  
  // Clear existing markers
  markers.value.forEach(marker => map.value.removeLayer(marker))
  markers.value = []
  
  let markersAdded = 0
  
  // Add new markers
  filteredInovasi.value.forEach((inovasi, index) => {
    if (inovasi.inovatorData?.longlat) {
      console.log(`Processing inovasi ${index}: ${inovasi.judulInovasi}, coordinates: ${inovasi.inovatorData.longlat}`)
      
      const coords = parseCoordinates(inovasi.inovatorData.longlat)
      if (coords) {
        console.log(`Creating marker for ${inovasi.judulInovasi} at:`, coords)
        
        try {
          const marker = window.L.marker(coords)
            .bindPopup(`
              <div class="p-3 min-w-64">
                <h3 class="font-bold text-teal-800 mb-2">${inovasi.judulInovasi}</h3>
                <p class="text-sm text-gray-600 mb-2"><i class="fas fa-user"></i> ${inovasi.inovatorData.inovator || 'Tidak diketahui'}</p>
                <p class="text-xs text-gray-500 mb-2">${(inovasi.deskripsi || '').substring(0, 100)}...</p>
                <div class="flex gap-1 text-xs">
                  <span class="bg-teal-100 text-teal-700 px-2 py-1 rounded">Kecamatan ${inovasi.inovatorData?.kecamatanData?.nama || 'N/A'}</span>
                  <span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">${inovasi.tahun || 'N/A'}</span>
                </div>
                <div class="mt-2 text-xs text-gray-500">
                  <i class="fas fa-map-marker-alt"></i> ${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}
                </div>
              </div>
            `)
            .addTo(map.value)
          
          marker.on('click', () => {
            selectedInovasi.value = inovasi
            console.log('Selected inovasi:', inovasi.judulInovasi)
          })
          
          markers.value.push(marker)
          markersAdded++
        } catch (error) {
          console.error(`Error creating marker for ${inovasi.judulInovasi}:`, error)
        }
      }
    }
  })
  
  console.log(`Successfully added ${markersAdded} markers to map`)
}

// Parse coordinate string
const parseCoordinates = (longlat) => {
  if (!longlat) {
    return null
  }
  
  try {
    const coords = longlat.split(',').map(coord => parseFloat(coord.trim()))
    console.log('Parsing coordinates:', longlat, 'result:', coords)
    
    if (coords.length >= 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
      const lat = coords[0]
      const lng = coords[1]
      
      // Check if coordinates are in reasonable range for Indonesia
      if (lat >= -11 && lat <= 6 && lng >= 95 && lng <= 141) {
        return [lat, lng] // [lat, lng] for Leaflet
      } else if (lng >= -11 && lng <= 6 && lat >= 95 && lat <= 141) {
        // Swapped coordinates - longlat format
        return [lng, lat] // [lat, lng] for Leaflet
      }
      
      console.warn('Coordinates outside Indonesia range:', coords)
      return null
    }
  } catch (e) {
    console.error('Error parsing coordinates:', longlat, e)
  }
  
  return null
}

// Map interaction functions
const focusOnMap = (longlat) => {
  const coords = parseCoordinates(longlat)
  if (coords && map.value) {
    map.value.setView(coords, 15)
    // Find and open popup for this coordinate
    markers.value.forEach(marker => {
      const markerCoords = marker.getLatLng()
      if (Math.abs(markerCoords.lat - coords[0]) < 0.001 && Math.abs(markerCoords.lng - coords[1]) < 0.001) {
        marker.openPopup()
      }
    })
  }
}

const highlightInovasi = (inovasi) => {
  selectedInovasi.value = inovasi
  if (inovasi.inovatorData?.longlat) {
    focusOnMap(inovasi.inovatorData.longlat)
  }
}

const viewDetails = (inovasi) => {
  // Could open a modal or navigate to detail page
  alert(`Detail: ${inovasi.judulInovasi}\n\nInovator: ${inovasi.inovatorData?.inovator || 'Tidak diketahui'}\nKecamatan: ${inovasi.inovatorData?.kecamatanData?.nama || 'Tidak diketahui'}\nTahun: ${inovasi.tahun}\n\n${inovasi.deskripsi}`)
}

// Pagination functions
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const changeItemsPerPage = (newItemsPerPage) => {
  itemsPerPage.value = newItemsPerPage
  currentPage.value = 1 // Reset to first page when changing page size
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const getVisiblePages = () => {
  const pages = []
  const current = currentPage.value
  const total = totalPages.value
  
  // Show 3 pages around current page
  const start = Math.max(1, current - 1)
  const end = Math.min(total, current + 1)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
}

const submitForm = () => {
  // Simulasi submit form
  formSuccess.value = true
  setTimeout(() => {
    formSuccess.value = false
    showForm.value = false
  }, 2000)
}

// Watch filtered data to update map markers
watch(filteredInovasi, () => {
  if (map.value && !isLoadingMap.value) {
    console.log('Filtered data changed, updating markers...')
    setTimeout(() => {
      addMarkersToMap()
    }, 100)
  }
}, { deep: true })

// Reset to first page when filters change
watch([searchQuery, selectedCategory, selectedSdgs], () => {
  currentPage.value = 1
})

// Initialize map when component is mounted
onMounted(() => {
  // Wait for Leaflet to load
  const checkLeaflet = () => {
    if (typeof window !== 'undefined' && window.L) {
      console.log('Leaflet loaded, initializing map...')
      initMap()
    } else {
      console.log('Waiting for Leaflet to load...')
      setTimeout(checkLeaflet, 100)
    }
  }
  checkLeaflet()
})
</script>

<style scoped>
/* Custom Leaflet marker styling */
.leaflet-popup-content-wrapper {
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.leaflet-popup-content {
  margin: 0;
  padding: 0;
}
</style>