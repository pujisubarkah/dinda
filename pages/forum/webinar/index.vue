<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-yellow-100 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-200/30 to-yellow-200/30 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-200/30 to-green-200/30 rounded-full translate-x-40 translate-y-40 blur-3xl"></div>
    
    <!-- Sidebar Forum -->
    <sidebar_forum class="shrink-0 relative z-10" />
    
    <!-- Konten Webinar -->
    <div class="flex-1 py-8 px-2 md:px-8 relative z-10">
      <div class="max-w-6xl mx-auto">
        <!-- Header & Deskripsi -->
        <div class="mb-10 text-center relative">
          <div class="absolute inset-0 bg-gradient-to-r from-green-100/50 via-yellow-100/50 to-blue-100/50 rounded-3xl blur-xl"></div>
          <div class="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl">
            <div class="flex items-center justify-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <span class="text-2xl">🎥</span>
              </div>
              <h1 class="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-green-800 via-emerald-700 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
                Webinar & Event Inovasi
              </h1>
            </div>
            <p class="text-gray-700 text-lg md:text-xl font-medium leading-relaxed max-w-4xl mx-auto">
              🚀 Temukan berbagai webinar, talkshow, dan event inovasi daerah Kota Cilegon. 
              <span class="text-green-700 font-semibold">Ikuti, belajar, dan berjejaring</span> bersama para inovator daerah terdepan!
            </p>
            <div class="flex justify-center gap-4 mt-6">
              <div class="badge badge-lg badge-success gap-2 shadow-md">
                <span>📈</span> 50+ Event Tersedia
              </div>
              <div class="badge badge-lg badge-warning gap-2 shadow-md">
                <span>👥</span> 2000+ Peserta Aktif
              </div>
            </div>
          </div>
        </div>
        <!-- Search & Filter -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 mb-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button type="button" class="btn btn-warning btn-outline hover:btn-warning hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-semibold">
              <span><svg viewBox="64 64 896 896" width="20" height="20" fill="currentColor"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg></span>
              <span>🔍 Cari Berdasarkan Kode</span>
            </button>
            <div class="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div class="relative">
                <input v-model="search" type="search" placeholder="🔍 Cari Webinar..." class="input input-bordered w-full md:w-72 rounded-xl text-sm bg-white/90 border-2 border-green-200 focus:border-green-400 shadow-md" />
              </div>
              <select v-model="filter" class="select select-bordered w-full md:w-52 rounded-xl text-sm bg-white/90 border-2 border-green-200 focus:border-green-400 shadow-md">
                <option value="terdekat">📅 Tanggal Terdekat</option>
                <option value="terlama">📆 Tanggal Terlama</option>
                <option value="jam">⏰ Jam Pelajaran Terbanyak</option>
              </select>
            </div>
          </div>
        </div>
        <!-- Webinar Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
          <div v-for="webinar in webinars" :key="webinar.id" class="group card card-bordered card-compact shadow-xl hover:shadow-2xl hover:scale-[1.05] transition-all duration-300 cursor-pointer bg-white/95 backdrop-blur-sm border-2 border-white/50 hover:border-green-300 rounded-2xl overflow-hidden">
            <NuxtLink :to="`/forum/webinar/${webinar.id}`">
              <figure class="h-40 overflow-hidden bg-gradient-to-tr from-green-100 via-yellow-100 to-blue-100 relative">
                <img :src="webinar.image" alt="webinar image" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span class="absolute top-3 left-3 badge badge-success gap-1 text-xs shadow-lg bg-green-500/90 border-0">
                  <span>✨</span> Event
                </span>
                <span class="absolute top-3 right-3 badge badge-warning gap-1 text-xs shadow-lg bg-yellow-500/90 border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>👁️</span> Lihat
                </span>
              </figure>
            </NuxtLink>
            <div class="card-body p-5">
              <NuxtLink :to="`/forum/webinar/${webinar.id}`" class="font-bold text-green-900 text-base mb-3 line-clamp-2 hover:text-green-700 transition-colors duration-200 leading-tight">
                {{ webinar.title }}
              </NuxtLink>
              <div class="space-y-2 mb-4">
                <div class="flex items-center text-sm text-gray-600 gap-2">
                  <span class="flex items-center gap-1 text-green-600">
                    <svg viewBox="64 64 896 896" width="16" height="16" fill="currentColor"><path d="M712 304c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H384v48c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H184v136h656V256H712v48z" fill="#e6f4ff"></path><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zm0-448H184V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136z" fill="#1677ff"></path></svg>
                  </span>
                  <span class="font-medium">{{ webinar.date }}</span>
                </div>
                <div class="flex items-center text-sm text-gray-600 gap-2">
                  <span class="flex items-center gap-1 text-blue-600">
                    <svg viewBox="64 64 896 896" width="16" height="16" fill="currentColor"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372-166.6 372-372-166.6-372-372-372zm176.5 509.7l-28.6 39a7.99 7.99 0 01-11.2 1.7L483.3 569.8a7.92 7.92 0 01-3.3-6.5V288c0-4.4 3.6-8 8-8h48.1c4.4 0 8 3.6 8 8v247.5l142.6 103.1c3.6 2.5 4.4 7.5 1.8 11.1z" fill="#e6f4ff"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.3c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.9 11.2-1.7l28.6-39c2.6-3.6 1.8-8.6-1.8-11.1z" fill="#1677ff"></path></svg>
                  </span>
                  <span class="font-medium">{{ webinar.duration }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Pagination -->
        <div class="flex justify-center md:justify-end items-center mt-12">
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/50">
            <div class="flex items-center gap-4">
              <div class="join shadow-lg">
                <button class="join-item btn btn-sm hover:btn-primary transition-colors duration-200" :disabled="page === 1" @click="page--">
                  <span>«</span>
                </button>
                <button 
                  class="join-item btn btn-sm transition-colors duration-200" 
                  v-for="p in totalPages" 
                  :key="p" 
                  :class="{ 'btn-primary': p === page, 'hover:btn-primary': p !== page }" 
                  @click="page = p"
                >
                  {{ p }}
                </button>
                <button class="join-item btn btn-sm hover:btn-primary transition-colors duration-200" :disabled="page === totalPages" @click="page++">
                  <span>»</span>
                </button>
              </div>
              <span class="text-sm text-gray-600 font-medium">
                📊 {{ startItem }}-{{ endItem }} dari {{ totalItems }} webinar
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import sidebar_forum from '~/components/sidebar_forum.vue'
// Dummy data webinar
const webinars = ref([
  {
    id: 1,
    image: 'https://siasn.bkd.jatimprov.go.id:9000/public/image-1yJ0ddhIKC.jpg',
    title: 'Penguatan Mental Rohani dan Peningkatan Etos Kerja bagi anggota KORPRI 2025',
    date: '23 Jun 2025',
    duration: '8 Jam Pelajaran',
  },
  {
    id: 2,
    image: 'https://siasn.bkd.jatimprov.go.id:9000/public/image-t1l2e29scN.jpg',
    title: 'ONBOARDING CASN FORMASI TAHUN 2024',
    date: '10 Jun 2025',
    duration: '24 Jam Pelajaran',
  },
  {
    id: 3,
    image: 'https://siasn.bkd.jatimprov.go.id:9000/public/image-a2omxmKOAk.jpg',
    title: 'Podcast Cakrawala Birokrasi Episode 2 | Penguatan Budaya Kerja BerAKHLAK',
    date: '15 Apr 2025',
    duration: '3 Jam Pelajaran',
  },
  {
    id: 4,
    image: 'https://siasn.bkd.jatimprov.go.id:9000/public/image-_KyRSWZNcV.jpg',
    title: 'PODCAST CAKRAWALA BIROKRASI | REGULASI TATA NASKAH DINAS',
    date: '06 Mar 2025',
    duration: '2 Jam Pelajaran',
  },
  {
    id: 5,
    image: 'https://siasn.bkd.jatimprov.go.id:9000/public/image-RM8l1nNL1F.jpg',
    title: 'Talkshow Kepegawaian Series 21: "Berani Bermimpi: Sehat Finansial ala ASN"',
    date: '11 Okt 2024',
    duration: '2 Jam Pelajaran',
  },
  {
    id: 6,
    image: 'https://siasn.bkd.jatimprov.go.id:9000/public/image-SFjF3B2pjO.jpg',
    title: 'WEBINAR KEPEGAWAIAN SERIES-20 | HAK DAN KEWAJIBAN BAGI ASN YANG AKAN PENSIUN',
    date: '04 Sep 2024',
    duration: '2 Jam Pelajaran',
  },
  {
    id: 7,
    image: 'https://siasn.bkd.jatimprov.go.id:9000/public/image-l9RoZOQ369.png',
    title: 'Talkshow Series 19 KESEHATAN MENTAL ASN : CRAB MENTALITY',
    date: '31 Jul 2024',
    duration: '2 Jam Pelajaran',
  },
  {
    id: 8,
    image: 'https://siasn.bkd.jatimprov.go.id:9000/public/image-lVGf81nf_M.jpg',
    title: 'TALKSHOW KEPEGAWAIAN SERIES-17 ASNPreneur : Dari Kantor ke Rumah Membangun Bisnis',
    date: '16 Jul 2024',
    duration: '3 Jam Pelajaran',
  },
  {
    id: 9,
    image: 'https://siasn.bkd.jatimprov.go.id:9000/public/image-FsZUPPqnzT.jpg',
    title: 'Sosialisasi Kepegawaian Series 18 : Pendaftaran dan Seleksi Tugas Belajar Program Cost Sharing Bagi PNS Pemerintah Provinsi Jawa Timur',
    date: '19 Jul 2024',
    duration: '3 Jam Pelajaran',
  },
])
const search = ref('')
const filter = ref('terdekat')
const page = ref(1)
const pageSize = 10
const totalItems = computed(() => webinars.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize))
const startItem = computed(() => (page.value - 1) * pageSize + 1)
const endItem = computed(() => Math.min(page.value * pageSize, totalItems.value))
</script>
