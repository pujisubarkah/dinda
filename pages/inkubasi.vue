<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <!-- Hero & CTA -->
    <div class="flex flex-col md:flex-row items-center justify-between mb-10 gap-8">
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-4xl font-extrabold text-green-700 mb-2">Pendaftaran Inovasi Online</h1>
        <p class="text-yellow-600 mb-4">Daftarkan ide inovasi Anda dan ikuti proses seleksi, kurasi, serta pendampingan terjadwal.</p>
        <div class="flex gap-4 justify-center md:justify-start">
          <button @click="showForm = true" class="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow hover:bg-green-700 transition">Daftarkan Ide Inovasi</button>
          <button @click="showTimeline = true" class="bg-yellow-400 text-green-900 px-8 py-3 rounded-full font-bold shadow hover:bg-yellow-300 transition">Lihat Langkah Inkubasi</button>
        </div>
      </div>
    </div>

    <!-- Modal Timeline Inkubasi -->
    <div v-if="showTimeline" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full relative max-h-[90vh] overflow-y-auto">
        <button @click="showTimeline = false" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
        <h2 class="text-3xl font-bold text-green-700 mb-6 text-center">🚀 Langkah-Langkah Inkubasi Inovasi</h2>
        
        <!-- Timeline Steps -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div v-for="(step, idx) in steps" :key="idx" class="flex flex-col items-center text-center">
            <div :class="['w-20 h-20 rounded-full flex items-center justify-center mb-3 shadow-lg', step.active ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500']">
              <span class="text-3xl">{{ step.icon }}</span>
            </div>
            <div class="font-bold text-green-700 text-lg">{{ step.title }}</div>
            <div class="text-sm text-gray-600 mt-2">{{ step.desc }}</div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center border-t pt-6">
          <p class="text-gray-700 mb-4">Siap untuk memulai perjalanan inovasi Anda?</p>
          <button @click="showTimeline = false; showForm = true" class="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow hover:bg-green-700 transition">
            Daftarkan Ide Inovasi Sekarang
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Form Pendaftaran -->
    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
        <button @click="showForm = false" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
        <h2 class="text-2xl font-bold text-green-700 mb-4">Form Pendaftaran Inovasi</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-green-700 mb-1">Nama Inovasi</label>
            <input v-model="form.nama" type="text" placeholder="Nama Inovasi" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400" required />
          </div>
          <div>
            <label class="block text-sm font-semibold text-green-700 mb-1">Deskripsi</label>
            <textarea v-model="form.deskripsi" placeholder="Deskripsi singkat inovasi" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400" rows="3" required></textarea>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-green-700 mb-1">Kategori</label>
              <select v-model="form.kategori" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" required>
                <option value="">Pilih Kategori</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Digital">Digital</option>
                <option value="Lingkungan">Lingkungan</option>
                <option value="Infrastruktur">Infrastruktur</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-green-700 mb-1">OPD</label>
              <input v-model="form.opd" type="text" placeholder="Nama OPD" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-green-700 mb-1">Kontak Pengusul</label>
            <input v-model="form.kontak" type="text" placeholder="Email/HP" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400" required />
          </div>
          <div>
            <label class="block text-sm font-semibold text-green-700 mb-1">Upload Dokumen Pendukung</label>
            <input type="file" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <button type="submit" class="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition">Kirim Ide</button>
        </form>
        <div v-if="formSuccess" class="mt-4 text-green-700 font-bold">Ide berhasil didaftarkan!</div>
      </div>
    </div>

    <!-- Progress Tracker Sederhana -->
    <div class="bg-white border border-yellow-300 rounded-xl shadow p-6 mb-10">
      <h3 class="font-semibold text-green-700 mb-4">Progress Tracker</h3>
      <div class="flex flex-col gap-4">
        <div v-for="(row, idx) in rows" :key="row.id" class="bg-gray-50 rounded-lg border border-yellow-200 p-4 shadow">
          <div class="flex justify-between items-center mb-2">
            <div class="font-bold text-green-800">{{ row.nama }}</div>
            <div class="text-xs text-gray-500">{{ row.status }}</div>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-gradient-to-r from-green-400 to-green-700 h-2 rounded-full transition-all duration-700" :style="{ width: row.progress + '%' }"></div>
          </div>
          <div class="flex justify-between text-xs mt-1">
            <span class="text-gray-600">Mentor: {{ row.mentor }}</span>
            <span class="text-green-700 font-bold">{{ row.progress }}%</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Ilustrasi & CTA -->
    <div class="flex flex-col md:flex-row items-center justify-between mb-10 gap-8">
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Inkubasi" class="w-32 h-32 mx-auto md:mx-0 drop-shadow-lg" />
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-4xl font-extrabold text-green-700 mb-2">Gabung Inkubasi Inovasi!</h1>
        <p class="text-yellow-600 mb-4">Kembangkan ide inovasi Anda bersama mentor terbaik dan ekosistem kolaboratif.</p>
        <NuxtLink to="/" class="inline-block bg-yellow-400 text-green-900 px-8 py-3 rounded-full font-bold shadow hover:bg-yellow-300 transition">Kembali ke Beranda</NuxtLink>
      </div>
    </div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-green-800">🌱 Inkubasi Inovasi</h1>
      <p class="text-yellow-600">Pantau perkembangan ide inovasi yang sedang diinkubasi</p>
    </div>

    <!-- Statistik Ringkas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-gradient-to-br from-green-200 to-green-400 border-2 border-green-600 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-green-800 animate-bounce">24</h2>
        <p class="text-base text-green-900 font-semibold">Total Ide</p>
      </div>
      <div class="bg-gradient-to-br from-yellow-100 to-yellow-400 border-2 border-yellow-400 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-yellow-700 animate-bounce">10</h2>
        <p class="text-base text-yellow-900 font-semibold">Sedang Proses</p>
      </div>
      <div class="bg-gradient-to-br from-emerald-100 to-emerald-400 border-2 border-emerald-400 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-emerald-700 animate-bounce">5</h2>
        <p class="text-base text-emerald-900 font-semibold">Selesai</p>
      </div>
    </div>

    <!-- Kanban Board Inkubasi -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <div v-for="(col, idx) in columns" :key="idx" class="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <h3 class="font-semibold text-green-700 mb-3">{{ col.title }}</h3>
        <div v-for="card in col.items" :key="card.id" class="bg-white rounded-lg border border-yellow-300 p-3 mb-3 shadow">
          <p class="font-semibold text-green-800">{{ card.nama }}</p>
          <p class="text-xs text-gray-600">{{ card.opd }}</p>
          <div class="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
            <div class="bg-gradient-to-r from-green-400 to-green-700 h-2 rounded-full transition-all duration-700" :style="{ width: card.progress + '%' }"></div>
          </div>
          <p class="text-xs text-right text-green-700 mt-1 font-bold">{{ card.progress }}%</p>
        </div>
      </div>
    </div>

    <!-- Kartu Inkubasi Modern -->
    <div class="bg-white border border-yellow-300 rounded-xl shadow p-6">
      <h3 class="font-semibold text-green-700 mb-6">🚀 Proses Seleksi & Kurasi Ide</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="row in rows" :key="row.id" class="bg-gradient-to-br from-green-50 to-yellow-50 border-2 border-green-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h4 class="font-bold text-green-800 text-lg">{{ row.nama }}</h4>
              <p class="text-sm text-gray-600">{{ row.opd }}</p>
            </div>
            <div class="text-right">
              <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{{ row.mentor }}</span>
            </div>
          </div>
          
          <!-- Status Badge -->
          <div class="mb-4">
            <span :class="[
              'px-3 py-1 rounded-full text-sm font-semibold',
              row.status === 'Ide Baru' ? 'bg-blue-100 text-blue-700' : '',
              row.status === 'Sedang Proses' ? 'bg-yellow-100 text-yellow-700' : '',
              row.status === 'Uji Coba' ? 'bg-purple-100 text-purple-700' : '',
              row.status === 'Selesai' ? 'bg-green-100 text-green-700' : ''
            ]">
              {{ row.status }}
            </span>
          </div>

          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600">Progress</span>
              <span class="text-green-700 font-bold">{{ row.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div class="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-700" :style="{ width: row.progress + '%' }"></div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2">
            <button v-if="row.status === 'Ide Baru'" 
              @click="updateStatus(row, 'Sedang Proses')" 
              class="flex-1 bg-yellow-400 text-yellow-900 px-3 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition text-sm">
              ✅ Seleksi
            </button>
            <button v-if="row.status === 'Sedang Proses'" 
              @click="updateStatus(row, 'Uji Coba')" 
              class="flex-1 bg-purple-400 text-purple-900 px-3 py-2 rounded-lg font-semibold hover:bg-purple-300 transition text-sm">
              🔍 Kurasi
            </button>
            <button v-if="row.status === 'Uji Coba'" 
              @click="updateStatus(row, 'Selesai')" 
              class="flex-1 bg-green-400 text-green-900 px-3 py-2 rounded-lg font-semibold hover:bg-green-300 transition text-sm">
              🎉 Selesaikan
            </button>
            <button v-if="row.status === 'Selesai'" 
              class="flex-1 bg-gray-200 text-gray-600 px-3 py-2 rounded-lg font-semibold text-sm cursor-not-allowed">
              ✨ Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const showForm = ref(false)
const showTimeline = ref(false)
const formSuccess = ref(false)
const form = ref({ nama: '', opd: '', deskripsi: '', kategori: '', kontak: '' })

const submitForm = () => {
  // Simulasi submit form
  formSuccess.value = true
  setTimeout(() => {
    formSuccess.value = false
    showForm.value = false
  }, 2000)
}

const steps = [
  { icon: '💡', title: 'Pendaftaran', desc: 'Daftarkan ide inovasi', active: true },
  { icon: '✅', title: 'Seleksi', desc: 'Verifikasi kelengkapan', active: false },
  { icon: '🔍', title: 'Kurasi', desc: 'Penilaian & validasi', active: false },
  { icon: '🧪', title: 'Uji Coba', desc: 'Pilot project', active: false },
  { icon: '🎉', title: 'Selesai', desc: 'Inkubasi berhasil', active: false }
]

const updateStatus = (row, newStatus) => {
  row.status = newStatus
  // Progress otomatis naik jika status berubah
  if (newStatus === 'Sedang Proses') row.progress = 30
  if (newStatus === 'Uji Coba') row.progress = 70
  if (newStatus === 'Selesai') row.progress = 100
}
// ...existing code...
const columns = [
  {
    title: "💡 Ide Baru",
    items: [
      { id: 1, nama: "Smart Lampu Jalan", opd: "Dinas PU", progress: 10 },
      { id: 2, nama: "Aplikasi Sampah", opd: "DLH", progress: 5 },
    ],
  },
  {
    title: "⚙️ Sedang Proses",
    items: [
      { id: 3, nama: "E-Perizinan", opd: "Dinas PTSP", progress: 40 },
    ],
  },
  {
    title: "🧪 Uji Coba",
    items: [
      { id: 4, nama: "Sistem Absensi Digital", opd: "BKD", progress: 70 },
    ],
  },
  {
    title: "✅ Selesai",
    items: [
      { id: 5, nama: "Cilegon Smart City", opd: "Diskominfo", progress: 100 },
    ],
  },
]

const rows = [
  { id: 1, nama: "Smart Lampu Jalan", opd: "Dinas PU", status: "Ide Baru", progress: 10, mentor: "Budi" },
  { id: 2, nama: "Aplikasi Sampah", opd: "DLH", status: "Ide Baru", progress: 5, mentor: "Siti" },
  { id: 3, nama: "E-Perizinan", opd: "Dinas PTSP", status: "Sedang Proses", progress: 40, mentor: "Rahman" },
  { id: 4, nama: "Sistem Absensi Digital", opd: "BKD", status: "Uji Coba", progress: 70, mentor: "Rina" },
  { id: 5, nama: "Cilegon Smart City", opd: "Diskominfo", status: "Selesai", progress: 100, mentor: "Agus" },
]
</script>
