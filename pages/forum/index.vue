<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gray-50">
    <!-- Sidebar Forum -->
    <sidebar_forum class="shrink-0" />
    <!-- Konten Utama Forum -->
    <div class="flex-1 p-4 md:p-8">
      <!-- Tambahkan konten utama forum di sini -->
      <h2 class="text-2xl font-bold mb-4">Forum Diskusi</h2>
      <p class="text-gray-600 mb-6">Selamat datang di halaman utama forum. Silakan pilih menu di sidebar untuk mulai berdiskusi atau mencari informasi.</p>
      <!-- ...existing code... -->
    </div>
  </div>
</template>

<script setup>
import sidebar_forum from '~/components/sidebar_forum.vue'
// ...existing code...
</script>