<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- Sidebar Forum -->
    <sidebar_forum class="shrink-0" />
    
    <!-- Main Forum Content -->
    <div class="flex-1 p-4 md:p-8">
      <!-- Hero Header -->
      <div class="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        <div class="relative z-10">
          <h1 class="text-3xl md:text-4xl font-bold mb-4">🗣️ Forum Komunitas DINDA</h1>
          <p class="text-xl text-teal-100 mb-4">Ruang Diskusi & Kolaborasi Inovator Kota Cilegon</p>
          <p class="text-teal-200">Bergabunglah dengan komunitas inovator, berbagi ide, tanyakan pertanyaan, dan temukan solusi bersama!</p>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div class="text-2xl font-bold text-teal-600 mb-2">1,248</div>
          <div class="text-sm text-gray-600">💬 Total Diskusi</div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div class="text-2xl font-bold text-blue-600 mb-2">456</div>
          <div class="text-sm text-gray-600">👥 Anggota Aktif</div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div class="text-2xl font-bold text-green-600 mb-2">89</div>
          <div class="text-sm text-gray-600">💡 Ide Baru Minggu Ini</div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div class="text-2xl font-bold text-purple-600 mb-2">12</div>
          <div class="text-sm text-gray-600">🎯 Webinar Bulan Ini</div>
        </div>
      </div>

      <!-- Categories Section -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">📋 Kategori Diskusi</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <span class="text-2xl">💡</span>
              </div>
              <div class="ml-4">
                <h3 class="font-bold text-gray-800">Ide & Inovasi</h3>
                <p class="text-sm text-gray-600">234 diskusi</p>
              </div>
            </div>
            <p class="text-gray-700 text-sm">Bagikan dan diskusikan ide-ide inovatif untuk kemajuan daerah</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <span class="text-2xl">🏛️</span>
              </div>
              <div class="ml-4">
                <h3 class="font-bold text-gray-800">Kebijakan Publik</h3>
                <p class="text-sm text-gray-600">156 diskusi</p>
              </div>
            </div>
            <p class="text-gray-700 text-sm">Diskusi seputar kebijakan dan regulasi pemerintah daerah</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <span class="text-2xl">💻</span>
              </div>
              <div class="ml-4">
                <h3 class="font-bold text-gray-800">Teknologi Digital</h3>
                <p class="text-sm text-gray-600">189 diskusi</p>
              </div>
            </div>
            <p class="text-gray-700 text-sm">Pembahasan teknologi dan transformasi digital</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                <span class="text-2xl">🌱</span>
              </div>
              <div class="ml-4">
                <h3 class="font-bold text-gray-800">Lingkungan Hidup</h3>
                <p class="text-sm text-gray-600">98 diskusi</p>
              </div>
            </div>
            <p class="text-gray-700 text-sm">Solusi lingkungan dan pembangunan berkelanjutan</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <span class="text-2xl">🚀</span>
              </div>
              <div class="ml-4">
                <h3 class="font-bold text-gray-800">Startup & UMKM</h3>
                <p class="text-sm text-gray-600">167 diskusi</p>
              </div>
            </div>
            <p class="text-gray-700 text-sm">Dukungan pengembangan startup dan UMKM lokal</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                <span class="text-2xl">🎓</span>
              </div>
              <div class="ml-4">
                <h3 class="font-bold text-gray-800">Pendidikan & Pelatihan</h3>
                <p class="text-sm text-gray-600">123 diskusi</p>
              </div>
            </div>
            <p class="text-gray-700 text-sm">Program pengembangan kapasitas dan pelatihan</p>
          </div>
        </div>
      </div>

      <!-- Recent Discussions (Dynamic) -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">🔥 Diskusi Terpopuler</h2>
          <button class="text-teal-600 hover:text-teal-700 font-semibold">Lihat Semua →</button>
        </div>
        <div v-if="loading" class="text-center py-8 text-gray-500">Memuat diskusi...</div>
        <div v-else-if="threads.length === 0" class="text-center py-8 text-gray-500">Belum ada diskusi.</div>
        <div v-else class="space-y-4">
          <div v-for="thread in threads" :key="thread.id" class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                {{ thread.title.slice(0,2).toUpperCase() }}
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="font-bold text-gray-800">{{ thread.title }}</h3>
                  <span class="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs font-semibold">Kategori #{{ thread.categoryId }}</span>
                </div>
                <p class="text-gray-700 mb-3 line-clamp-2">{{ thread.content }}</p>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span>👤 User #{{ thread.userId }}</span>
                  <span>💬 {{ thread.posts.length }} balasan</span>
                  <span>👀 {{ thread.viewCount }} views</span>
                  <span>⏰ {{ new Date(thread.createdAt).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }) }}</span>
                </div>
                <!-- Show up to 2 latest posts -->
                <div v-if="thread.posts.length" class="mt-4 border-t pt-3 space-y-2">
                  <div v-for="post in thread.posts.slice(0,2)" :key="post.id" class="bg-gray-50 border rounded p-2 text-sm">
                    <p class="font-medium text-teal-700">User #{{ post.userId }}</p>
                    <p>{{ post.content }}</p>
                  </div>
                </div>
                <!-- Reply form -->
                <div v-if="userStore.id" class="mt-4 flex gap-2 items-center">
                  <input v-model="replyInputs[thread.id]" type="text" placeholder="Tulis balasan..." class="flex-1 border rounded p-2 text-gray-800" />
                  <button @click="submitReply(thread.id)" class="px-4 py-2 rounded bg-teal-500 text-white font-bold hover:bg-teal-700">Balas</button>
                </div>
                <div v-else class="mt-4 text-sm text-red-500">Login untuk membalas diskusi.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-8 text-white text-center">
        <h2 class="text-2xl font-bold mb-4">🚀 Mulai Diskusi Baru</h2>
        <p class="text-teal-100 mb-6">Punya ide, pertanyaan, atau ingin berbagi pengalaman? Bergabunglah dengan komunitas inovator!</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="showModal = true" class="bg-white text-teal-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            ✍️ Buat Diskusi Baru
          </button>
          <button class="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-teal-600 transition-all duration-300 transform hover:scale-105">
            💡 Bagikan Ide Inovasi
          </button>
        </div>

        <!-- Modal Form Buat Diskusi Baru -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div class="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 relative animate-fadeIn">
            <button @click="showModal = false" class="absolute top-3 right-3 text-gray-400 hover:text-teal-600 text-2xl font-bold">&times;</button>
            <h3 class="text-xl font-bold mb-4 text-teal-700">Buat Diskusi Baru</h3>
            <form @submit.prevent="submitThread">
              <div class="mb-3">
                <label class="block text-sm font-medium mb-1">Judul Diskusi</label>
                <input v-model="newThread.title" type="text" class="w-full border rounded p-2 text-gray-800" required />
              </div>
              <div class="mb-3">
                <label class="block text-sm font-medium mb-1">Kategori</label>
                <select v-model="newThread.categoryId" class="w-full border rounded p-2 text-gray-800">
                  <option value="1">Ide & Inovasi</option>
                  <option value="2">Kebijakan Publik</option>
                  <option value="3">Teknologi Digital</option>
                  <option value="4">Lingkungan Hidup</option>
                  <option value="5">Startup & UMKM</option>
                  <option value="6">Pendidikan & Pelatihan</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="block text-sm font-medium mb-1">Isi Diskusi</label>
                <textarea v-model="newThread.content" rows="4" class="w-full border rounded p-2 text-gray-800" required></textarea>
              </div>
              <div class="flex justify-end gap-2 mt-6">
                <button type="button" @click="showModal = false" class="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Batal</button>
                <button type="submit" class="px-4 py-2 rounded bg-teal-600 text-white font-bold hover:bg-teal-700">Posting</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import sidebar_forum from '~/components/sidebar_forum.vue'
import { useUserStore } from '~/stores/user'

const threads = ref([])
const loading = ref(false)
const showModal = ref(false)
const newThread = ref({ title: '', categoryId: 1, content: '' })
const userStore = useUserStore()
const replyInputs = ref({})
const submitReply = async (threadId) => {
  const content = replyInputs.value[threadId]
  if (!content) return
  await $fetch('/api/forum_posts', {
    method: 'POST',
    body: {
      thread_id: threadId,
      content,
      user_id: userStore.id || 1
    }
  })
  replyInputs.value[threadId] = ''
  await fetchThreads()
}

const fetchThreads = async () => {
  loading.value = true
  const res = await $fetch('/api/forum_threads', { method: 'GET', query: { limit: 5 } })
  if (res && res.success) {
    const threadList = await Promise.all(res.data.map(async (thread) => {
      // Ambil semua post tanpa filter is_approved, limit besar agar balasan baru langsung muncul
      const postsRes = await $fetch('/api/forum_posts', {
        method: 'GET',
        query: { thread_id: thread.id, limit: 100 }
      })
      return {
        ...thread,
        posts: postsRes && postsRes.success ? postsRes.data : []
      }
    }))
    threads.value = threadList
  }
  loading.value = false
}

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')      // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')             // Trim - from end of text
}

const submitThread = async () => {
  if (!newThread.value.title || !newThread.value.content) return
  const slug = slugify(newThread.value.title)
  const res = await $fetch('/api/forum_threads', {
    method: 'POST',
    body: {
      title: newThread.value.title,
      slug,
      content: newThread.value.content,
      category_id: Number(newThread.value.categoryId),
      user_id: userStore.id || 1
    }
  })
  if (res && res.success) {
    showModal.value = false
    newThread.value = { title: '', categoryId: 1, content: '' }
    await fetchThreads()
  }
}

onMounted(fetchThreads)
</script>
// end script