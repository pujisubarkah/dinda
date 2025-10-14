<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent mb-4">🎬 Galeri Video Inovasi</h1>
      <p class="text-xl text-gray-600">Dokumentasi kegiatan dan inovasi Kota Cilegon</p>
      <div class="mt-4 inline-flex items-center bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold">
        <span v-if="loading">📹 Memuat video...</span>
        <span v-else>📹 {{ totalVideos || videos.length }} Video Tersedia</span>
      </div>
    </div>

    <!-- Filter & Search -->
    <div class="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-2xl border border-teal-200 mb-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="🔍 Cari video..." 
          class="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 col-span-2"
        />
        <select 
          v-model="selectedCategory"
          class="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
        >
          <option value="">📂 Semua Kategori</option>
          <option value="kegiatan">🎪 Kegiatan</option>
          <option value="inovasi">💡 Inovasi</option>
          <option value="pelayanan">🏛️ Pelayanan Publik</option>
          <option value="pembangunan">🏗️ Pembangunan</option>
        </select>
        <select 
          v-model="selectedYear"
          class="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500"
        >
          <option value="">📅 Semua Tahun</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="n in 6" :key="n" class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
        <div class="aspect-video bg-gray-200"></div>
        <div class="p-6">
          <div class="h-4 bg-gray-200 rounded mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div class="h-3 bg-gray-200 rounded mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div class="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16">
      <div class="text-6xl mb-4">❌</div>
      <h3 class="text-xl font-semibold text-red-600 mb-2">Gagal memuat video</h3>
      <p class="text-gray-500 mb-6">{{ error }}</p>
      <button 
        @click="fetchVideos"
        class="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:from-teal-600 hover:to-teal-700 transition-all duration-300"
      >
        🔄 Coba Lagi
      </button>
    </div>

    <!-- Video Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="video in filteredVideos" 
        :key="video.id" 
        class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
      >
        <!-- Video Thumbnail -->
        <div class="relative aspect-video">
          <iframe
            :src="`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`"
            :title="video.title"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full rounded-t-2xl"
          ></iframe>
          <div class="absolute top-3 right-3">
            <span :class="getCategoryBadgeClass(video.category)" class="px-3 py-1 rounded-full text-xs font-semibold">
              {{ video.categoryLabel }}
            </span>
          </div>
        </div>

        <!-- Video Info -->
        <div class="p-6">
          <h3 class="font-bold text-gray-800 text-lg mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
            {{ video.title }}
          </h3>
          <p class="text-gray-600 text-sm mb-4 line-clamp-3">
            {{ video.description }}
          </p>
          
          <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div class="flex items-center">
              <span class="mr-3">📅 {{ video.date }}</span>
              <span>👀 {{ video.views }} views</span>
            </div>
            <span v-if="video.duration" class="text-teal-600 font-semibold">{{ video.duration }}</span>
          </div>

          <div class="flex gap-2">
            <a 
              :href="video.url" 
              target="_blank" 
              class="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-300 text-center text-sm"
            >
              ▶️ Tonton di YouTube
            </a>
            <button class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              🔗
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <div class="text-center mt-12" v-if="hasMoreVideos">
      <button 
        @click="loadMoreVideos"
        class="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        📺 Muat Video Lainnya
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="filteredVideos.length === 0" class="text-center py-16">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-semibold text-gray-600 mb-2">Video tidak ditemukan</h3>
      <p class="text-gray-500">Coba ubah kata kunci pencarian atau filter yang digunakan</p>
    </div>
  </div>
</template>

<script setup>
// Page meta
definePageMeta({
  title: 'Galeri Video - DINDA',
  description: 'Galeri video kegiatan dan inovasi Kota Cilegon'
})

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedYear = ref('')
const currentPage = ref(1)
const videosPerPage = 9
const loading = ref(true)
const error = ref(null)

// Video data from API
const videos = ref([])
const totalVideos = ref(0)

// Fetch videos from API
const fetchVideos = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Build query parameters
    const params = new URLSearchParams()
    if (searchQuery.value) params.append('search', searchQuery.value)
    if (selectedCategory.value) params.append('category', selectedCategory.value)
    params.append('limit', '50') // Load more videos initially
    
    const response = await $fetch(`/api/videos?${params.toString()}`)
    
    if (response.success) {
      videos.value = response.data.map(video => ({
        ...video,
        // Format views untuk display
        views: formatViews(video.views),
        // Format date untuk display
        date: formatDate(video.date || video.createdAt)
      }))
      totalVideos.value = response.total || response.data.length
    } else {
      throw new Error('Failed to fetch videos')
    }
  } catch (err) {
    error.value = err.message || 'Gagal memuat video'
    console.error('Error fetching videos:', err)
  } finally {
    loading.value = false
  }
}

// Format views count
const formatViews = (views) => {
  if (views >= 1000000) {
    return Math.floor(views / 100000) / 10 + 'M'
  } else if (views >= 1000) {
    return Math.floor(views / 100) / 10 + 'K'
  }
  return views.toString()
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'Tanggal tidak tersedia'
  
  const date = new Date(dateString)
  const options = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    timeZone: 'Asia/Jakarta'
  }
  return date.toLocaleDateString('id-ID', options)
}

// Load videos on mount
onMounted(() => {
  fetchVideos()
})

// Computed properties
const filteredVideos = computed(() => {
  let filtered = videos.value

  // Filter by year (client-side for already loaded data)
  if (selectedYear.value) {
    filtered = filtered.filter(video => video.date.includes(selectedYear.value))
  }

  // Pagination
  const startIndex = (currentPage.value - 1) * videosPerPage
  const endIndex = startIndex + videosPerPage
  
  return filtered.slice(0, endIndex)
})

const hasMoreVideos = computed(() => {
  const totalFiltered = videos.value.filter(video => {
    let matches = true
    
    if (selectedYear.value) {
      matches = matches && video.date.includes(selectedYear.value)
    }
    
    return matches
  }).length

  return filteredVideos.value.length < totalFiltered
})

// Methods
const getCategoryBadgeClass = (category) => {
  const classes = {
    kegiatan: 'bg-purple-100 text-purple-700',
    inovasi: 'bg-blue-100 text-blue-700',
    pelayanan: 'bg-green-100 text-green-700',
    pembangunan: 'bg-orange-100 text-orange-700'
  }
  return classes[category] || 'bg-gray-100 text-gray-700'
}

const loadMoreVideos = () => {
  currentPage.value++
}

// Debounced search function
let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchVideos()
  }, 500)
}

// Watch for filter changes
watch([selectedCategory], () => {
  currentPage.value = 1
  fetchVideos()
})

watch([searchQuery], () => {
  debouncedSearch()
})

watch([selectedYear], () => {
  currentPage.value = 1
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

.aspect-video {
  aspect-ratio: 16 / 9;
}

/* Smooth transitions for video cards */
.group:hover {
  transform: translateY(-2px);
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #20B2AA;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #17a2b8;
}
</style>
