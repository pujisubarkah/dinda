<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-green-800">🌱 Galeri Inovasi Daerah</h1>
      <p class="text-yellow-600 mt-2">Kumpulan ide & inovasi dari seluruh Indonesia</p>
    </div>

    <!-- Filter & Search -->
    <div class="bg-green-50 p-4 rounded-xl border border-yellow-300 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      <input type="text" placeholder="Cari inovasi..." class="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 col-span-2" />
      <select class="px-3 py-2 border rounded-lg">
        <option value="">Kategori</option>
        <option>Lingkungan</option>
        <option>Teknologi</option>
        <option>Layanan Publik</option>
      </select>
      <select class="px-3 py-2 border rounded-lg">
        <option value="">Tahun</option>
        <option>2024</option>
        <option>2023</option>
        <option>2022</option>
      </select>
    </div>

    <!-- Peta Inovasi Component -->
    <PetaInovasi />

    <!-- Galeri Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      <div v-for="i in 6" :key="i" class="bg-white border border-yellow-300 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
        <img src="https://placehold.co/400x200?text=Inovasi" alt="Inovasi" class="rounded-lg mb-4" />
        <h3 class="font-semibold text-green-700 text-lg">Judul Inovasi {{ i }}</h3>
        <p class="text-sm text-gray-600">Kategori: Teknologi</p>
        <p class="text-sm text-gray-600">Daerah: Yogyakarta</p>
        <NuxtLink to="/galeri/detail/1" class="mt-3 inline-block text-yellow-600 font-semibold hover:text-green-700">
          Lihat Detail →
        </NuxtLink>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-10 space-x-2">
      <button class="px-4 py-2 border border-yellow-400 text-yellow-600 rounded hover:bg-yellow-400 hover:text-green-900">Prev</button>
      <button class="px-4 py-2 bg-yellow-400 text-green-900 rounded font-bold">1</button>
      <button class="px-4 py-2 border border-yellow-400 text-yellow-600 rounded hover:bg-yellow-400 hover:text-green-900">2</button>
      <button class="px-4 py-2 border border-yellow-400 text-yellow-600 rounded hover:bg-yellow-400 hover:text-green-900">Next</button>
    </div>
  </div>
</template>
