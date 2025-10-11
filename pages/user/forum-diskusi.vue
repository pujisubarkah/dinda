<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Forum Diskusi</h1>
        <p class="mt-2 text-gray-600">
          Berdiskusi dan berbagi ide dengan sesama pegawai tentang inovasi pelayanan
        </p>
      </div>

      <!-- Create New Topic -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">Mulai Diskusi Baru</h2>
          <button
            @click="showCreateForm = !showCreateForm"
            class="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
          >
            {{ showCreateForm ? 'Batal' : '+ Buat Topik' }}
          </button>
        </div>

        <div v-if="showCreateForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Judul Topik</label>
            <input
              v-model="newTopic.title" 
              type="text"
              placeholder="Masukkan judul diskusi..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              v-model="newTopic.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Pilih kategori</option>
              <option value="inovasi">Inovasi Pelayanan</option>
              <option value="teknologi">Teknologi</option>
              <option value="regulasi">Regulasi</option>
              <option value="diskusi-umum">Diskusi Umum</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
            <textarea
              v-model="newTopic.content"
              rows="4"
              placeholder="Jelaskan topik diskusi Anda..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            ></textarea>
          </div>
          <div class="flex gap-3">
            <button
              @click="createTopic"
              :disabled="!newTopic.title || !newTopic.content || !newTopic.category"
              class="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Buat Topik
            </button>
            <button
              @click="resetForm"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              Reset
            </button>
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
              placeholder="Cari topik diskusi..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div class="sm:w-48">
            <select
              v-model="categoryFilter"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Semua Kategori</option>
              <option value="inovasi">Inovasi Pelayanan</option>
              <option value="teknologi">Teknologi</option>
              <option value="regulasi">Regulasi</option>
              <option value="diskusi-umum">Diskusi Umum</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Discussion Topics -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-600">
          <h2 class="text-xl font-semibold text-white">Topik Diskusi</h2>
        </div>

        <div v-if="loading" class="p-8 text-center">
          <div class="inline-flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-gray-600">Memuat diskusi...</span>
          </div>
        </div>

        <div v-else-if="filteredTopics.length === 0" class="p-8 text-center text-gray-500">
          <div class="text-6xl mb-4">💬</div>
          <p class="text-lg font-medium">Belum ada topik diskusi</p>
          <p class="text-sm mt-2">Jadilah yang pertama memulai diskusi!</p>
        </div>

        <div v-else class="divide-y divide-gray-200">
          <div v-for="topic in filteredTopics" :key="topic.id" class="p-6 hover:bg-gray-50 transition-colors">
            <div class="flex items-start gap-4">
              <!-- Avatar -->
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-teal-600">{{ getInitials(topic.author) }}</span>
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-lg font-semibold text-gray-900 hover:text-teal-600 cursor-pointer" @click="viewTopic(topic)">
                    {{ topic.title }}
                  </h3>
                  <span :class="getCategoryBadgeClass(topic.category)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ getCategoryLabel(topic.category) }}
                  </span>
                  <span v-if="topic.isPinned" class="text-yellow-500 text-sm">📌</span>
                </div>

                <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                  {{ topic.content }}
                </p>

                <div class="flex items-center justify-between text-sm text-gray-500">
                  <div class="flex items-center gap-4">
                    <span class="flex items-center gap-1">
                      <span class="text-lg">👤</span>
                      {{ topic.author }}
                    </span>
                    <span class="flex items-center gap-1">
                      <span class="text-lg">📅</span>  
                      {{ formatDate(topic.createdAt) }}
                    </span>
                    <span class="flex items-center gap-1">
                      <span class="text-lg">💬</span>
                      {{ topic.replies }} balasan
                    </span>
                    <span class="flex items-center gap-1">
                      <span class="text-lg">👁️</span>
                      {{ topic.views }} views
                    </span>
                  </div>

                  <div class="flex gap-2">
                    <button
                      @click="likeTopic(topic.id)"
                      class="flex items-center gap-1 px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                    >
                      👍 {{ topic.likes }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Topic Detail Modal -->
      <div v-if="selectedTopic" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-4 flex items-center justify-between">
            <h3 class="text-xl font-semibold text-white">{{ selectedTopic.title }}</h3>
            <button @click="selectedTopic = null" class="text-white hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <span class="font-medium text-teal-600">{{ getInitials(selectedTopic.author) }}</span>
              </div>
              <div>
                <div class="font-semibold text-gray-900">{{ selectedTopic.author }}</div>
                <div class="text-sm text-gray-500">{{ formatDate(selectedTopic.createdAt) }}</div>
              </div>
              <span :class="getCategoryBadgeClass(selectedTopic.category)" class="px-3 py-1 rounded-full text-sm font-medium ml-auto">
                {{ getCategoryLabel(selectedTopic.category) }}
              </span>
            </div>

            <div class="prose max-w-none mb-8">
              <p class="text-gray-700 leading-relaxed">{{ selectedTopic.content }}</p>
            </div>

            <!-- Reply Form -->
            <div class="border-t pt-6">
              <h4 class="font-semibold text-gray-900 mb-4">Balas Diskusi</h4>
              <div class="space-y-4">
                <textarea
                  v-model="newReply"
                  rows="4"
                  placeholder="Tulis balasan Anda..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                ></textarea>
                <div class="flex gap-3">
                  <button
                    @click="submitReply"
                    :disabled="!newReply.trim()"
                    class="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Kirim Balasan
                  </button>
                </div>
              </div>
            </div>

            <!-- Sample Replies -->
            <div class="border-t pt-6 mt-6">
              <h4 class="font-semibold text-gray-900 mb-4">Balasan ({{ selectedTopic.replies }})</h4>
              <div class="space-y-4">
                <div class="flex gap-3 p-4 bg-gray-50 rounded-lg">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-xs font-medium text-blue-600">AA</span>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="font-medium text-gray-900">Admin System</span>
                      <span class="text-xs text-gray-500">2 hari lalu</span>
                    </div>
                    <p class="text-gray-700 text-sm">Terima kasih atas diskusi yang menarik ini. Tim teknis akan review usulan ini lebih lanjut.</p>
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
const showCreateForm = ref(false)
const selectedTopic = ref(null)
const newReply = ref('')
const topics = ref([])

const newTopic = ref({
  title: '',
  content: '',
  category: ''
})

// Mock data
const mockTopics = [
  {
    id: 1,
    title: 'Implementasi AI dalam Pelayanan Publik',
    content: 'Bagaimana pendapat rekan-rekan tentang penggunaan AI untuk meningkatkan efisiensi pelayanan publik? Ada experience yang bisa dibagi?',
    category: 'teknologi',
    author: 'Ahmad Rizki',
    createdAt: '2024-10-10',
    replies: 12,
    views: 245,
    likes: 8,
    isPinned: true
  },
  {
    id: 2,
    title: 'Standar Operasional Prosedur Baru',
    content: 'Diskusi mengenai SOP terbaru yang akan diterapkan pada bulan depan. Mari kita bahas kemungkinan kendala dan solusinya.',
    category: 'regulasi',
    author: 'Sari Indrawati',
    createdAt: '2024-10-08',
    replies: 7,
    views: 156,
    likes: 5,
    isPinned: false
  },
  {
    id: 3,
    title: 'Ide Inovasi Pelayanan Satu Pintu',
    content: 'Sharing ide untuk mengoptimalkan layanan satu pintu di DPMPTSP. Mohon masukan dari rekan-rekan yang punya pengalaman.',
    category: 'inovasi',
    author: 'Budi Santoso',
    createdAt: '2024-10-05',
    replies: 15,
    views: 298,
    likes: 12,
    isPinned: false
  }
]

// Computed
const filteredTopics = computed(() => {
  let filtered = topics.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(topic => 
      topic.title.toLowerCase().includes(query) ||
      topic.content.toLowerCase().includes(query) ||
      topic.author.toLowerCase().includes(query)
    )
  }

  if (categoryFilter.value) {
    filtered = filtered.filter(topic => topic.category === categoryFilter.value)
  }

  // Sort pinned topics first
  return filtered.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
})

// Methods
const getCategoryBadgeClass = (category) => {
  const classMap = {
    'inovasi': 'bg-green-100 text-green-800',
    'teknologi': 'bg-blue-100 text-blue-800',
    'regulasi': 'bg-purple-100 text-purple-800',
    'diskusi-umum': 'bg-gray-100 text-gray-800'
  }
  return classMap[category] || 'bg-gray-100 text-gray-800'
}

const getCategoryLabel = (category) => {
  const labelMap = {
    'inovasi': 'Inovasi Pelayanan',
    'teknologi': 'Teknologi',
    'regulasi': 'Regulasi',
    'diskusi-umum': 'Diskusi Umum'
  }
  return labelMap[category] || category
}

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'Kemarin'
  if (diffDays < 7) return `${diffDays} hari lalu`
  
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const createTopic = () => {
  if (!newTopic.value.title || !newTopic.value.content || !newTopic.value.category) return

  const topic = {
    id: Date.now(),
    ...newTopic.value,
    author: 'User Saat Ini', // Replace with actual user
    createdAt: new Date().toISOString().split('T')[0],
    replies: 0,
    views: 0,
    likes: 0,
    isPinned: false
  }

  topics.value.unshift(topic)
  resetForm()
  showCreateForm.value = false
}

const resetForm = () => {
  newTopic.value = {
    title: '',
    content: '',
    category: ''
  }
}

const viewTopic = (topic) => {
  topic.views++
  selectedTopic.value = topic
}

const likeTopic = (id) => {
  const topic = topics.value.find(t => t.id === id)
  if (topic) {
    topic.likes++
  }
}

const submitReply = () => {
  if (!newReply.value.trim()) return
  
  if (selectedTopic.value) {
    selectedTopic.value.replies++
  }
  
  newReply.value = ''
  // Here you would normally send the reply to the server
}

// Load data
onMounted(async () => {
  loading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800))
  
  topics.value = mockTopics
  loading.value = false
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
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

.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1em;
  line-height: 1.7;
}
</style>