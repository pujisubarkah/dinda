<script setup>
definePageMeta({ layout: 'user' })
import { ref } from 'vue'

const showModal = ref(false)
const form = ref({
  nama: '',
  deskripsi: '',
  kategori: '',
  opd: '',
  kontak: '',
  file: null,
})
const kategoriList = [
  'Teknologi',
  'Sosial',
  'Ekonomi',
  'Kesehatan',
  'Pendidikan',
]
const dataInovasi = ref([])
function handleFile(e) {
  form.value.file = e.target.files[0]
}
function submitForm() {
  dataInovasi.value.unshift({
    ...form.value,
    fileName: form.value.file ? form.value.file.name : '',
    tanggal: new Date().toLocaleDateString(),
  })
  showModal.value = false
  form.value = { nama: '', deskripsi: '', kategori: '', opd: '', kontak: '', file: null }
}
</script>

<template>
  <div class="max-w-4xl mx-auto mt-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-green-800">📝 Daftar Inovasi Inkubasi</h1>
      <button @click="showModal = true" class="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:from-green-700 hover:to-yellow-600 transition">+ Tambah Inovasi</button>
    </div>
    <div class="bg-white rounded-xl shadow-lg p-4 mb-8">
      <table class="min-w-full table-auto">
        <thead>
          <tr class="bg-green-100 text-green-800">
            <th class="px-4 py-2 text-left">Nama Inovasi</th>
            <th class="px-4 py-2 text-left">Deskripsi</th>
            <th class="px-4 py-2 text-left">Kategori</th>
            <th class="px-4 py-2 text-left">OPD</th>
            <th class="px-4 py-2 text-left">Kontak</th>
            <th class="px-4 py-2 text-left">File</th>
            <th class="px-4 py-2 text-left">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in dataInovasi" :key="idx" class="border-b">
            <td class="px-4 py-2">{{ item.nama }}</td>
            <td class="px-4 py-2">{{ item.deskripsi }}</td>
            <td class="px-4 py-2">{{ item.kategori }}</td>
            <td class="px-4 py-2">{{ item.opd }}</td>
            <td class="px-4 py-2">{{ item.kontak }}</td>
            <td class="px-4 py-2">{{ item.fileName }}</td>
            <td class="px-4 py-2">{{ item.tanggal }}</td>
          </tr>
          <tr v-if="dataInovasi.length === 0">
            <td colspan="7" class="text-center text-gray-400 py-6">Belum ada data inovasi</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Input Inovasi -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative">
        <button @click="showModal = false" class="absolute top-2 right-2 z-10 text-red-500 hover:text-red-700 text-2xl font-bold flex items-center justify-center w-8 h-8" aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 class="text-xl font-bold text-green-800 mb-6">Tambah Inovasi Inkubasi</h2>
        <form @submit.prevent="submitForm" class="space-y-5">
          <div>
            <label class="block text-sm font-bold text-green-700 mb-2">Nama Inovasi</label>
            <input v-model="form.nama" type="text" class="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white" required />
          </div>
          <div>
            <label class="block text-sm font-bold text-green-700 mb-2">Deskripsi</label>
            <textarea v-model="form.deskripsi" rows="2" class="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white" required></textarea>
          </div>
          <div>
            <label class="block text-sm font-bold text-green-700 mb-2">Kategori</label>
            <select v-model="form.kategori" class="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white" required>
              <option value="" disabled>Pilih kategori</option>
              <option v-for="kat in kategoriList" :key="kat" :value="kat">{{ kat }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold text-green-700 mb-2">OPD</label>
            <input v-model="form.opd" type="text" class="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white" required />
          </div>
          <div>
            <label class="block text-sm font-bold text-green-700 mb-2">Kontak</label>
            <input v-model="form.kontak" type="text" class="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white" required />
          </div>
          <div>
            <label class="block text-sm font-bold text-green-700 mb-2">Upload File</label>
            <input type="file" @change="handleFile" class="w-full px-4 py-3 border-2 border-green-200 rounded-lg bg-white" />
          </div>
          <div class="pt-2">
            <button type="submit" class="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-8 py-3 rounded-lg font-bold hover:from-green-700 hover:to-yellow-600 transition-all shadow-lg">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
