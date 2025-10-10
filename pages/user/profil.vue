<template>
  <div class="max-w-4xl mx-auto px-6 py-10">
    <h1 class="text-3xl font-bold text-green-800 mb-8">Profil Pengguna</h1>
    
    <div class="bg-white rounded-xl shadow-lg p-8">
      <div class="flex items-center mb-8">
        <div class="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mr-8">
          <svg class="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-gray-800">{{ profil.nama }}</h2>
          <p class="text-gray-600">{{ profil.jabatan }}</p>
          <p class="text-gray-600">{{ profil.instansi }}</p>
        </div>
      </div>

      <form class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
            <input v-model="profil.nama" type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input v-model="profil.email" type="email" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
            <input v-model="profil.telepon" type="tel" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">NIP</label>
            <input v-model="profil.nip" type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Jabatan</label>
            <input v-model="profil.jabatan" type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Instansi</label>
            <input v-model="profil.instansi" type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
          <textarea v-model="profil.alamat" rows="3" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Bio/Deskripsi</label>
          <textarea v-model="profil.bio" rows="4" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
        </div>

        <div class="flex justify-end space-x-4">
          <button type="button" class="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition">
            Batal
          </button>
          <button type="submit" class="bg-yellow-400 text-green-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const profil = ref({
  nama: "Ahmad Hidayat",
  email: "ahmad.hidayat@cilegon.go.id",
  telepon: "081234567890",
  nip: "198501012010011001",
  jabatan: "Staff Ahli Inovasi",
  instansi: "Dinas Komunikasi dan Informatika Kota Cilegon",
  alamat: "Jl. Raya Merak-Tirtayasa No.11, Cilegon",
  bio: "Berpengalaman dalam bidang teknologi informasi dan inovasi daerah selama 10 tahun. Fokus pada pengembangan sistem informasi untuk pelayanan publik dan smart city."
})
</script>