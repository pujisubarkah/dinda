<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-yellow-100 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-200/30 to-yellow-200/30 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-200/30 to-green-200/30 rounded-full translate-x-40 translate-y-40 blur-3xl"></div>
    
    <!-- Sidebar Forum -->
    <sidebar_forum class="shrink-0 relative z-10" />
    
    <!-- Konten Form Pertanyaan -->
    <div class="flex-1 flex items-center justify-center p-4 md:p-8 relative z-10">
      <div class="w-full max-w-3xl">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <span class="text-2xl">❓</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-800 via-yellow-700 to-green-600 bg-clip-text text-transparent">
              Forum Pertanyaan
            </h1>
          </div>
          <p class="text-gray-700 text-lg font-medium">
            💬 Ajukan pertanyaan dan dapatkan bantuan dari tim DINDA
          </p>
        </div>

        <!-- Form Container -->
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-100/50 via-yellow-100/50 to-green-100/50 rounded-3xl blur-xl"></div>
          <div class="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <h4 class="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  📝 Form Pertanyaan
                </h4>
                <span class="text-base text-gray-600 font-medium">Sampaikan pertanyaan Anda dengan jelas dan detail</span>
              </div>
              <button type="button" class="btn btn-outline btn-warning hover:btn-warning hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-semibold rounded-xl border-2" @click="showBantuan = true">
                <span><svg viewBox="64 64 896 896" width="20" height="20" fill="currentColor"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 708c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm62.9-219.5a48.3 48.3 0 00-30.9 44.8V620c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-21.5c0-23.1 6.7-45.9 19.9-64.9 12.9-18.6 30.9-32.8 52.1-40.9 34-13.1 56-41.6 56-72.7 0-44.1-43.1-80-96-80s-96 35.9-96 80v7.6c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V420c0-39.3 17.2-76 48.4-103.3C430.4 290.4 470 276 512 276s81.6 14.5 111.6 40.7C654.8 344 672 380.7 672 420c0 57.8-38.1 109.8-97.1 132.5z"></path></svg></span>
                <span>💡 Bantuan & Contoh</span>
              </button>
            </div>
            <form class="space-y-8" @submit.prevent="handleSubmit">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                  <label class="flex items-center gap-2 text-base font-bold mb-3 text-gray-800">
                    <span>📝</span> Judul Pertanyaan
                  </label>
                  <input v-model="judul" type="text" placeholder="Masukkan judul pertanyaan yang jelas dan spesifik..." class="input input-bordered w-full rounded-xl text-base border-2 border-gray-200 focus:border-orange-400 bg-white/90 p-4 shadow-md transition-all duration-200" />
                </div>
                <div>
                  <label class="flex items-center gap-2 text-base font-bold mb-3 text-gray-800">
                    <span>🏷️</span> Kategori Pertanyaan <span class="text-red-500">*</span>
                  </label>
                  <select v-model="kategori" class="select select-bordered w-full rounded-xl text-base border-2 border-gray-200 focus:border-orange-400 bg-white/90 p-4 shadow-md">
                    <option value="" disabled>Pilih kategori pertanyaan</option>
                    <option value="inovasi">💡 Inovasi Daerah</option>
                    <option value="teknis">⚙️ Teknis & IT</option>
                    <option value="administrasi">📋 Administrasi</option>
                    <option value="umum">💬 Umum</option>
                  </select>
                  <div class="text-sm text-gray-500 mt-2 font-medium">Kategori membantu tim memberikan jawaban yang tepat</div>
                </div>
                <div>
                  <label class="flex items-center gap-2 text-base font-bold mb-3 text-gray-800">
                    <span>🎯</span> Prioritas
                  </label>
                  <select v-model="prioritas" class="select select-bordered w-full rounded-xl text-base border-2 border-gray-200 focus:border-orange-400 bg-white/90 p-4 shadow-md">
                    <option value="rendah">🟢 Rendah</option>
                    <option value="sedang" selected>🟡 Sedang</option>
                    <option value="tinggi">🔴 Tinggi</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="flex items-center gap-2 text-base font-bold mb-3 text-gray-800">
                  <span>📄</span> Detail Pertanyaan
                </label>
                <textarea v-model="deskripsi" rows="8" placeholder="Jelaskan pertanyaan Anda secara detail:&#10;- Apa yang sedang Anda coba lakukan?&#10;- Masalah apa yang Anda hadapi?&#10;- Langkah apa yang sudah Anda coba?&#10;- Informasi tambahan yang relevan" class="textarea textarea-bordered w-full rounded-xl text-base border-2 border-gray-200 focus:border-orange-400 bg-white/90 p-4 shadow-md resize-none"></textarea>
              </div>
              <div class="bg-orange-50/50 rounded-2xl p-6 border border-orange-200">
                <label class="flex items-start gap-3 text-base cursor-pointer">
                  <input type="checkbox" v-model="setuju" class="checkbox checkbox-warning mt-1 scale-125" />
                  <span class="text-gray-700">
                    Saya menyetujui 
                    <a href="#" class="text-orange-600 underline font-semibold hover:text-orange-700 transition-colors" @click.prevent="showAturan = true">aturan pengajuan pertanyaan</a>
                    dan memahami bahwa pertanyaan ini mungkin akan dijawab secara publik untuk membantu pengguna lain.
                  </span>
                </label>
              </div>
              <div class="flex justify-center">
                <button type="submit" class="btn btn-warning hover:btn-warning text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" :disabled="!setuju || !kategori">
                  <span class="flex items-center gap-3">
                    <span>🚀</span>
                    <span>Kirim Pertanyaan</span>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      <!-- Modal Aturan Pengajuan Pertanyaan -->
      <div v-if="showAturan" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-lg w-full mx-4 relative border border-white/50">
          <div class="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-t-3xl p-6">
            <h3 class="text-2xl font-bold text-white flex items-center gap-3">
              <span>📋</span> Aturan Pengajuan Pertanyaan
            </h3>
          </div>
          <div class="p-8">
            <ul class="space-y-4 text-gray-700 text-base mb-6">
              <li class="flex items-start gap-3">
                <span class="text-green-500 font-bold">✓</span>
                <span>Pertanyaan Anda mungkin akan dijawab secara publik untuk membantu pengguna lain.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-green-500 font-bold">✓</span>
                <span>Hindari membagikan informasi pribadi atau sensitif dalam pertanyaan.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-green-500 font-bold">✓</span>
                <span>Gunakan bahasa yang sopan dan profesional.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-green-500 font-bold">✓</span>
                <span>Berikan detail yang cukup agar tim dapat membantu dengan efektif.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-red-500 font-bold">✗</span>
                <span>Dilarang menggunakan layanan untuk tujuan yang merugikan pihak lain.</span>
              </li>
            </ul>
            <p class="text-sm text-gray-500 mb-6 p-4 bg-gray-50 rounded-xl">
              💡 <strong>Tips:</strong> Semakin detail pertanyaan Anda, semakin cepat dan tepat bantuan yang bisa kami berikan.
            </p>
            <div class="flex gap-3">
              <button @click="showAturan = false" class="btn btn-outline btn-warning flex-1 rounded-xl">Tutup</button>
              <button @click="showAturan = false; setuju = true" class="btn btn-warning flex-1 rounded-xl text-white">Setuju & Lanjutkan</button>
            </div>
          </div>
          <button @click="showAturan = false" class="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold">×</button>
        </div>
      </div>
      
      <!-- Modal Bantuan -->
      <div v-if="showBantuan" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-2xl w-full mx-4 relative border border-white/50 max-h-[90vh] overflow-y-auto">
          <div class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-3xl p-6">
            <h3 class="text-2xl font-bold text-white flex items-center gap-3">
              <span>💡</span> Bantuan & Contoh Pertanyaan
            </h3>
          </div>
          <div class="p-8">
            <div class="mb-6">
              <h4 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🎯</span> Contoh Pertanyaan yang Baik:
              </h4>
              
              <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                <div class="mb-4">
                  <span class="font-bold text-gray-800 flex items-center gap-2 mb-2">
                    <span>📝</span> Judul:
                  </span>
                  <div class="bg-white rounded-xl px-4 py-3 border border-green-300 text-gray-800 font-medium">
                    "Kesulitan Mengakses Dashboard Inovasi DINDA Setelah Update"
                  </div>
                </div>
                
                <div class="mb-4">
                  <span class="font-bold text-gray-800 flex items-center gap-2 mb-2">
                    <span>🏷️</span> Kategori:
                  </span>
                  <span class="badge badge-success gap-2 text-white">⚙️ Teknis & IT</span>
                </div>
                
                <div>
                  <span class="font-bold text-gray-800 flex items-center gap-2 mb-2">
                    <span>📄</span> Detail:
                  </span>
                  <div class="bg-white rounded-xl px-4 py-3 border border-green-300 text-gray-700 whitespace-pre-line">
Saya adalah pegawai di Dinas Inovasi Kota Cilegon yang biasanya menggunakan dashboard DINDA untuk memantau progress inovasi daerah.

Masalah yang dialami:
- Setelah update sistem kemarin, saya tidak bisa login ke dashboard
- Muncul pesan error "Session expired" meskipun baru saja memasukkan kredensial
- Sudah mencoba reset password tapi masih sama

Yang sudah saya coba:
- Clear cache browser (Chrome & Firefox)
- Reset password melalui email
- Coba akses dari komputer lain

Butuh bantuan untuk mengatasi masalah ini karena ada laporan inovasi yang harus diselesaikan minggu ini.
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-yellow-50 rounded-2xl p-6 border border-yellow-200 mb-6">
              <h4 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span>💡</span> Tips Pertanyaan Efektif:
              </h4>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start gap-2">
                  <span class="text-blue-500">•</span>
                  <span>Gunakan judul yang spesifik dan deskriptif</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-500">•</span>
                  <span>Jelaskan konteks dan latar belakang masalah</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-500">•</span>
                  <span>Sebutkan langkah yang sudah dicoba</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-500">•</span>
                  <span>Berikan informasi teknis jika relevan (browser, OS, dll)</span>
                </li>
              </ul>
            </div>
            
            <div class="flex gap-3">
              <button @click="showBantuan = false" class="btn btn-outline btn-primary flex-1 rounded-xl">Tutup</button>
              <button @click="showBantuan = false" class="btn btn-primary flex-1 rounded-xl text-white">Mulai Bertanya</button>
            </div>
          </div>
          <button @click="showBantuan = false" class="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold">×</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import sidebar_forum from '~/components/sidebar_forum.vue'

const judul = ref('')
const kategori = ref('')
const prioritas = ref('sedang')
const deskripsi = ref('')
const setuju = ref(false)
const showAturan = ref(false)
const showBantuan = ref(false)

function handleSubmit() {
  if (!setuju.value || !kategori.value) return
  
  // TODO: Kirim data ke backend
  const data = {
    judul: judul.value,
    kategori: kategori.value,
    prioritas: prioritas.value,
    deskripsi: deskripsi.value
  }
  
  console.log('Data pertanyaan:', data)
  alert('🎉 Pertanyaan berhasil dikirim! Tim DINDA akan segera merespons.')
  
  // Reset form
  judul.value = ''
  kategori.value = ''
  prioritas.value = 'sedang'
  deskripsi.value = ''
  setuju.value = false
}
</script>
