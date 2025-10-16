<template>
  <div class="flex min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
    <!-- Sidebar Forum dari komponen -->
    <SidebarForum />
    <!-- Konten Forum -->
    <main class="flex-1 p-8">
      <div class="max-w-6xl mx-auto px-6 py-10">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <span class="text-2xl">💬</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-800 via-yellow-700 to-green-600 bg-clip-text text-transparent">
              Forum Inovasi
            </h1>
          </div>
          <p class="text-gray-700 text-lg font-medium">
            🚀 Tempat berdiskusi, berbagi ide, dan membangun kolaborasi untuk Kota Cilegon
          </p>
        </div>

        <!-- Form Buat Diskusi Baru -->
        <div class="bg-white border border-yellow-300 rounded-xl shadow p-6 mb-8">
          <h3 class="font-semibold text-green-700 mb-4">Buat Diskusi Baru</h3>
          <input
            v-model="newThread.title"
            type="text"
            placeholder="Judul Diskusi"
            class="w-full p-2 border rounded mb-3"
          />
          <select v-model="newThread.category" class="w-full p-2 border rounded mb-3">
            <option value="OPD">OPD</option>
            <option value="Startup">Startup Lokal</option>
            <option value="Masyarakat">Masyarakat</option>
            <option value="Inkubasi">Inkubasi</option>
          </select>
          <textarea
            v-model="newThread.content"
            placeholder="Tulis isi diskusi..."
            rows="3"
            class="w-full p-2 border rounded mb-3"
          ></textarea>
          <button
            @click="addThread"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Posting
          </button>
        </div>

        <!-- Daftar Thread -->
        <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 class="font-semibold text-green-700 mb-4">Diskusi Terbaru</h3>
          <div
            v-for="thread in threads"
            :key="thread.id"
            class="bg-white border border-yellow-200 rounded-lg p-4 mb-4 shadow"
          >
            <h4 class="font-semibold text-green-800">{{ thread.title }}</h4>
            <p class="text-sm text-gray-500">
              Kategori: <span class="font-medium">{{ thread.category }}</span> ·
              oleh {{ thread.author }} · {{ thread.comments.length }} komentar
            </p>

            <!-- Komentar -->
            <div class="mt-3 space-y-2">
              <div
                v-for="(comment, idx) in thread.comments"
                :key="idx"
                class="bg-gray-50 border rounded p-2 text-sm"
              >
                <p class="font-medium text-green-700">{{ comment.user }}</p>
                <p>{{ comment.text }}</p>
              </div>
            </div>

            <!-- Form Tambah Komentar -->
            <div class="mt-3">
              <input
                v-model="newComment"
                type="text"
                placeholder="Tulis komentar..."
                class="w-full p-2 border rounded"
                @keyup.enter="addComment(thread.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SidebarForum from '~/components/sidebar_forum.vue'


import { onMounted } from 'vue'
import { useUserStore } from '~/stores/user'

const newThread = ref({ title: '', category: 'OPD', content: '' })
const newComment = ref('')
const threads = ref([])
const loading = ref(false)

// Fetch threads and their posts
const fetchThreads = async () => {
  loading.value = true
  // Get threads
  const res = await $fetch('/api/forum_threads', { method: 'GET' })
  if (res && res.success) {
    // For each thread, fetch its posts
    const threadList = await Promise.all(res.data.map(async (thread) => {
      const postsRes = await $fetch('/api/forum_posts', {
        method: 'GET',
        query: { thread_id: thread.id }
      })
      return {
        ...thread,
        comments: postsRes && postsRes.success ? postsRes.data : []
      }
    }))
    threads.value = threadList
  }
  loading.value = false
}

onMounted(fetchThreads)


// Ambil user store Pinia
const userStore = useUserStore()
const getUserId = () => userStore.id || 1

// Tambah Thread Baru
const addThread = async () => {
  if (newThread.value.title && newThread.value.content) {
    const res = await $fetch('/api/forum_threads', {
      method: 'POST',
      body: {
        title: newThread.value.title,
        content: newThread.value.content,
        category_id: 1, // TODO: map category name to id
        user_id: getUserId()
      }
    })
    if (res && res.success) {
      await fetchThreads()
      newThread.value = { title: '', category: 'OPD', content: '' }
    }
  }
}

// Tambah Komentar ke Thread
const addComment = async (threadId) => {
  if (newComment.value) {
    const res = await $fetch('/api/forum_posts', {
      method: 'POST',
      body: {
        thread_id: threadId,
        content: newComment.value,
        user_id: getUserId()
      }
    })
    if (res && res.success) {
      await fetchThreads()
      newComment.value = ''
    }
  }
}
</script>
