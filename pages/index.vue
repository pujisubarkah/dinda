<template>
  <div>
    <section
      class="w-full py-16 flex items-center justify-center"
      style="background-image: url('https://cilegon.go.id/assets/images/bgtagline.jpg'); background-size: cover; background-repeat: no-repeat; background-attachment: fixed; background-position: center;"
    >
      <div class="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
        <div class="flex flex-col items-center justify-center">
          <span class="text-5xl font-light mb-2">8</span>
          <h3 class="text-lg font-light mt-2">KECAMATAN</h3>
        </div>
        <div class="flex flex-col items-center justify-center">
          <p class="text-lg font-semibold mt-2 mb-2">MEWUJUDKAN CILEGON MAJU, SEJAHTERA DAN BERKELANJUTAN</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <span class="text-5xl font-light mb-2">43</span>
          <h3 class="text-lg font-light mt-2">KELURAHAN</h3>
        </div>
      </div>
    </section>

    <!-- Walikota Section -->
    <section class="bg-white py-12">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-5">
            <img src="https://cilegon.go.id/assets/img/walikota.png" alt="Walikota Cilegon" class="w-full rounded-lg shadow-lg">
          </div>
          <div class="lg:col-span-7">
            <p class="text-2xl md:text-3xl font-light text-green-700 italic mb-6 leading-relaxed">
              " Berkolaborasi dan bekerja bersama untuk mencapai tujuan-tujuan yang diharapkan melalui serangkaian program dan kebijakan yang partisipatif "
            </p>
            <a href="https://cilegon.go.id/profil-kota-cilegon" target="_blank" class="inline-block bg-transparent border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-green-900 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200">
              Profil Pemerintah
            </a>
          </div>
        </div>
      </div>
    </section>
   
  <!-- Enhanced Hero Section -->
    <section class="relative min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-20 left-10 w-32 h-32 bg-teal-400 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-40 right-20 w-48 h-48 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute bottom-20 left-1/3 w-40 h-40 bg-green-300 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <!-- Floating Action Button -->
      <button @click="showModal = true" class="absolute top-8 right-8 z-20 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 pulse-ring">
        <span class="flex items-center">
          💡 Punya Ide Inovasi?
        </span>
      </button>

      <!-- Modal Ide Inovasi -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative animate-modal-in">
          <button @click="showModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl transition-colors">&times;</button>
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">💡</span>
            </div>
            <h2 class="text-2xl font-bold text-teal-700 mb-2">Daftarkan Ide Inovasi</h2>
            <p class="text-gray-600">Wujudkan inovasi Anda bersama DINDA Cilegon</p>
          </div>
          <NuxtLink to="/inkubasi" class="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg block text-center">
            🚀 Mulai Inkubasi
          </NuxtLink>
        </div>
      </div>

      <!-- Main Hero Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          <!-- Left Content -->
          <div class="text-left">
            <div class="inline-flex items-center bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🌟 Platform Inovasi Terdepan
            </div>
            
            <h1 class="text-5xl md:text-7xl font-black mb-6">
              <span class="bg-gradient-to-r from-teal-600 via-teal-700 to-blue-600 bg-clip-text text-transparent">
                DINDA CILEGON
              </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed">
              <span class="font-semibold text-teal-700">Dashboard Inovasi Daerah Kota Cilegon</span>
            </p>
            
            <p class="text-lg md:text-xl text-gray-600 mb-8 italic leading-relaxed">
              Wahana Informasi & Akselerasi Inovasi Kota Cilegon
            </p>

            <!-- Feature Highlights -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <span class="text-teal-600">🎯</span>
                </div>
                <span class="text-gray-700 font-medium">Inkubasi Ide Inovatif</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span class="text-blue-600">🤝</span>
                </div>
                <span class="text-gray-700 font-medium">Kolaborasi Lintas Sektor</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span class="text-green-600">📊</span>
                </div>
                <span class="text-gray-700 font-medium">Dashboard Monitoring</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span class="text-purple-600">🏆</span>
                </div>
                <span class="text-gray-700 font-medium">Kompetisi Inovasi</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/galeri" class="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center">
                🖼️ Jelajahi Galeri Inovasi
              </NuxtLink>
              <NuxtLink to="/inkubasi" class="border-2 border-teal-500 text-teal-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg text-center">
                🚀 Daftarkan Ide Anda
              </NuxtLink>
            </div>
          </div>

          <!-- Right Visual Content -->
          <div class="relative">
            <!-- Stats Cards Floating -->
            <div class="grid grid-cols-2 gap-4 mb-8">
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="text-3xl font-black text-teal-600 mb-2">12.8K+</div>
                <div class="text-sm text-gray-600">💡 Ide Inovasi</div>
              </div>
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="text-3xl font-black text-blue-600 mb-2">120</div>
                <div class="text-sm text-gray-600">🏛️ Daerah Terlibat</div>
              </div>
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="text-3xl font-black text-green-600 mb-2">500+</div>
                <div class="text-sm text-gray-600">👥 Inovator Aktif</div>
              </div>
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="text-3xl font-black text-purple-600 mb-2">200+</div>
                <div class="text-sm text-gray-600">🎯 Program Inkubasi</div>
              </div>
            </div>

            <!-- Innovation Showcase -->
            <div class="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30">
              <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">🌟 Inovasi Unggulan</h3>
              <div class="space-y-4">
                <div class="flex items-center space-x-4 p-4 bg-teal-50 rounded-xl">
                  <div class="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white text-xl">🌱</div>
                  <div>
                    <div class="font-semibold text-gray-800">Smart Agriculture</div>
                    <div class="text-sm text-gray-600">Teknologi pertanian berkelanjutan</div>
                  </div>
                </div>
                <div class="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                  <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">📱</div>
                  <div>
                    <div class="font-semibold text-gray-800">Digital Government</div>
                    <div class="text-sm text-gray-600">Platform layanan publik digital</div>
                  </div>
                </div>
                <div class="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                  <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">⚡</div>
                  <div>
                    <div class="font-semibold text-gray-800">Clean Energy</div>
                    <div class="text-sm text-gray-600">Solusi energi terbarukan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Wave -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="relative block w-full h-16 fill-teal-50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>

   

    <!-- Statistik & Peta Inovasi -->
    <section class="py-12 bg-green-50">
      <div class="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-10">
        <div class="p-6 bg-white rounded-xl shadow border-2 border-yellow-400">
          <h2 class="text-3xl font-bold text-green-700">12.810+</h2>
          <p class="text-sm text-gray-600">Ide Inovasi</p>
        </div>
        <div class="p-6 bg-white rounded-xl shadow border-2 border-yellow-400">
          <h2 class="text-3xl font-bold text-green-700">120</h2>
          <p class="text-sm text-gray-600">Daerah Terlibat</p>
        </div>
        <div class="p-6 bg-white rounded-xl shadow border-2 border-yellow-400">
          <h2 class="text-3xl font-bold text-green-700">500+</h2>
          <p class="text-sm text-gray-600">Inovator Aktif</p>
        </div>
        <div class="p-6 bg-white rounded-xl shadow border-2 border-yellow-400">
          <h2 class="text-3xl font-bold text-green-700">200+</h2>
          <p class="text-sm text-gray-600">Program Inkubasi</p>
        </div>
      </div>
      
      <!-- Peta Inovasi Component -->
      <div class="max-w-7xl mx-auto">
        <PetaInovasi />
      </div>
    </section>

    <!-- Galeri Inovasi Terbaru -->
    <section class="py-12 max-w-7xl mx-auto px-6">
      <h2 class="text-2xl font-bold text-green-800 mb-6">Inovasi Terbaru</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white border border-yellow-300 rounded-xl shadow p-4">
          <h3 class="font-semibold text-green-700">Sistem Pertanian Cerdas</h3>
          <p class="text-sm text-gray-600">Kategori: Teknologi</p>
        </div>
        <div class="bg-white border border-yellow-300 rounded-xl shadow p-4">
          <h3 class="font-semibold text-green-700">Aplikasi Layanan Publik</h3>
          <p class="text-sm text-gray-600">Kategori: Digital</p>
        </div>
        <div class="bg-white border border-yellow-300 rounded-xl shadow p-4">
          <h3 class="font-semibold text-green-700">Energi Terbarukan Desa</h3>
          <p class="text-sm text-gray-600">Kategori: Lingkungan</p>
        </div>
      </div>
      <div class="text-center mt-6">
        <NuxtLink to="/galeri" class="text-green-700 hover:text-yellow-500 font-semibold">Lihat Semua →</NuxtLink>
      </div>
    </section>

  <!-- CTA dihapus, tombol sudah dipindahkan ke atas Hero section -->

     <!-- Kontak dan Maps -->
    <div class="max-w-5xl mx-auto my-12 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6">
      <div class="flex items-center justify-center">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2725.854697861844!2d106.03949054745402!3d-6.008599368925427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x82fc1a3883ee5a4e!2sDinas%20KOMINFO%20Kota%20Cilegon!5e0!3m2!1sid!2sid!4v1612801235312!5m2!1sid!2sid" frameborder="0" style="border:0;width:100%;height:300px;" allowfullscreen></iframe>
      </div>
      <div class="flex flex-col justify-center space-y-4">
        <div class="font-bold text-green-700 text-lg mb-2">Pemerintahan Kota Cilegon</div>
        <div class="flex items-center text-gray-700"><i class="fa fa-map-marker mr-2 text-yellow-500"></i> Jl. Raya Merak-Tirtayasa No.11, RT.3/RW.1, Ramanuju, Kec. Purwakarta, Kota Cilegon</div>
        <div class="flex items-center"><i class="fa fa-phone mr-2 text-green-600"></i> <span class="font-semibold mr-2">Phone:</span> 02142432</div>
        <div class="flex items-center"><i class="fa fa-fax mr-2 text-green-600"></i> <span class="font-semibold mr-2">Fax:</span> <a href="https://www.youtube.com/channel/UCuksmrFzRoe9nxAilA95EUA" class="text-blue-600 hover:underline">YouTube Channel</a></div>
        <div class="flex items-center"><i class="fa fa-envelope mr-2 text-green-600"></i> <span class="font-semibold mr-2">Email:</span> <a href="mailto:diskominfo@gmail.com" class="text-blue-600 hover:underline">diskominfo@gmail.com</a></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PetaInovasi from '~/components/PetaInovasi.vue'

// Set page title and meta
useHead({
  title: 'Beranda',
  meta: [
    { 
      name: 'description', 
      content: 'Halaman utama Dashboard Inovasi Daerah (DINDA) Kota Cilegon - Menampilkan statistik dan visualisasi inovasi-inovasi daerah yang mendukung pencapaian SDGs di Kota Cilegon' 
    }
  ]
})

const showModal = ref(false)
</script>

<style>
@keyframes modal-in {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes pulse-ring {
  0% {
    box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(20, 184, 166, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(20, 184, 166, 0);
  }
}

.animate-modal-in {
  animation: modal-in 0.3s ease-out;
}

.pulse-ring {
  animation: pulse-ring 2s infinite;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom gradient text */
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}

/* Glass morphism effects */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Hover animations for cards */
.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.hover\:-translate-y-2:hover {
  transform: translateY(-8px);
}
</style>
