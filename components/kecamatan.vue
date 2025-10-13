<template>
  <div class="page-container">
    <div class="header">
      <h1>Peta Kecamatan</h1>
      <p>Data kecamatan dari API</p>
    </div>

    <!-- Controls -->
    <div class="filters">
      <div class="search-box">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Cari kecamatan..."
          class="search-input"
        />
      </div>
      <div class="stats">
        <span class="stat-badge">
          Total: {{ filteredKecamatans.length }} kecamatan
        </span>
      </div>
    </div>

    <!-- Main Map Container dengan Side Panel -->
    <div class="map-with-sidepanel">
      <!-- Map Container -->
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

        <!-- Info Panel -->
        <div v-if="activeKecamatan" class="info-panel">
          <div class="info-header">
            <h3>{{ activeKecamatan.nama }}</h3>
            <button @click="activeKecamatan = null" class="close-btn">×</button>
          </div>
          <div class="info-content">
            <p><strong>ID:</strong> {{ activeKecamatan.id }}</p>
            <button @click="activeKecamatan = null" class="action-btn">Kembali ke Peta</button>
          </div>
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

      <!-- Side Panel untuk Table Inovasi -->
      <div v-if="activeKecamatan && (inovasiTable.length > 0 || inovasiPending || inovasiError)" class="inovasi-table-side-panel">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h4>Inovasi di {{ activeKecamatan.nama }}</h4>
          <button @click="activeKecamatan = null" class="action-btn" style="margin-left: 12px; min-width: 120px;">Kembali ke Peta</button>
        </div>
        <div v-if="inovasiPending" class="inovasi-table-loading">Memuat inovasi...</div>
        <div v-else-if="inovasiError" class="inovasi-table-error">Gagal memuat inovasi</div>
        <table v-else class="inovasi-table">
          <thead>
            <tr>
              <th>Judul Inovasi</th>
              <th>Deskripsi</th>
              <th>Inovator</th>
              <th>Tahun</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in inovasiTable" :key="item.judulInovasi + item.inovatorId">
              <td>{{ item.judulInovasi }}</td>
              <td>{{ item.deskripsi }}</td>
              <td>{{ item.inovator }}</td>
              <td>{{ item.tahun }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

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

// Zoom & Pan state
const isPanning = ref(false)
const startPanPoint = ref({ x: 0, y: 0 })
const transform = ref({
  x: 0,
  y: 0,
  scale: 1
})

// Watch untuk hover kecamatan
watch(activeKecamatan, async (newKec) => {
  if (newKec && newKec.id) {
    inovasiPending.value = true
    inovasiError.value = null
    try {
      const { data, error } = await useFetch(`/api/inovasi/${newKec.id}`)
      if (error.value) throw error.value
      inovasiTable.value = data.value?.data || []
    } catch (e) {
      inovasiError.value = e
      inovasiTable.value = []
    } finally {
      inovasiPending.value = false
    }
  } else {
    inovasiTable.value = []
  }
})

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

// Filter kecamatan berdasarkan pencarian
const filteredKecamatans = computed(() => {
  if (!searchQuery.value) return kecamatans.value
  
  return kecamatans.value.filter(kecamatan =>
    kecamatan.nama?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
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

const refreshInovasiData = () => {
  if (hoverKecamatan.value && hoverKecamatan.value.id) {
    inovasiPending.value = true
    inovasiError.value = null
    
    // Re-fetch data inovasi
    useFetch(`/api/inovasi/${hoverKecamatan.value.id}`).then(({ data, error }) => {
      inovasiPending.value = false
      if (error.value) {
        inovasiError.value = error.value
        inovasiTable.value = []
      } else {
        inovasiTable.value = data.value?.data || []
      }
    })
  }
}

// SEO
useSeoMeta({
  title: 'Peta Kecamatan',
  description: 'Peta interaktif kecamatan dengan data SVG'
})

// Debug info
onMounted(() => {
  console.log('Component mounted, data:', {
    kecamatans: kecamatans.value.length,
    apiResponse: apiResponse.value
  })
})
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
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.search-input {
  padding: 10px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  width: 300px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
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

/* Map dengan Side Panel Layout */
.map-with-sidepanel {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.map-container {
  flex: 1;
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  min-height: 600px;
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

/* Responsive */
@media (max-width: 768px) {
  .page-container {
    padding: 10px;
  }
  
  .map-with-sidepanel {
    flex-direction: column;
  }
  
  .inovasi-side-panel {
    width: 100%;
    max-height: 400px;
  }
  
  .filters {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .search-input {
    width: 100%;
  }
  
  .list-container {
    grid-template-columns: 1fr;
  }
  
  .map-controls {
    top: 10px;
    right: 10px;
  }
  
  .info-panel {
    position: relative;
    top: auto;
    left: auto;
    margin: 10px;
    max-width: none;
  }
}
</style>