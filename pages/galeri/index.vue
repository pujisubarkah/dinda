<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent mb-4">� Galeri Video Inovasi</h1>
      <p class="text-xl text-gray-600">Dokumentasi kegiatan dan inovasi Kota Cilegon</p>
      <div class="mt-4 inline-flex items-center bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold">
        📹 {{ videos.length }} Video Tersedia
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

    <!-- Video Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <span class="text-teal-600 font-semibold">{{ video.duration }}</span>
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

// Video data
const videos = ref([
  {
    id: 1,
    title: 'Launching SAKIP Kota Cilegon 2024',
    description: 'Peluncuran Sistem Akuntabilitas Kinerja Instansi Pemerintah (SAKIP) Kota Cilegon untuk meningkatkan transparansi dan akuntabilitas pemerintahan.',
    youtubeId: '4TUD2qDslww',
    url: 'https://youtu.be/4TUD2qDslww',
    category: 'kegiatan',
    categoryLabel: '🎪 Kegiatan',
    date: '15 Okt 2024',
    views: '2.1K',
    duration: '12:34'
  },
  {
    id: 2,
    title: 'Inovasi Pelayanan Digital Kota Cilegon',
    description: 'Transformasi digital pelayanan publik Kota Cilegon melalui berbagai aplikasi dan sistem online untuk kemudahan masyarakat.',
    youtubeId: 'm9xJQXw2nC0',
    url: 'https://youtu.be/m9xJQXw2nC0',
    category: 'inovasi',
    categoryLabel: '💡 Inovasi',
    date: '8 Sep 2024',
    views: '3.5K',
    duration: '15:42'
  },
  {
    id: 3,
    title: 'Program Smart City Cilegon',
    description: 'Implementasi konsep smart city di Kota Cilegon dengan berbagai teknologi untuk meningkatkan kualitas hidup masyarakat.',
    youtubeId: 'cFytF7e1VwA',
    url: 'https://youtu.be/cFytF7e1VwA',
    category: 'pembangunan',
    categoryLabel: '🏗️ Pembangunan',
    date: '22 Agu 2024',
    views: '4.2K',
    duration: '18:56'
  },
  {
    id: 4,
    title: 'Festival Krakatau Kota Cilegon 2024',
    description: 'Kemeriahan Festival Krakatau sebagai event tahunan yang menampilkan budaya, seni, dan pariwisata Kota Cilegon.',
    youtubeId: 'festival-krakatau-2024',
    url: 'https://youtu.be/festival-krakatau-2024',
    category: 'kegiatan',
    categoryLabel: '🎪 Kegiatan',
    date: '10 Jul 2024',
    views: '5.8K',
    duration: '25:13'
  },
  {
    id: 5,
    title: 'Pelayanan Kesehatan Terintegrasi',
    description: 'Sistem pelayanan kesehatan terintegrasi di Kota Cilegon untuk memberikan layanan kesehatan yang lebih baik dan efisien.',
    youtubeId: 'kesehatan-terintegrasi',
    url: 'https://youtu.be/kesehatan-terintegrasi',
    category: 'pelayanan',
    categoryLabel: '🏛️ Pelayanan Publik',
    date: '5 Jun 2024',
    views: '2.7K',
    duration: '11:28'
  },
  {
    id: 6,
    title: 'Pembangunan Infrastruktur Berkelanjutan',
    description: 'Proyek pembangunan infrastruktur berkelanjutan di Kota Cilegon dengan mengedepankan aspek lingkungan dan teknologi.',
    youtubeId: 'infrastruktur-berkelanjutan',
    url: 'https://youtu.be/infrastruktur-berkelanjutan',
    category: 'pembangunan',
    categoryLabel: '🏗️ Pembangunan',
    date: '18 Mei 2024',
    views: '3.1K',
    duration: '20:45'
  },
  {
    id: 7,
    title: 'E-Government Kota Cilegon',
    description: 'Implementasi sistem e-government untuk meningkatkan efisiensi dan transparansi dalam pelayanan pemerintahan.',
    youtubeId: 'e-government-cilegon',
    url: 'https://youtu.be/e-government-cilegon',
    category: 'inovasi',
    categoryLabel: '💡 Inovasi',
    date: '3 Apr 2024',
    views: '4.6K',
    duration: '14:22'
  },
  {
    id: 8,
    title: 'Pelatihan UMKM Digital',
    description: 'Program pelatihan untuk meningkatkan kemampuan UMKM dalam menggunakan teknologi digital untuk mengembangkan usaha.',
    youtubeId: 'umkm-digital-training',
    url: 'https://youtu.be/umkm-digital-training',
    category: 'kegiatan',
    categoryLabel: '🎪 Kegiatan',
    date: '12 Mar 2024',
    views: '1.9K',
    duration: '16:33'
  },
  {
    id: 9,
    title: 'Sistem Manajemen Sampah Pintar',
    description: 'Inovasi sistem manajemen sampah pintar di Kota Cilegon untuk menciptakan lingkungan yang lebih bersih dan sehat.',
    youtubeId: 'sampah-pintar-system',
    url: 'https://youtu.be/sampah-pintar-system',
    category: 'inovasi',
    categoryLabel: '💡 Inovasi',
    date: '28 Feb 2024',
    views: '3.8K',
    duration: '13:17'
  },
  {
    id: 10,
    title: 'Aplikasi Pengaduan Masyarakat Online',
    description: 'Aplikasi online untuk memudahkan masyarakat dalam menyampaikan pengaduan dan aspirasi kepada pemerintah kota.',
    youtubeId: 'pengaduan-online-app',
    url: 'https://youtu.be/pengaduan-online-app',
    category: 'pelayanan',
    categoryLabel: '🏛️ Pelayanan Publik',
    date: '14 Jan 2024',
    views: '2.4K',
    duration: '9:45'
  }
])

// Computed properties
const filteredVideos = computed(() => {
  let filtered = videos.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(video => 
      video.title.toLowerCase().includes(query) ||
      video.description.toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(video => video.category === selectedCategory.value)
  }

  // Filter by year
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
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      matches = matches && (
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query)
      )
    }
    
    if (selectedCategory.value) {
      matches = matches && video.category === selectedCategory.value
    }
    
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

// Watch for filter changes to reset pagination
watch([searchQuery, selectedCategory, selectedYear], () => {
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
