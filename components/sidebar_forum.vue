<template>
  <aside class="w-64 min-h-screen bg-gradient-to-b from-green-700 via-green-800 to-yellow-500 shadow-xl flex flex-col text-white py-8 px-4">
    <div class="mb-8 flex items-center gap-3">
      <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
        <img src="/berakhlak.png" alt="Logo BerAKHLAK" class="h-7 w-auto" />
      </div>
      <span class="text-xl font-extrabold tracking-wide text-white drop-shadow-lg">FORUM</span>
    </div>
    <nav class="space-y-3 flex-1">
      <NuxtLink
        to="/forum/knowledge-base"
        class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-green-900 transition-all duration-300 transform hover:scale-105"
      >
        <span class="text-lg">📚</span>
        <span class="group-hover:font-bold">Knowledge Base</span>
      </NuxtLink>
      <NuxtLink
        to="/forum/pertanyaan-saya"
        class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-green-400 hover:to-yellow-400 hover:text-green-900 transition-all duration-300 transform hover:scale-105"
      >
        <span class="text-lg">❓</span>
        <span class="group-hover:font-bold">Pertanyaan Saya</span>
      </NuxtLink>
      <NuxtLink
        to="/forum/webinar"
        class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-400 hover:text-green-900 transition-all duration-300 transform hover:scale-105"
      >
        <span class="text-lg">🎥</span>
        <span class="group-hover:font-bold">Webinar</span>
      </NuxtLink>
      <NuxtLink
        to="/forum/informasi"
        class="group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-orange-400 hover:to-yellow-400 hover:text-green-900 transition-all duration-300 transform hover:scale-105"
      >
        <span class="text-lg">ℹ️</span>
        <span class="group-hover:font-bold">Informasi</span>
      </NuxtLink>
    </nav>
    <div class="mt-auto pt-8 text-xs text-center text-white/70">
      &copy; 2025 DINDA Kota Cilegon
    </div>
  </aside>
</template>

<script setup>
// Tidak ada script yang diperlukan untuk komponen sidebar ini
</script>

<style scoped>
/* Tambahkan style khusus jika diperlukan */
</style>
