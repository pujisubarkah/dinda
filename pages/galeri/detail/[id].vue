<template>
  <div class="max-w-3xl mx-auto px-6 py-10">
    <NuxtLink to="/galeri" class="text-yellow-600 hover:text-green-700 font-semibold mb-6 inline-block">← Kembali ke Galeri</NuxtLink>
    <div class="bg-white rounded-xl shadow-lg border border-yellow-300 p-8">
      <div class="flex flex-col md:flex-row md:items-center mb-6">
        <img :src="inovasi.image" alt="Inovasi" class="w-full md:w-1/2 rounded-lg mb-4 md:mb-0 md:mr-8" />
        <div>
          <h1 class="text-3xl font-bold text-green-800 mb-2">{{ inovasi.judul }}</h1>
          <p class="text-yellow-600 font-semibold mb-1">Kategori: {{ inovasi.kategori }}</p>
          <p class="text-gray-600 mb-1">Kecamatan: {{ inovasi.kecamatan }}</p>
          <p class="text-gray-600 mb-1">Tahun: {{ inovasi.tahun }}</p>
        </div>
      </div>
      <div class="mt-4">
        <h2 class="text-xl font-bold text-green-700 mb-2">Deskripsi Inovasi</h2>
        <p class="text-gray-700">{{ inovasi.deskripsi }}</p>
      </div>
      <div class="mt-6">
  <button class="px-6 py-2 bg-yellow-400 text-green-900 rounded-lg font-bold hover:bg-yellow-500 transition">Hubungi Inovator</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id

// Dummy data
const kecamatanList = [
  'Cibeber', 'Cilegon', 'Pulomerak', 'Ciwandan', 'Jombang', 'Gerogol', 'Purwakarta', 'Citangkil'
]
const inovasi = {
  image: 'https://placehold.co/600x300?text=Inovasi',
  judul: `Judul Inovasi ${id}`,
  kategori: 'Teknologi',
  kecamatan: kecamatanList[(id-1)%8] || kecamatanList[0],
  tahun: 2024,
  deskripsi: 'Deskripsi lengkap mengenai inovasi yang diusulkan di kecamatan tersebut. Berisi latar belakang, tujuan, manfaat, dan detail implementasi.'
}
</script>
