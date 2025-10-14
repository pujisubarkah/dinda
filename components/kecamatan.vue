<template>
  <div class="page-container">
    <div class="header">
      <h1>Peta Inovasi</h1>
      <p>Daftar Inovasi Kota Cilegon per Kecamatan</p>
    </div>

    <!-- Controls -->
    <div class="filters">
      <div class="search-and-filter">
        <div class="search-box">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Cari inovasi berdasarkan judul, deskripsi, atau nama inovator..."
            class="search-input"
          />
        </div>
        <div class="filter-box">
          <select 
            v-model="selectedKecamatanFilter"
            class="kecamatan-filter"
            @change="handleKecamatanFilterChange"
          >
            <option value="">Semua Kecamatan</option>
            <option 
              v-for="kecamatan in kecamatans" 
              :key="kecamatan.id" 
              :value="kecamatan.id"
            >
              {{ kecamatan.nama }}
            </option>
          </select>
        </div>
      </div>
      <div class="stats">
        <span class="stat-badge">
          {{ filteredInovasiCount }} inovasi ditemukan
        </span>
      </div>
    </div>

    <!-- Layout 2 Kolom: Peta SVG (Kiri) & Daftar Inovasi (Kanan) -->
    <div class="two-column-layout">
      <!-- Kolom Kiri: Peta SVG -->
      <div class="map-column">
        <div class="map-container">
          <svg 
            ref="svgElement"
            width="100%" 
            height="70vh"
            class="map-svg"
            :viewBox="viewBox"
            @mousedown="startPan"
            @mousemove="pan"
            @mouseup="stopPan"
            @wheel="handleZoom"
          >
            <!-- Background -->
            <rect width="100%" height="100%" fill="#f0f9f8" />
            
            <!-- Render semua kecamatan -->
            <g :transform="`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`">
              <path
                v-for="kecamatan in filteredKecamatans"
                :key="kecamatan.id"
                :d="kecamatan.svgPath || ''"
                :class="['region-path', { 
                  'active': activeKecamatan?.id === kecamatan.id,
                  'hover': hoverKecamatan?.id === kecamatan.id,
                  'highlighted': highlightedKecamatans.includes(kecamatan.id)
                }]"
                @click="handleKecamatanClick(kecamatan)"
                @mouseenter="handleKecamatanHover(kecamatan)"
                @mouseleave="handleKecamatanLeave"
              />
              
              <!-- Labels -->
              <text 
                v-for="kecamatan in filteredKecamatans"
                :key="`label-${kecamatan.id}`"
                :x="getLabelPosition(kecamatan).x"
                :y="getLabelPosition(kecamatan).y"
                class="region-label"
                :class="{ 
                  'active': activeKecamatan?.id === kecamatan.id,
                  'highlighted': highlightedKecamatans.includes(kecamatan.id)
                }"
              >
                {{ kecamatan.nama }}
              </text>
            </g>
          </svg>

          <!-- Map Controls -->
          <div class="map-controls">
            <button @click="resetView" class="control-btn" title="Reset Zoom">
              <span>⟲</span>
            </button>
          </div>

          <!-- Loading Overlay -->
          <div v-if="pending" class="loading-overlay">
            <div class="loading-spinner"></div>
            <p>Memuat data kecamatan...</p>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="error-overlay">
            <div class="error-message">
              <h3>Gagal memuat data</h3>
              <p>{{ error.message }}</p>
              <button @click="refreshData" class="retry-btn">Coba Lagi</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Kolom Kanan: Daftar Inovasi -->
      <div class="innovation-list-column">
        <div class="innovation-header">
          <h3>
            Daftar Inovasi 
            <span v-if="selectedKecamatanFilter">di {{ getKecamatanName(selectedKecamatanFilter) }}</span>
            <span v-else>Kota Cilegon</span>
          </h3>
          <button 
            v-if="selectedKecamatanFilter || searchQuery" 
            @click="resetFilter" 
            class="reset-filter-btn"
            title="Reset semua filter"
          >
            Reset Filter
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="inovasiPending" class="innovation-loading">
          <div class="loading-spinner-small"></div>
          <p>Memuat daftar inovasi...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="inovasiError" class="innovation-error">
          <p>Gagal memuat data inovasi</p>
          <button @click="refreshInovasiData" class="retry-btn-small">Coba Lagi</button>
        </div>

        <!-- Innovation Cards -->
        <div v-else-if="displayedInovasi.length > 0" class="innovation-cards">
          <div 
            v-for="item in displayedInovasi" 
            :key="item.judulInovasi + item.inovatorId"
            class="innovation-card"
          >
            <div class="innovation-card-header">
              <h4 class="innovation-title">{{ item.judulInovasi }}</h4>
              <span class="innovation-year">{{ item.tahun }}</span>
            </div>
            
            <p class="innovation-description">{{ item.deskripsi }}</p>
            
            <div class="innovation-footer">
              <div class="innovator-info">
                <div class="innovator-name">
                  <span class="innovator-label">Inovator:</span>
                  <strong>{{ item.inovator }}</strong>
                  
                  <!-- Button Info Inovator -->
                  <button 
                    v-if="item.inovatorData && (item.inovatorData.alamat || item.inovatorData.longlat)"
                    @click="showInovatorInfo(item.inovatorData, $event)"
                    class="info-btn"
                    title="Lihat info alamat inovator"
                  >
                    i
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Data State -->
        <div v-else class="no-innovation-data">
          <div class="no-data-icon">📋</div>
          <h4>Belum Ada Data Inovasi</h4>
          <p v-if="activeKecamatan">
            Belum ada inovasi yang terdaftar di {{ activeKecamatan.nama }}
          </p>
          <p v-else>
            Klik salah satu kecamatan di peta untuk melihat inovasi
          </p>
        </div>
      </div>
    </div>

    <!-- Modal Info Inovator -->
    <div v-if="showInovatorModal" class="modal-overlay" @click="closeInovatorModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h4>Info Inovator</h4>
          <button @click="closeInovatorModal" class="modal-close-btn">×</button>
        </div>
        <div class="modal-body">
          <div v-if="selectedInovator" class="inovator-details">
            <div class="detail-row">
              <strong>Nama:</strong>
              <span>{{ selectedInovator.inovator }}</span>
            </div>
            <div v-if="selectedInovator.alamat" class="detail-row">
              <strong>Alamat:</strong>
              <span>{{ selectedInovator.alamat }}</span>
            </div>
            <div v-if="selectedInovator.longlat" class="detail-row">
              <strong>Koordinat:</strong>
              <span>{{ selectedInovator.longlat }}</span>
              <a 
                :href="getGoogleMapsUrl(selectedInovator.longlat)"
                target="_blank"
                class="maps-link"
                title="Buka di Google Maps"
              >
                📍 Lihat di Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'

// Fetch data dari API kecamatan
const { data: apiResponse, pending, error, refresh } = await useFetch('/api/kecamatan')

// State
const activeKecamatan = ref(null)
const hoverKecamatan = ref(null)
const svgElement = ref(null)
const searchQuery = ref('')
const highlightedKecamatans = ref([])
const inovasiTable = ref([])
const inovasiPending = ref(false)
const inovasiError = ref(null)
const showInovasiPanel = ref(false)

// New states for innovation list and modal
const allInovasi = ref([])
const showInovatorModal = ref(false)
const selectedInovator = ref(null)
const selectedKecamatanFilter = ref('')

// Zoom & Pan state
const isPanning = ref(false)
const startPanPoint = ref({ x: 0, y: 0 })
const transform = ref({
  x: 0,
  y: 0,
  scale: 1
})

// Watch untuk aktif kecamatan - load inovasi berdasarkan kecamatan
watch(activeKecamatan, async (newKec) => {
  if (newKec && newKec.id) {
    selectedKecamatanFilter.value = newKec.id
    await loadInovasiByKecamatan(newKec.id)
  }
})

// Watch untuk filter kecamatan - load inovasi berdasarkan dropdown
watch(selectedKecamatanFilter, async (newKecamatanId) => {
  if (newKecamatanId) {
    await loadInovasiByKecamatan(newKecamatanId)
    // Update active kecamatan untuk highlight di peta
    const kecamatan = kecamatans.value.find(k => k.id === Number(newKecamatanId))
    if (kecamatan) {
      activeKecamatan.value = kecamatan
    }
  } else {
    // Reset jika "Semua Kecamatan" dipilih
    activeKecamatan.value = null
    inovasiTable.value = []
  }
})

// Load all innovation data
const loadAllInovasi = async () => {
  // Jika sudah ada data, skip
  if (allInovasi.value.length > 0) {
    console.log('Inovasi data already loaded, skipping...')
    return
  }
  
  console.log('Loading all inovasi data...')
  inovasiPending.value = true
  inovasiError.value = null
  
  try {
    const { data, error } = await useFetch('/api/inovasi')
    if (error.value) {
      console.error('Error fetching inovasi:', error.value)
      throw error.value
    }
    
    const inovasiData = data.value?.data || []
    allInovasi.value = inovasiData
    console.log('All inovasi loaded successfully:', inovasiData.length, 'items')
  } catch (e) {
    console.error('Failed to load inovasi:', e)
    inovasiError.value = e
    allInovasi.value = []
  } finally {
    inovasiPending.value = false
  }
}

// Load innovation by kecamatan
const loadInovasiByKecamatan = async (kecamatanId) => {
  inovasiPending.value = true
  inovasiError.value = null
  try {
    const { data, error } = await useFetch(`/api/inovasi/${kecamatanId}`)
    if (error.value) throw error.value
    inovasiTable.value = data.value?.data || []
  } catch (e) {
    inovasiError.value = e
    inovasiTable.value = []
  } finally {
    inovasiPending.value = false
  }
}

// Process data dengan error handling
const kecamatans = computed(() => {
  if (!apiResponse.value?.success) {
    console.warn('API response tidak valid:', apiResponse.value)
    return []
  }
  
  const data = apiResponse.value.data || []
  console.log('Data kecamatan loaded:', data.length)
  
  // Validasi setiap item
  return data.filter(item => {
    const isValid = item && item.id && item.nama
    if (!isValid) {
      console.warn('Invalid kecamatan data:', item)
    }
    return isValid
  })
})

// Filter kecamatan untuk peta (tidak berubah)
const filteredKecamatans = computed(() => {
  return kecamatans.value
})

// Computed untuk menampilkan inovasi berdasarkan filter gabungan
const displayedInovasi = computed(() => {
  let inovasiData = []
  
  // Ambil data inovasi berdasarkan filter kecamatan
  if (selectedKecamatanFilter.value) {
    // Jika ada filter kecamatan, gunakan inovasi dari kecamatan tersebut
    inovasiData = inovasiTable.value || []
  } else {
    // Jika tidak ada filter kecamatan, gunakan semua inovasi
    inovasiData = allInovasi.value || []
  }
  
  // Debug log
  console.log('displayedInovasi computed:', {
    selectedKecamatanFilter: selectedKecamatanFilter.value,
    allInovasiCount: allInovasi.value?.length || 0,
    inovasiTableCount: inovasiTable.value?.length || 0,
    inovasiDataCount: inovasiData.length,
    searchQuery: searchQuery.value
  })
  
  // Terapkan filter pencarian
  if (!searchQuery.value) {
    return inovasiData
  }
  
  const searchLower = searchQuery.value.toLowerCase()
  return inovasiData.filter(item => 
    item.judulInovasi?.toLowerCase().includes(searchLower) ||
    item.deskripsi?.toLowerCase().includes(searchLower) ||
    item.inovator?.toLowerCase().includes(searchLower)
  )
})

// Computed untuk menghitung jumlah inovasi yang terfilter
const filteredInovasiCount = computed(() => {
  return displayedInovasi.value.length
})

// ViewBox calculation - auto fit ke semua kecamatan dengan error handling
const viewBox = computed(() => {
  if (kecamatans.value.length === 0) return '0 0 1000 1000'
  
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  let hasValidData = false
  
  kecamatans.value.forEach(kecamatan => {
    try {
      const path = kecamatan.svgPath
      if (!path || typeof path !== 'string') return
      
      const coordinates = path.match(/[\d.-]+/g) || []
      
      for (let i = 0; i < coordinates.length; i += 2) {
        const x = parseFloat(coordinates[i])
        const y = parseFloat(coordinates[i + 1])
        
        if (!isNaN(x) && !isNaN(y)) {
          minX = Math.min(minX, x)
          minY = Math.min(minY, y)
          maxX = Math.max(maxX, x)
          maxY = Math.max(maxY, y)
          hasValidData = true
        }
      }
    } catch (e) {
      console.warn('Error processing kecamatan path:', kecamatan.id, e)
    }
  })
  
  if (!hasValidData) return '0 0 1000 1000'
  
  const width = maxX - minX
  const height = maxY - minY
  const padding = Math.max(width, height) * 0.1
  
  return `${minX - padding} ${minY - padding} ${width + padding * 2} ${height + padding * 2}`
})

// Methods dengan error handling
const handleKecamatanClick = (kecamatan) => {
  if (!kecamatan) return
  activeKecamatan.value = kecamatan
  selectedKecamatanFilter.value = kecamatan.id
}

const handleKecamatanHover = (kecamatan) => {
  if (!kecamatan) return
  hoverKecamatan.value = kecamatan
  highlightKecamatan(kecamatan.id)
}

const handleKecamatanLeave = () => {
  hoverKecamatan.value = null
  unhighlightKecamatan(highlightedKecamatans.value[0])
}

const highlightKecamatan = (id) => {
  if (id && !highlightedKecamatans.value.includes(id)) {
    highlightedKecamatans.value.push(id)
  }
}

const unhighlightKecamatan = (id) => {
  const index = highlightedKecamatans.value.indexOf(id)
  if (index > -1) {
    highlightedKecamatans.value.splice(index, 1)
  }
}

const closeInovasiPanel = () => {
  showInovasiPanel.value = false
  hoverKecamatan.value = null
}

// Improved getLabelPosition dengan error handling yang lebih baik
const getLabelPosition = (kecamatan) => {
  const defaultPosition = { x: 0, y: 0 }
  
  if (!kecamatan || typeof kecamatan.svgPath !== 'string') {
    return defaultPosition
  }
  
  try {
    const path = kecamatan.svgPath
    const coordinates = path.match(/[-+]?\d*\.?\d+/g) || []
    
    if (coordinates.length < 2) return defaultPosition
    
    let sumX = 0, sumY = 0, count = 0
    
    for (let i = 0; i < coordinates.length; i += 2) {
      const x = parseFloat(coordinates[i])
      const y = parseFloat(coordinates[i + 1])
      
      if (!isNaN(x) && !isNaN(y)) {
        sumX += x
        sumY += y
        count++
      }
    }
    
    if (count === 0) return defaultPosition
    
    return {
      x: sumX / count,
      y: sumY / count
    }
  } catch (e) {
    console.warn('Error calculating label position for kecamatan:', kecamatan.id, e)
    return defaultPosition
  }
}

const zoomToKecamatan = (kecamatan) => {
  if (!kecamatan || !svgElement.value) return
  
  try {
    const position = getLabelPosition(kecamatan)
    const svgRect = svgElement.value.getBoundingClientRect()
    
    // Center pada kecamatan yang dipilih
    transform.value.x = svgRect.width / 2 - position.x * transform.value.scale
    transform.value.y = svgRect.height / 2 - position.y * transform.value.scale
    transform.value.scale = 2 // Zoom level
  } catch (e) {
    console.error('Error zooming to kecamatan:', e)
  }
}

// Zoom & Pan functionality dengan error handling
const startPan = (event) => {
  if (!svgElement.value) return
  
  isPanning.value = true
  startPanPoint.value = {
    x: event.clientX - transform.value.x,
    y: event.clientY - transform.value.y
  }
  svgElement.value.style.cursor = 'grabbing'
}

const pan = (event) => {
  if (!isPanning.value || !svgElement.value) return
  
  transform.value.x = event.clientX - startPanPoint.value.x
  transform.value.y = event.clientY - startPanPoint.value.y
}

const stopPan = () => {
  isPanning.value = false
  if (svgElement.value) {
    svgElement.value.style.cursor = 'grab'
  }
}

const handleZoom = (event) => {
  if (!svgElement.value) return
  
  event.preventDefault()
  const delta = -event.deltaY / 1000
  const newScale = Math.min(Math.max(0.1, transform.value.scale + delta), 5)
  
  const rect = svgElement.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  transform.value.x = x - (x - transform.value.x) * (newScale / transform.value.scale)
  transform.value.y = y - (y - transform.value.y) * (newScale / transform.value.scale)
  transform.value.scale = newScale
}

const zoomIn = () => {
  transform.value.scale = Math.min(5, transform.value.scale * 1.2)
}

const zoomOut = () => {
  transform.value.scale = Math.max(0.1, transform.value.scale / 1.2)
}

const resetView = () => {
  transform.value = { x: 0, y: 0, scale: 1 }
  activeKecamatan.value = null
  highlightedKecamatans.value = []
  showInovasiPanel.value = false
  hoverKecamatan.value = null
}

const refreshData = () => {
  refresh()
}

const refreshInovasiData = async () => {
  if (activeKecamatan.value) {
    await loadInovasiByKecamatan(activeKecamatan.value.id)
  } else {
    await loadAllInovasi()
  }
}

// Reset filter to show all innovations
const resetFilter = () => {
  activeKecamatan.value = null
  selectedKecamatanFilter.value = ''
  searchQuery.value = ''
  highlightedKecamatans.value = []
  resetView()
}

// Handle kecamatan filter change
const handleKecamatanFilterChange = () => {
  // Logic sudah dihandle di watcher selectedKecamatanFilter
  // Method ini bisa digunakan untuk logic tambahan jika diperlukan
}

// Show inovator info modal
const showInovatorInfo = (inovatorData, event) => {
  event.preventDefault()
  event.stopPropagation()
  selectedInovator.value = inovatorData
  showInovatorModal.value = true
}

// Close inovator modal
const closeInovatorModal = () => {
  showInovatorModal.value = false
  selectedInovator.value = null
}

// Generate Google Maps URL from longlat
const getGoogleMapsUrl = (longlat) => {
  if (!longlat) return '#'
  const [lng, lat] = longlat.split(',').map(coord => coord.trim())
  return `https://www.google.com/maps?q=${lat},${lng}`
}

// Get kecamatan name by ID
const getKecamatanName = (id) => {
  const kecamatan = kecamatans.value.find(k => k.id === Number(id))
  return kecamatan?.nama || ''
}

// Load initial data setelah component ready
const initializeData = async () => {
  console.log('Initializing data...')
  await nextTick() // Tunggu reactive updates selesai
  
  // Tunggu sampai ada data kecamatan atau loading selesai
  if (kecamatans.value.length > 0 || !pending.value) {
    console.log('Kecamatan ready, loading inovasi...')
    await loadAllInovasi()
  } else {
    console.log('Waiting for kecamatan data...')
  }
}

// Debug info dan initialize data
onMounted(async () => {
  console.log('Component mounted, data:', {
    kecamatans: kecamatans.value.length,
    apiResponse: apiResponse.value,
    pending: pending.value
  })
  
  await initializeData()
})

// Watch untuk memastikan data inovasi dimuat ketika data kecamatan sudah ready
watch(() => pending.value, async (newPending, oldPending) => {
  // Jika loading selesai dan belum ada data inovasi
  if (oldPending === true && newPending === false && allInovasi.value.length === 0) {
    console.log('Kecamatan data loaded, now loading inovasi...')
    await loadAllInovasi()
  }
}, { immediate: true })

// Watch untuk memastikan data inovasi dimuat saat apiResponse berubah
watch(() => apiResponse.value, async (newData) => {
  if (newData && newData.success && allInovasi.value.length === 0) {
    console.log('API Response received, loading inovasi...')
    await loadAllInovasi()
  }
}, { immediate: true })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 2.5rem;
}

.header p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px 25px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  gap: 20px;
}

.search-and-filter {
  display: flex;
  gap: 20px;
  align-items: center;
  flex: 1;
}

.search-box {
  flex: 1;
}

.search-input {
  padding: 10px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #20B2AA;
}

.filter-box {
  min-width: 220px;
  flex-shrink: 0;
}

.kecamatan-filter {
  padding: 10px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
  width: 100%;
}

.kecamatan-filter:focus {
  outline: none;
  border-color: #20B2AA;
}

.kecamatan-filter:hover {
  border-color: #20B2AA;
}

.stat-badge {
  background: #20B2AA;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

/* Layout 2 Kolom */
.two-column-layout {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  min-height: 70vh;
}

/* Kolom Kiri: Daftar Inovasi */
.innovation-list-column {
  flex: 1;
  background: white;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  max-height: 70vh;
}

.innovation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, #20B2AA, #1E9C96);
  color: white;
  border-radius: 12px 12px 0 0;
}

.innovation-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.reset-filter-btn {
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.reset-filter-btn:hover {
  background: rgba(255,255,255,0.3);
  border-color: rgba(255,255,255,0.5);
}

/* Innovation Cards Container */
.innovation-cards {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Individual Innovation Card */
.innovation-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 16px;
  transition: all 0.3s ease;
  border-left: 4px solid #20B2AA;
}

.innovation-card:hover {
  box-shadow: 0 4px 12px rgba(32, 178, 170, 0.15);
  border-left-color: #1E9C96;
  transform: translateY(-2px);
}

.innovation-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.innovation-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.4;
  flex: 1;
  margin-right: 12px;
}

.innovation-year {
  background: #20B2AA;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.innovation-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.innovation-footer {
  border-top: 1px solid #e9ecef;
  padding-top: 12px;
}

.innovator-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.innovator-name {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.innovator-label {
  color: #7f8c8d;
  font-size: 13px;
}

.innovator-name strong {
  color: #20B2AA;
  font-size: 14px;
}

/* Info Button untuk Inovator */
.info-btn {
  width: 20px;
  height: 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin-left: 8px;
}

.info-btn:hover {
  background: #2980b9;
  transform: scale(1.1);
}

/* Loading, Error, No Data States */
.innovation-loading,
.innovation-error,
.no-innovation-data {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.loading-spinner-small {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #20B2AA;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

.innovation-error {
  color: #e74c3c;
}

.retry-btn-small {
  padding: 8px 16px;
  background: #20B2AA;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.3s ease;
  margin-top: 10px;
}

.retry-btn-small:hover {
  background: #1E9C96;
}

.no-innovation-data {
  color: #7f8c8d;
}

.no-data-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.no-innovation-data h4 {
  margin: 0 0 12px 0;
  color: #5a6c7d;
}

.no-innovation-data p {
  margin: 0;
  font-style: italic;
}

/* Kolom Kanan: Peta */
.map-column {
  flex: 1.2;
}

.map-container {
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  height: 70vh;
}

.map-svg {
  display: block;
  cursor: grab;
  background: #f0f9f8;
}

/* Warna Hijau Tosca untuk Peta */
.region-path {
  fill: #20B2AA;
  stroke: #ffffff;
  stroke-width: 1.5;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.region-path:hover {
  fill: #1E9C96;
  stroke-width: 2.5;
  opacity: 1;
  filter: brightness(1.1);
}

.region-path.active {
  fill: #FF6B6B;
  stroke: #FF5252;
  stroke-width: 3;
  opacity: 1;
}

.region-path.highlighted {
  fill: #4ECDC4;
  stroke: #45B7AF;
  opacity: 1;
  filter: brightness(1.2);
}

.region-label {
  font-size: 11px;
  font-weight: 600;
  fill: #2c3e50;
  pointer-events: none;
  text-anchor: middle;
  font-family: 'Segoe UI', sans-serif;
}

.region-label.active {
  fill: #ffffff;
  font-weight: bold;
  font-size: 12px;
}

.region-label.highlighted {
  fill: #FFFFFF;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

/* Side Panel untuk Inovasi */
.inovasi-side-panel {
  width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  max-height: 600px;
  animation: slideInRight 0.3s ease;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, #20B2AA, #1E9C96);
  color: white;
  border-radius: 12px 12px 0 0;
}

.panel-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.close-panel-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.close-panel-btn:hover {
  background: rgba(255,255,255,0.2);
}

.panel-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* Loading dan Error States dalam Panel */
.inovasi-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: #666;
}

.loading-spinner-small {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #20B2AA;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

.inovasi-error {
  text-align: center;
  padding: 40px 20px;
  color: #e74c3c;
}

.retry-btn-small {
  padding: 8px 16px;
  background: #20B2AA;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.3s ease;
  margin-top: 10px;
}

.retry-btn-small:hover {
  background: #1E9C96;
}

.no-data {
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-style: italic;
}

/* Table Styles dalam Panel */
.inovasi-table-container {
  max-height: 500px;
  overflow-y: auto;
}

.inovasi-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  background: #fafbfc;
  border-radius: 8px;
  overflow: hidden;
}

.inovasi-table th {
  background: #20B2AA;
  color: white;
  padding: 12px 8px;
  text-align: left;
  font-weight: 600;
  font-size: 11px;
  position: sticky;
  top: 0;
  z-index: 1;
}

.inovasi-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #e0e0e0;
  color: #2c3e50;
}

.inovasi-table tbody tr:hover {
  background: #e8f6f5;
}

.inovasi-table tbody tr:last-child td {
  border-bottom: none;
}

.judul-inovasi {
  font-weight: 600;
  color: #2c3e50;
}

.deskripsi {
  color: #666;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.inovator {
  color: #20B2AA;
  font-weight: 500;
}

.tahun {
  color: #7f8c8d;
  text-align: center;
  font-weight: 600;
}

/* Map Controls */
.map-controls {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

.control-btn {
  width: 40px;
  height: 40px;
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: #20B2AA;
  color: white;
  border-color: #20B2AA;
  transform: scale(1.05);
}

.zoom-level {
  text-align: center;
  font-size: 11px;
  color: #666;
  font-weight: 600;
  margin-top: 5px;
}

/* Info Panel */
.info-panel {
  position: absolute;
  top: 20px;
  left: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  border: 1px solid #e0e0e0;
  min-width: 250px;
  max-width: 300px;
  z-index: 10;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, #20B2AA, #1E9C96);
  color: white;
  border-radius: 12px 12px 0 0;
}

.info-header h3 {
  margin: 0;
  font-size: 16px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: white;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
}

.info-content {
  padding: 15px;
}

.info-content p {
  margin: 0 0 15px 0;
  color: #666;
}

.action-btn {
  width: 100%;
  padding: 10px;
  background: #20B2AA;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.3s ease;
}

.action-btn:hover {
  background: #1E9C96;
}

/* Loading dan Error Overlay */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 12px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #20B2AA;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-overlay p {
  margin: 0;
  color: #666;
  font-size: 16px;
  font-weight: 500;
}

.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 12px;
}

.error-message {
  text-align: center;
  padding: 30px;
}

.error-message h3 {
  color: #e74c3c;
  margin-bottom: 10px;
}

.error-message p {
  color: #666;
  margin-bottom: 20px;
}

.retry-btn {
  padding: 10px 20px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.3s ease;
}

.retry-btn:hover {
  background: #c0392b;
}

/* Kecamatan List */
.kecamatan-list {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.kecamatan-list h3 {
  margin: 0 0 15px 0;
  color: #2c3e50;
}

.list-container {
  max-height: 300px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: #f8f9fa;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.list-item:hover {
  background: #e9ecef;
  border-color: #20B2AA;
  transform: translateY(-2px);
}

.list-item.active {
  background: #20B2AA;
  color: white;
  border-color: #1E9C96;
}

.kecamatan-name {
  font-weight: 600;
}

.kecamatan-id {
  font-size: 12px;
  opacity: 0.7;
}

.list-item.active .kecamatan-id {
  opacity: 0.9;
}

/* Scrollbar styling */
.list-container::-webkit-scrollbar,
.inovasi-table-container::-webkit-scrollbar {
  width: 6px;
}

.list-container::-webkit-scrollbar-track,
.inovasi-table-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.list-container::-webkit-scrollbar-thumb,
.inovasi-table-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.list-container::-webkit-scrollbar-thumb:hover,
.inovasi-table-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Modal untuk Info Inovator */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  min-width: 400px;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, #20B2AA, #1E9C96);
  color: white;
}

.modal-header h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.modal-close-btn:hover {
  background: rgba(255,255,255,0.2);
}

.modal-body {
  padding: 20px;
}

.inovator-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-row strong {
  color: #2c3e50;
  font-size: 14px;
  font-weight: 600;
}

.detail-row span {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.maps-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #4285f4;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  margin-top: 8px;
  transition: background 0.3s ease;
  width: fit-content;
}

.maps-link:hover {
  background: #3367d6;
  text-decoration: none;
  color: white;
}

/* Innovation Cards Scrollbar */
.innovation-cards::-webkit-scrollbar {
  width: 6px;
}

.innovation-cards::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.innovation-cards::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.innovation-cards::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive */
@media (max-width: 768px) {
  .page-container {
    padding: 10px;
  }
  
  .two-column-layout {
    flex-direction: column;
    gap: 15px;
  }
  
  .innovation-list-column,
  .map-column {
    flex: none;
  }
  
  .map-column {
    order: 1;
  }
  
  .innovation-list-column {
    order: 2;
    max-height: 50vh;
  }
  
  .map-container {
    height: 40vh;
  }
  
  .filters {
    flex-direction: column;
    gap: 18px;
    align-items: stretch;
    padding: 16px 20px;
  }
  
  .search-and-filter {
    flex-direction: column;
    gap: 16px;
  }
  
  .search-input {
    width: 100%;
  }
  
  .filter-box {
    min-width: auto;
  }
  
  .map-controls {
    top: 10px;
    right: 10px;
  }
  
  .modal-content {
    min-width: 300px;
    margin: 20px;
  }
  
  .innovation-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .reset-filter-btn {
    align-self: center;
  }
}
</style>