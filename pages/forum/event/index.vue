<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- Sidebar Forum -->
    <sidebar_forum class="shrink-0" />
    
    <!-- Main Event Content -->
    <div class="flex-1 p-4 md:p-8">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span class="text-2xl">🎥</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-800 via-purple-700 to-blue-600 bg-clip-text text-transparent">
            Event & Webinar
          </h1>
        </div>
        <p class="text-gray-700 text-lg font-medium">
          📚 Ikuti Webinar dan Event Edukatif Seputar Inovasi Daerah untuk Tingkatkan Wawasan Anda
        </p>
      </div>

      <!-- Search and Filter Section -->
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Search Input -->
          <div class="flex-1">
            <div class="relative">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="🔍 Cari event atau webinar..."
                class="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                @input="handleSearch"
              />
            </div>
          </div>
          
          <!-- Category Filter -->
          <div class="md:w-48">
            <select 
              v-model="selectedCategory"
              @change="filterEvents"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Semua Kategori</option>
              <option value="Teknologi">Teknologi</option>
              <option value="Inovasi">Inovasi</option>
              <option value="SDGs">SDGs</option>
              <option value="Pelayanan Publik">Pelayanan Publik</option>
              <option value="Digital">Digital</option>
            </select>
          </div>
          
          <!-- Status Filter -->
          <div class="md:w-48">
            <select 
              v-model="selectedStatus"
              @change="filterEvents"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Semua Status</option>
              <option value="upcoming">Akan Datang</option>
              <option value="ongoing">Sedang Berlangsung</option>
              <option value="finished">Selesai</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-16">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
        <div class="flex items-center">
          <span class="text-2xl mr-3">⚠️</span>
          <div>
            <h3 class="text-lg font-semibold text-red-800 mb-2">Terjadi Kesalahan</h3>
            <p class="text-red-600">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Events Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div 
          v-for="event in events" 
          :key="event.id"
          class="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 overflow-hidden"
        >
          <!-- Event Image -->
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="event.imageUrl || '/placeholder-event.jpg'" 
              :alt="event.title"
              class="w-full h-full object-cover"
              @error="handleImageError($event)"
            />
            <div class="absolute top-4 left-4">
              <span 
                :class="getStatusBadgeClass(event.status)"
                class="px-3 py-1 rounded-full text-xs font-semibold"
              >
                {{ getStatusText(event.status) }}
              </span>
            </div>
            <div class="absolute top-4 right-4">
              <span class="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                {{ event.category }}
              </span>
            </div>
          </div>

          <!-- Event Content -->
          <div class="p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
              {{ event.title }}
            </h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ event.description }}
            </p>
            
            <!-- Event Details -->
            <div class="space-y-2 mb-4">
              <div class="flex items-center text-sm text-gray-600">
                <span class="mr-2">📅</span>
                <span>{{ formatDate(event.dateStart) }}</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <span class="mr-2">⏰</span>
                <span>{{ formatTime(event.dateStart) }} - {{ formatTime(event.dateEnd) }}</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <span class="mr-2">⏱️</span>
                <span>{{ event.durationHours }} jam</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <span class="mr-2">👤</span>
                <span>{{ event.speaker }}</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <span class="mr-2">💻</span>
                <span>{{ event.platform }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-2">
              <button 
                @click="viewEventDetail(event)"
                class="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                Detail Event
              </button>
              <button 
                v-if="event.status === 'upcoming' || event.status === 'ongoing'"
                @click="joinEvent(event)"
                class="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                {{ event.status === 'ongoing' ? 'Join Sekarang' : 'Daftar' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !error && events.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">📅</div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Belum Ada Event</h3>
        <p class="text-gray-600">
          {{ searchQuery || selectedCategory || selectedStatus ? 'Tidak ada event yang sesuai dengan filter Anda.' : 'Belum ada event yang tersedia saat ini.' }}
        </p>
      </div>

      <!-- Pagination -->
      <div v-if="!loading && !error && events.length > 0" class="flex justify-center">
        <div class="join">
          <button 
            @click="previousPage"
            :disabled="currentPage === 1"
            class="join-item btn btn-outline"
          >
            « Previous
          </button>
          <button class="join-item btn btn-outline">
            Page {{ currentPage }}
          </button>
          <button 
            @click="nextPage"
            :disabled="events.length < limit"
            class="join-item btn btn-outline"
          >
            Next »
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Event Detail Modal -->
  <div v-if="selectedEvent" class="modal modal-open">
    <div class="modal-box max-w-4xl">
      <form method="dialog">
        <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      
      <!-- Modal Content -->
      <div class="space-y-6">
        <!-- Event Image -->
        <div class="w-full max-w-md mx-auto aspect-[4/5] rounded-lg overflow-hidden">
          <img 
            :src="selectedEvent.imageUrl || '/placeholder-event.jpg'" 
            :alt="selectedEvent.title"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Event Info -->
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span 
              :class="getStatusBadgeClass(selectedEvent.status)"
              class="px-3 py-1 rounded-full text-xs font-semibold"
            >
              {{ getStatusText(selectedEvent.status) }}
            </span>
            <span class="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
              {{ selectedEvent.category }}
            </span>
          </div>
          
          <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ selectedEvent.title }}</h2>
          <p class="text-gray-600 mb-6">{{ selectedEvent.description }}</p>
          
          <!-- Event Details Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="space-y-3">
              <div class="flex items-center">
                <span class="mr-3 text-lg">📅</span>
                <div>
                  <div class="font-semibold">Tanggal</div>
                  <div class="text-sm text-gray-600">{{ formatDate(selectedEvent.dateStart) }}</div>
                </div>
              </div>
              <div class="flex items-center">
                <span class="mr-3 text-lg">⏰</span>
                <div>
                  <div class="font-semibold">Waktu</div>
                  <div class="text-sm text-gray-600">{{ formatTime(selectedEvent.dateStart) }} - {{ formatTime(selectedEvent.dateEnd) }}</div>
                </div>
              </div>
              <div class="flex items-center">
                <span class="mr-3 text-lg">⏱️</span>
                <div>
                  <div class="font-semibold">Durasi</div>
                  <div class="text-sm text-gray-600">{{ selectedEvent.durationHours }} jam</div>
                </div>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center">
                <span class="mr-3 text-lg">👤</span>
                <div>
                  <div class="font-semibold">Pembicara</div>
                  <div class="text-sm text-gray-600">{{ selectedEvent.speaker }}</div>
                </div>
              </div>
              <div class="flex items-center">
                <span class="mr-3 text-lg">💻</span>
                <div>
                  <div class="font-semibold">Platform</div>
                  <div class="text-sm text-gray-600">{{ selectedEvent.platform }}</div>
                </div>
              </div>
              <div class="flex items-center">
                <span class="mr-3 text-lg">📊</span>
                <div>
                  <div class="font-semibold">Kapasitas</div>
                  <div class="text-sm text-gray-600">{{ selectedEvent.maxParticipants }} peserta</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button 
              v-if="selectedEvent.status === 'upcoming' || selectedEvent.status === 'ongoing'"
              @click="joinEvent(selectedEvent)"
              class="btn btn-primary flex-1"
            >
              {{ selectedEvent.status === 'ongoing' ? 'Join Sekarang' : 'Daftar Event' }}
            </button>
            <button @click="closeModal" class="btn btn-outline">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  title: 'Event & Webinar - Forum DINDA',
  description: 'Daftar event dan webinar DINDA Kota Cilegon'
})

// Reactive data
const events = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const selectedEvent = ref(null)
const currentPage = ref(1)
const limit = ref(12)

// Search debounce
let searchTimeout = null

// Fetch events from API
const fetchEvents = async () => {
  try {
    loading.value = true
    error.value = null
    
    const params = new URLSearchParams({
      limit: limit.value.toString(),
      offset: ((currentPage.value - 1) * limit.value).toString(),
      sort: 'date_desc'
    })
    
    if (searchQuery.value) {
      params.append('search', searchQuery.value)
    }
    
    if (selectedCategory.value) {
      params.append('category', selectedCategory.value)
    }
    
    if (selectedStatus.value) {
      params.append('status', selectedStatus.value)
    }
    
    const { data } = await $fetch(`/api/webinar-events?${params.toString()}`)
    events.value = data || []
  } catch (err) {
    console.error('Error fetching events:', err)
    error.value = 'Gagal memuat data event. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

// Handle search with debounce
const handleSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchEvents()
  }, 500)
}

// Filter events
const filterEvents = () => {
  currentPage.value = 1
  fetchEvents()
}

// Pagination
const nextPage = () => {
  currentPage.value++
  fetchEvents()
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchEvents()
  }
}

// Event actions
const viewEventDetail = (event) => {
  selectedEvent.value = event
}

const closeModal = () => {
  selectedEvent.value = null
}

const joinEvent = (event) => {
  if (event.meetingLink) {
    window.open(event.meetingLink, '_blank')
  } else {
    alert('Link meeting belum tersedia')
  }
}

// Utility functions
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatTime = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusText = (status) => {
  const statusMap = {
    'upcoming': 'Akan Datang',
    'ongoing': 'Sedang Berlangsung',
    'finished': 'Selesai'
  }
  return statusMap[status] || status
}

const getStatusBadgeClass = (status) => {
  const classMap = {
    'upcoming': 'bg-blue-100 text-blue-800',
    'ongoing': 'bg-green-100 text-green-800',
    'finished': 'bg-gray-100 text-gray-800'
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}

const handleImageError = (event) => {
  event.target.src = '/placeholder-event.jpg'
}

// Load events on component mount
onMounted(() => {
  fetchEvents()
})

// Head configuration
useHead({
  title: 'Event & Webinar - Forum DINDA',
  meta: [
    {
      name: 'description',
      content: 'Ikuti berbagai event dan webinar edukatif seputar inovasi daerah di DINDA Kota Cilegon'
    }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
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

.modal {
  z-index: 1000;
}
</style>
