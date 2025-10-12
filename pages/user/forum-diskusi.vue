<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-5xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Forum Diskusi</h1>
        <p class="text-gray-600">Berdiskusi dan berbagi ide dengan sesama pegawai tentang inovasi pelayanan.</p>
      </div>

      <!-- Recent Discussions (Dynamic) -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">🔥 Diskusi Terpopuler</h2>
          <button @click="showModal = true" class="bg-teal-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-700 transition-all duration-300">✍️ Buat Diskusi Baru</button>
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
                
                <!-- Show ALL posts without any limit -->
                <div v-if="thread.posts.length" class="mt-4 border-t pt-3 space-y-2">
                  <div v-for="post in thread.posts" :key="post.id" class="bg-gray-50 border rounded p-2 text-sm">
                    <p class="font-medium text-teal-700">User #{{ post.userId }}</p>
                    <p>{{ post.content }}</p>
                  </div>
                </div>
                
                <!-- Balas button and conditional reply form -->
                <div class="mt-4">
                  <button
                    class="px-4 py-2 rounded bg-teal-100 text-teal-700 font-bold hover:bg-teal-200 transition-all duration-200"
                    @click="openReply(thread.id)"
                    v-if="openReplyThreadId !== thread.id"
                  >Balas</button>
                  <div v-if="openReplyThreadId === thread.id" class="flex gap-2 items-center mt-2">
                    <input v-model="replyInputs[thread.id]" type="text" placeholder="Tulis balasan..." class="flex-1 border rounded p-2 text-gray-800" />
                    <button @click="console.log('Kirim diklik', thread.id); submitReply(thread.id)" class="px-4 py-2 rounded bg-teal-500 text-white font-bold hover:bg-teal-700">Kirim</button>
                    <button @click="openReplyThreadId = null" class="px-3 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Batal</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
</template>

<script setup>
definePageMeta({ layout: 'user' })
import { ref, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'

const threads = ref([])
const loading = ref(false)
const showModal = ref(false)
const newThread = ref({ title: '', categoryId: 1, content: '' })
const userStore = useUserStore()
const replyInputs = ref({})
const openReplyThreadId = ref(null)

function openReply(threadId) {
  openReplyThreadId.value = threadId
}

const fetchThreads = async () => {
  loading.value = true
  try {
    const res = await $fetch('/api/forum_threads', { method: 'GET', query: { limit: 5 } })
    if (res && res.success) {
      const threadList = await Promise.all(res.data.map(async (thread) => {
        // Ambil SEMUA posts tanpa limit
        const postsRes = await $fetch('/api/forum_posts', {
          method: 'GET',
          query: { thread_id: thread.id, limit: 0 } // limit 0 untuk mengambil semua
        })
        return {
          ...thread,
          posts: postsRes && postsRes.success ? postsRes.data : []
        }
      }))
      threads.value = threadList
    }
  } catch (error) {
    console.error('Error fetching threads:', error)
  } finally {
    loading.value = false
  }
}

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

const submitThread = async () => {
  if (!newThread.value.title || !newThread.value.content) return
  
  try {
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
      await fetchThreads() // Refresh untuk menampilkan thread baru
    }
  } catch (error) {
    console.error('Error creating thread:', error)
  }
}

const submitReply = async (threadId) => {
  console.log('submitReply terpanggil', threadId, replyInputs.value[threadId]);
  let content = replyInputs.value[threadId]
  if (typeof content === 'string') content = content.trim()
  if (!content || !userStore.id) {
    alert('Isi balasan tidak boleh kosong!');
    return;
  }
  try {
    console.log('Mengirim balasan:', { thread_id: threadId, content, user_id: userStore.id });
    const res = await $fetch('/api/forum_posts', {
      method: 'POST',
      body: {
        thread_id: threadId,
        content,
        user_id: userStore.id,
      }
    });
    console.log('Response balasan:', res);
    if (!res || res.success === false) {
      alert('Gagal mengirim balasan!');
      return;
    }
    replyInputs.value[threadId] = '';
    openReplyThreadId.value = null;
    await fetchThreads();
  } catch (error) {
    alert('Terjadi error saat mengirim balasan!');
    console.error('Error submitting reply:', error);
  }
}

onMounted(fetchThreads)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>