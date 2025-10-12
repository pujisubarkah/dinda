<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <div class="flex items-center gap-3 mb-8">
      <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0020 7.382V6a2 2 0 00-2-2H6a2 2 0 00-2 2v1.382a1 1 0 00.447.842L9 10m6 0v4m0 0l-4.553 2.276A1 1 0 019 17.618V18a2 2 0 002 2h4a2 2 0 002-2v-1.382a1 1 0 00-.447-.842L15 14zm0 0V10" />
      </svg>
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Tambah Video Gallery</h1>
        <p class="text-gray-500 text-sm">Kelola dan tambahkan video YouTube ke galeri inovasi.</p>
      </div>
    </div>

    <!-- Button to open modal -->
    <div class="mb-8 flex justify-end">
      <button @click="showModal = true" class="btn btn-primary flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Tambah Video
      </button>
    </div>

    <!-- Modal Tambah Video -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 relative animate-fade-in max-h-[90vh] overflow-y-auto">
        <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <form @submit.prevent="submitVideo" class="p-8 flex flex-col gap-4">
          <div class="grid grid-cols-1 gap-6">
            <div>
              <label class="block font-semibold mb-1">Judul Video <span class="text-red-500">*</span></label>
              <input v-model="form.title" type="text" class="input input-bordered w-full" required placeholder="Judul video..." />
            </div>
            <div>
              <label class="block font-semibold mb-1">Kategori <span class="text-red-500">*</span></label>
              <select v-model="form.category" class="input input-bordered w-full" required>
                <option value="">Pilih Kategori</option>
                <option value="kegiatan">🎪 Kegiatan</option>
                <option value="tutorial">🎬 Tutorial</option>
                <option value="lainnya">📁 Lainnya</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold mb-1">Deskripsi</label>
              <textarea v-model="form.description" class="textarea textarea-bordered w-full" rows="2" placeholder="Deskripsi video..."></textarea>
            </div>
            <div>
              <label class="block font-semibold mb-1">YouTube ID <span class="text-red-500">*</span></label>
              <input v-model="form.youtubeId" type="text" class="input input-bordered w-full" required placeholder="Contoh: 4TUD2qDslww" />
            </div>
            <div>
              <label class="block font-semibold mb-1">Durasi</label>
              <input v-model="form.duration" type="text" class="input input-bordered w-full" placeholder="Contoh: 12:34" />
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-4">
            <button type="button" class="btn btn-secondary" @click="resetForm">Reset</button>
            <button type="submit" class="btn btn-primary flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              Simpan
            </button>
          </div>
          <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
          <div v-if="success" class="text-green-600 mt-2">{{ success }}</div>
        </form>
      </div>
    </div>

    <!-- List Video Gallery -->
    <div class="mb-4 flex items-center gap-2">
      <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0020 7.382V6a2 2 0 00-2-2H6a2 2 0 00-2 2v1.382a1 1 0 00.447.842L9 10m6 0v4m0 0l-4.553 2.276A1 1 0 019 17.618V18a2 2 0 002 2h4a2 2 0 002-2v-1.382a1 1 0 00-.447-.842L15 14zm0 0V10" /></svg>
      <h2 class="text-lg font-bold text-gray-700">Daftar Video Gallery</h2>
    </div>
    <div v-if="loading" class="text-center py-10 text-gray-400">Memuat data video...</div>
    <div v-else-if="videos.length === 0" class="text-center py-10 text-gray-400">Belum ada video.</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="video in videos" :key="video.id" class="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
        <div class="aspect-w-16 aspect-h-9 rounded overflow-hidden mb-2">
          <iframe :src="`https://www.youtube.com/embed/${video.youtubeId}`" frameborder="0" allowfullscreen class="w-full h-full"></iframe>
        </div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-2xl">{{ getCategoryLabel(video.category) }}</span>
          <span class="text-xs text-gray-400 ml-auto">{{ formatDate(video.createdAt) }}</span>
        </div>
        <div class="font-bold text-gray-800">{{ video.title }}</div>
        <div class="text-gray-600 text-sm line-clamp-2">{{ video.description }}</div>
        <div class="flex items-center gap-3 text-xs text-gray-500 mt-1">
          <span>Durasi: {{ video.duration || '-' }}</span>
          <span>Views: {{ video.views || 0 }}</span>
        </div>
        <a :href="`https://www.youtube.com/watch?v=${video.youtubeId}`" target="_blank" class="text-blue-500 hover:underline text-xs mt-1">Lihat di YouTube</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

definePageMeta({ layout: 'admin' })

const showModal = ref(false)
const videos = ref([])
const loading = ref(true)
const error = ref('')
const success = ref('')
const form = ref({
  title: '',
  description: '',
  youtubeId: '',
  category: '',
  duration: ''
})

function closeModal() {
  showModal.value = false
  resetForm()
}

// When video added successfully, close modal
watch(success, (val) => {
  if (val) setTimeout(() => closeModal(), 800)
})

function resetForm() {
  form.value = { title: '', description: '', youtubeId: '', category: '', duration: '' }
  error.value = ''
  success.value = ''
}

async function fetchVideos() {
  loading.value = true
  try {
    const res = await $fetch('/api/videos')
    if (res.success) {
      videos.value = res.data
    } else {
      error.value = 'Gagal memuat data video'
    }
  } finally {
    loading.value = false
  }
}

async function submitVideo() {
  error.value = ''
  success.value = ''
  if (!form.value.title || !form.value.youtubeId || !form.value.category) {
    error.value = 'Judul, Kategori, dan YouTube ID wajib diisi.'
    return
  }
  try {
    const res = await $fetch('/api/videos', {
      method: 'POST',
      body: form.value
    })
    if (res.success) {
      success.value = 'Video berhasil ditambahkan!'
      resetForm()
      fetchVideos()
    } else {
      error.value = res.error || 'Gagal menambah video.'
    }
  } catch (e) {
    error.value = 'Gagal menambah video.'
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

function getCategoryLabel(category) {
  const labels = {
    'kegiatan': '🎪 Kegiatan',
    'tutorial': '🎬 Tutorial', 
    'lainnya': '📁 Lainnya'
  }
  return labels[category] || '📁 Lainnya'
}

onMounted(() => {
  fetchVideos()
})
</script>

<style scoped>
.input, .textarea {
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.btn {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.25rem;
  font-weight: 600;
}
.btn-primary {
  background-color: #ef4444;
  color: #fff;
}
.btn-primary:hover {
  background-color: #dc2626;
}
.btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
}
.btn-secondary:hover {
  background-color: #d1d5db;
}
.aspect-w-16 {
  aspect-ratio: 16/9;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>