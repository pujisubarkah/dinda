<template>
  <aside class="w-64 min-h-screen shadow-xl flex flex-col text-white py-8 px-4" style="background: linear-gradient(180deg, #1e293b 0%, #334155 50%, #475569 100%);">
    <div class="mb-8 flex items-center gap-3">
      <div class="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg border border-teal-400/30">
        <img src="/berakhlak.png" alt="Logo BerAKHLAK" class="h-8 w-auto" />
      </div>
      <div>
        <span class="text-xl font-extrabold tracking-wide text-white block" style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);">FORUM DINDA</span>
        <span class="text-xs text-teal-300 font-medium">Komunitas Inovator</span>
      </div>
    </div>
    <nav class="space-y-3 flex-1">
      <NuxtLink
        to="/forum/knowledge-base"
        class="group flex items-center gap-3 px-4 py-3 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        style="text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);"
      >
        <span class="text-lg">📚</span>
        <span class="group-hover:font-bold">Knowledge Base</span>
      </NuxtLink>
      <NuxtLink
        to="/forum/pertanyaan-saya"
        class="group flex items-center gap-3 px-4 py-3 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        style="text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);"
      >
        <span class="text-lg">❓</span>
        <span class="group-hover:font-bold">Pertanyaan Saya</span>
      </NuxtLink>
      <NuxtLink
        to="/forum/webinar"
        class="group flex items-center gap-3 px-4 py-3 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        style="text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);"
      >
        <span class="text-lg">🎥</span>
        <span class="group-hover:font-bold">Webinar</span>
      </NuxtLink>
      <NuxtLink
        to="/forum/informasi"
        class="group flex items-center gap-3 px-4 py-3 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        style="text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);"
      >
        <span class="text-lg">ℹ️</span>
        <span class="group-hover:font-bold">Informasi</span>
      </NuxtLink>
    </nav>
    <div class="mt-auto pt-8 border-t border-white/10">
      <div class="text-xs text-center text-slate-300 mb-2">
        &copy; 2025 DINDA Kota Cilegon
      </div>
      <div class="flex justify-center">
        <div class="w-8 h-1 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full"></div>
      </div>
    </div>
  </aside>
</template>

<script setup>
// Tidak ada script yang diperlukan untuk komponen sidebar ini
</script>

<style scoped>
/* Tambahkan style khusus jika diperlukan */
</style>
