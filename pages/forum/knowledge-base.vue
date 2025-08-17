<template>
  <div class="flex min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
    <!-- Sidebar Forum dari komponen -->
    <SidebarForum />
    <!-- Konten Forum -->
    <main class="flex-1 p-8">
      <div class="max-w-6xl mx-auto px-6 py-10">
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-green-800">💬 Forum Inovasi Kota Cilegon</h1>
          <p class="text-yellow-600">Tempat berdiskusi, berbagi ide, dan membangun kolaborasi</p>
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

const newThread = ref({ title: '', category: 'OPD', content: '' })
const newComment = ref('')

const threads = ref([
  {
    id: 1,
    title: "Ide Aplikasi Sampah Digital",
    category: "Masyarakat",
    author: "Andi",
    comments: [{ user: "Budi", text: "Ide bagus! Bisa kerjasama dengan DLH" }],
  },
  {
    id: 2,
    title: "Sistem Smart Parkir di Kota Cilegon",
    category: "Startup",
    author: "Siti",
    comments: [],
  },
])

// Tambah Thread Baru
const addThread = () => {
  if (newThread.value.title && newThread.value.content) {
    threads.value.push({
      id: threads.value.length + 1,
      title: newThread.value.title,
      category: newThread.value.category,
      author: "Anonim",
      comments: [],
    })
    newThread.value = { title: '', category: 'OPD', content: '' }
  }
}

// Tambah Komentar ke Thread
const addComment = (threadId) => {
  const thread = threads.value.find((t) => t.id === threadId)
  if (thread && newComment.value) {
    thread.comments.push({ user: "Pengguna", text: newComment.value })
    newComment.value = ''
  }
}
</script>
