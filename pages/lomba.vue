<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">🏆 Lomba Inovasi Daerah</h1>
        <p class="text-xl md:text-2xl text-teal-100 mb-8">
          Kompetisi Inovasi Terbaik Kota Cilegon 2024
        </p>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
          <p class="text-lg">
            Ajang bergengsi untuk menampilkan kreativitas dan inovasi terbaik dari seluruh OPD dan masyarakat Kota Cilegon
          </p>
        </div>
      </div>
    </section>



    <!-- Categories -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">📋 Kategori Lomba</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="category in categories" :key="category.id" 
               class="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div class="text-4xl mb-4">{{ category.icon }}</div>
            <h3 class="text-xl font-semibold text-gray-800 mb-3">{{ category.name }}</h3>
            <p class="text-gray-600 text-sm mb-4">{{ category.description }}</p>
            <div class="text-sm text-teal-600 font-medium">
              Target: {{ category.target }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Registration CTA -->
    <section class="py-16 bg-gradient-to-r from-teal-600 to-teal-700">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-6">Siap Berkompetisi?</h2>
        <p class="text-xl text-teal-100 mb-8">
          Daftarkan inovasi terbaik Anda dan menangkan hadiah jutaan rupiah!
        </p>
        <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button class="w-full sm:w-auto bg-white text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            📝 Daftar Sekarang
          </button>
          <button class="w-full sm:w-auto border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-700 transition-colors duration-200">
            📖 Lihat Panduan
          </button>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">❓ FAQ</h2>
        <div class="space-y-6">
          <div v-for="faq in faqs" :key="faq.id" class="bg-white rounded-xl shadow-lg">
            <button @click="toggleFAQ(faq.id)" 
                    class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 rounded-xl transition-colors duration-200">
              <span class="font-semibold text-gray-800">{{ faq.question }}</span>
              <svg class="w-5 h-5 text-gray-500 transform transition-transform duration-200" 
                   :class="{ 'rotate-180': openFAQ === faq.id }" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-if="openFAQ === faq.id" class="px-6 pb-4">
              <p class="text-gray-600">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openFAQ = ref(null)

const categories = [
  {
    id: 1,
    name: "Inovasi Pelayanan Publik",
    icon: "🏛️",
    description: "Inovasi dalam meningkatkan kualitas pelayanan kepada masyarakat",
    target: "OPD & BUMD"
  },
  {
    id: 2,
    name: "Inovasi Teknologi Digital",
    icon: "💻",
    description: "Solusi teknologi untuk mempermudah berbagai aspek kehidupan",
    target: "Umum"
  },
  {
    id: 3,
    name: "Inovasi Lingkungan Hidup",
    icon: "🌱",
    description: "Inovasi untuk kelestarian dan keberlanjutan lingkungan",
    target: "Umum"
  },
  {
    id: 4,
    name: "Inovasi Ekonomi Kreatif",
    icon: "🎨",
    description: "Inovasi dalam bidang ekonomi kreatif dan UMKM",
    target: "UMKM & Pelaku Usaha"
  },
  {
    id: 5,
    name: "Inovasi Pendidikan",
    icon: "📚",
    description: "Inovasi dalam metode dan sistem pembelajaran",
    target: "Institusi Pendidikan"
  },
  {
    id: 6,
    name: "Inovasi Kesehatan",
    icon: "🏥",
    description: "Inovasi untuk meningkatkan kualitas kesehatan masyarakat",
    target: "Tenaga Kesehatan"
  }
]

const faqs = [
  {
    id: 1,
    question: "Siapa saja yang bisa mengikuti lomba ini?",
    answer: "Lomba terbuka untuk seluruh OPD, BUMD, institusi pendidikan, UMKM, dan masyarakat umum Kota Cilegon yang memiliki inovasi di bidangnya masing-masing."
  },
  {
    id: 2,
    question: "Bagaimana cara mendaftar?",
    answer: "Pendaftaran dilakukan secara online melalui website DINDA Cilegon dengan mengupload proposal inovasi, dokumen pendukung, dan mengisi formulir yang tersedia."
  },
  {
    id: 3,
    question: "Apa saja kriteria penilaian?",
    answer: "Kriteria penilaian meliputi: Orisinalitas (25%), Manfaat & Dampak (30%), Implementasi & Keberlanjutan (25%), dan Presentasi (20%)."
  },
  {
    id: 4,
    question: "Apakah ada biaya pendaftaran?",
    answer: "Tidak ada biaya pendaftaran. Lomba ini gratis untuk semua peserta."
  },
  {
    id: 5,
    question: "Kapan pengumuman pemenang?",
    answer: "Pengumuman pemenang akan dilakukan pada tanggal 25 Desember 2024 melalui website resmi dan media sosial DINDA Cilegon."
  }
]

const toggleFAQ = (id) => {
  openFAQ.value = openFAQ.value === id ? null : id
}
</script>