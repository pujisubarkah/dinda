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

      <!-- Recent Discussions -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">🔥 Diskusi Terpopuler</h2>
          <button class="text-teal-600 hover:text-teal-700 font-semibold">Lihat Semua →</button>
        </div>
        
        <div class="space-y-4">
          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                DR
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="font-bold text-gray-800">Implementasi Smart City di Cilegon</h3>
                  <span class="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs font-semibold">💻 Teknologi Digital</span>
                </div>
                <p class="text-gray-700 mb-3">Bagaimana strategi terbaik untuk mengimplementasikan konsep smart city di Kota Cilegon? Mari diskusikan tantangan dan peluang yang ada...</p>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span>👤 Dr. Rudi Santoso</span>
                  <span>💬 23 balasan</span>
                  <span>👀 156 views</span>
                  <span>⏰ 2 jam lalu</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                SA
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="font-bold text-gray-800">Program Bank Sampah Digital</h3>
                  <span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">🌱 Lingkungan Hidup</span>
                </div>
                <p class="text-gray-700 mb-3">Inisiatif bank sampah digital untuk mengurangi limbah dan meningkatkan ekonomi circular. Ada yang punya pengalaman serupa?</p>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span>👤 Sari Amelia</span>
                  <span>💬 18 balasan</span>
                  <span>👀 89 views</span>
                  <span>⏰ 4 jam lalu</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                BP
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="font-bold text-gray-800">Pelatihan Digital Marketing untuk UMKM</h3>
                  <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">🚀 Startup & UMKM</span>
                </div>
                <p class="text-gray-700 mb-3">Mencari mentor dan peserta untuk program pelatihan digital marketing bagi pelaku UMKM di Cilegon. Free dan bersertifikat!</p>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span>👤 Budi Prasetyo</span>
                  <span>💬 31 balasan</span>
                  <span>👀 203 views</span>
                  <span>⏰ 6 jam lalu</span>
                </div>
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
          <button class="bg-white text-teal-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            ✍️ Buat Diskusi Baru
          </button>
          <button class="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-teal-600 transition-all duration-300 transform hover:scale-105">
            💡 Bagikan Ide Inovasi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import sidebar_forum from '~/components/sidebar_forum.vue'
// ...existing code...
</script>