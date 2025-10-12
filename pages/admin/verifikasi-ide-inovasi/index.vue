<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Verifikasi Usulan Inovasi</h1>
      <div class="bg-white rounded-lg shadow overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stakeholder</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penerima Manfaat</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pengusul</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OPD</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in usulanList" :key="item.id" class="hover:bg-gray-50">
              <td class="px-4 py-3 font-semibold text-gray-900">{{ item.ideInovasi }}</td>
              <td class="px-4 py-3 text-gray-600 line-clamp-2">{{ item.deskripsiSingkat }}</td>
              <td class="px-4 py-3">{{ item.stakeholderInovasi }}</td>
              <td class="px-4 py-3">{{ item.penerimaManfaat }}</td>
              <td class="px-4 py-3">{{ item.creatorName }}</td>
              <td class="px-4 py-3">{{ item.creatorOpd }}</td>
              <td class="px-4 py-3">{{ formatDate(item.createdAt) }}</td>
              <td class="px-4 py-3">
                <span v-if="verifikasiKomentar[item.id]" class="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  {{ verifikasiKomentar[item.id] }}
                </span>
                <span v-else class="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">Belum Diperiksa</span>
              </td>
              <td class="px-4 py-3 flex gap-2">
                <button @click="openModal(item)" class="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full" title="Verifikasi/Komentar">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>

      <!-- Modal Verifikasi/Komentar -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 relative animate-fade-in max-h-[90vh] overflow-y-auto">
          <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div class="px-6 py-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-t-2xl">
            <h2 class="text-xl font-semibold text-white">Verifikasi/Komentar Usulan</h2>
          </div>
          <form @submit.prevent="submitVerifikasi" class="p-6 space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Komentar</label>
              <textarea v-model="verifikasiKomentar" rows="4" placeholder="Tulis komentar/verifikasi di sini..." class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status Verifikasi</label>
              <select v-model="statusVerifikasi" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                <option :value="true">Setujui</option>
                <option :value="false">Tolak</option>
              </select>
            </div>
            <div class="flex justify-end space-x-4 pt-6 border-t">
              <button type="button" @click="closeModal" class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">Batal</button>
              <button type="submit" class="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-md hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors font-semibold shadow-lg">Kirim</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
const toast = useToast()

const usulanList = ref([])
const showModal = ref(false)
const selectedUsulan = ref(null)
const verifikasiKomentar = ref('')
const statusVerifikasi = ref(true)

const fetchUsulan = async () => {
  try {
    const response = await $fetch('/api/ide-inovasi')
    if (response.success) {
      usulanList.value = response.data
      // Setelah dapat usulan, ambil status verifikasi dari API komentar
      const komentarMap = {}
      for (const usulan of response.data) {
        try {
          const komentarRes = await $fetch(`/api/ide_inovasi_comments?ide_inovasi_id=${usulan.id}&limit=1`)
          if (komentarRes.success && komentarRes.data.length > 0) {
            komentarMap[usulan.id] = komentarRes.data[0].content
          } else {
            komentarMap[usulan.id] = null
          }
        } catch {
          komentarMap[usulan.id] = null
        }
      }
      verifikasiKomentar.value = komentarMap
    } else {
      usulanList.value = []
      verifikasiStatus.value = {}
    }
  } catch (error) {
    toast.error('Gagal memuat data usulan inovasi')
    usulanList.value = []
    verifikasiStatus.value = {}
  }
}

onMounted(() => {
  fetchUsulan()
})

const openModal = (item) => {
  selectedUsulan.value = item
  verifikasiKomentar.value = ''
  statusVerifikasi.value = true
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedUsulan.value = null
  verifikasiKomentar.value = ''
}

const submitVerifikasi = async () => {
  try {
    const token = localStorage.getItem('dinda_token')
    const userRes = await $fetch('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } })
    if (!userRes.success || !userRes.data?.user) throw new Error('User tidak ditemukan')
    await $fetch('/api/ide_inovasi_comments', {
      method: 'POST',
      body: {
        ide_inovasi_id: selectedUsulan.value.id,
        user_id: userRes.data.user.id,
        content: verifikasiKomentar.value,
        is_approved: statusVerifikasi.value
      }
    })
    toast.success('Verifikasi/Komentar berhasil dikirim!')
    closeModal()
    fetchUsulan()
  } catch (error) {
    toast.error('Gagal mengirim verifikasi/komentar')
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
