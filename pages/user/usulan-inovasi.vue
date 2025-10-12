<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Usulan Inovasi</h1>
          <p class="mt-2 text-gray-600">Daftar usulan inovasi yang telah Anda ajukan</p>
        </div>
        <button @click="showModal = true" class="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-md hover:from-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors font-semibold shadow-lg">
          + Input Usulan Inovasi
        </button>
      </div>

      <!-- Table Usulan Inovasi -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-600">
          <h2 class="text-xl font-semibold text-white">Daftar Usulan Inovasi</h2>
        </div>
        <div v-if="loading" class="p-8 text-center">
          <div class="inline-flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-gray-600">Memuat data...</span>
          </div>
        </div>
        <div v-else-if="usulanList.length === 0" class="p-8 text-center text-gray-500">
          <div class="text-6xl mb-4">📝</div>
          <p class="text-lg font-medium">Belum ada usulan inovasi</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stakeholder</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penerima Manfaat</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Diajukan</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="usulan in usulanList" :key="usulan.id" class="hover:bg-gray-50">
                <td class="px-4 py-3 font-semibold text-gray-900">{{ usulan.ideInovasi || 'Tanpa Judul' }}</td>
                <td class="px-4 py-3 text-gray-600 line-clamp-2">{{ usulan.deskripsiSingkat || 'Tidak ada deskripsi' }}</td>
                <td class="px-4 py-3">{{ usulan.stakeholderInovasi || '-' }}</td>
                <td class="px-4 py-3">{{ usulan.penerimaManfaat || '-' }}</td>
                <td class="px-4 py-3">{{ formatDate(usulan.createdAt) }}</td>
                <td class="px-4 py-3">
                  <template v-if="komentarMap[usulan.id]">
                    <div class="mb-1 text-gray-600 line-clamp-2">{{ komentarMap[usulan.id].content }}</div>
                    <div v-if="komentarMap[usulan.id].isApproved === true" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700 mr-2">
                      Disetujui
                    </div>
                    <div v-else class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-700 mr-2">
                      Menunggu Review
                    </div>
                    <button v-if="komentarMap[usulan.id].isApproved === true" @click="openLanjutModal(usulan)" class="ml-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs font-semibold transition-colors">
                      LANJUT RENCANA AKSI
                    </button>
                  </template>
                  <template v-else>
                    <div class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-700">
                      Menunggu Review
                    </div>
                  </template>
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center space-x-2">
                    <button 
                      @click="editUsulan(usulan)" 
                      class="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Edit Usulan"
                    >
                      <Pencil class="w-4 h-4" />
                    </button>
                    <button 
                      @click="deleteUsulan(usulan.id)" 
                      class="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Hapus Usulan"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal Form Usulan Inovasi -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 relative animate-fade-in max-h-[90vh] overflow-y-auto">
          <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div class="px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-t-2xl">
            <h2 class="text-xl font-semibold text-white">{{ isEditing ? 'Edit Usulan Inovasi' : 'Form Usulan Inovasi' }}</h2>
          </div>
          <form @submit.prevent="submitForm" class="p-6 space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Latar Belakang <span class="text-red-500">*</span></label>
              <textarea v-model="form.latarBelakang" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Ide Inovasi <span class="text-red-500">*</span></label>
              <textarea v-model="form.ideInovasi" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Stakeholder Inovasi <span class="text-red-500">*</span></label>
              <textarea v-model="form.stakeholderInovasi" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sumber Daya <span class="text-red-500">*</span></label>
              <textarea v-model="form.sumberDaya" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Penerima Manfaat <span class="text-red-500">*</span></label>
              <textarea v-model="form.penerimaManfaat" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi Singkat <span class="text-red-500">*</span></label>
              <textarea v-model="form.deskripsiSingkat" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Keterangan Tambahan</label>
              <textarea v-model="form.keterangan" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Kebaruan/Inovasi</label>
              <textarea v-model="form.kebaruan" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"></textarea>
            </div>
            <div class="flex justify-end space-x-4 pt-6 border-t">
              <button type="button" @click="resetForm" class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">Reset</button>
              <button type="submit" :disabled="isSubmitting" class="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-md hover:from-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <span v-if="isSubmitting" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isEditing ? 'Mengupdate...' : 'Mengirim...' }}
                </span>
                <span v-else>{{ isEditing ? 'Update Usulan' : 'Ajukan Usulan' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal Rencana Aksi -->
      <div v-if="showLanjutModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 relative animate-fade-in max-h-[90vh] overflow-y-auto">
          <button @click="closeLanjutModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <RencanaAksi
            :picPelaksana="lanjutData?.picPelaksana || lanjutData?.pic_pelaksana"
            :ideInovasiId="lanjutData?.id"
            @close="closeLanjutModal"
            @submitted="handleRencanaAksiSubmitted"
          />
        </div>
      </div>

      <!-- Download PDF Button -->
      <div class="mt-8">
        <button @click="downloadPDF" class="inline-flex items-center gap-2 px-4 py-2 bg-white text-teal-700 font-semibold rounded-md shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">
          <svg xmlns='http://www.w3.org/2000/svg' class='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3'/></svg>
          Download PDF
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import RencanaAksi from '~/components/rencana_aksi.vue'
const komentarMap = ref({})
definePageMeta({ layout: 'user' })
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { Pencil, Trash2 } from 'lucide-vue-next'
const toast = useToast()

const showModal = ref(false)
const showLanjutModal = ref(false)
const lanjutData = ref(null)
const loading = ref(true)
const usulanList = ref([])
const isEditing = ref(false)
const editingId = ref(null)
const form = ref({
  latarBelakang: '',
  ideInovasi: '',
  stakeholderInovasi: '',
  sumberDaya: '',
  penerimaManfaat: '',
  deskripsiSingkat: '',
  keterangan: '',
  kebaruan: ''
})

const openLanjutModal = (row) => {
  lanjutData.value = row
  showLanjutModal.value = true
}

const closeLanjutModal = () => {
  showLanjutModal.value = false
  lanjutData.value = null
}

const handleRencanaAksiSubmitted = () => {
  closeLanjutModal()
  fetchUsulanData()
  toast.success('Rencana aksi berhasil disimpan!')
}
const isSubmitting = ref(false)

const fetchUsulanData = async () => {
  try {
    loading.value = true
    const token = localStorage.getItem('dinda_token')
    const userRes = await $fetch('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } })
    if (!userRes.success || !userRes.data?.user) throw new Error('User tidak ditemukan')
    const response = await $fetch(`/api/ide-inovasi/user/${userRes.data.user.id}`)
    if (response.success) {
      usulanList.value = response.data
      // Fetch komentar terbaru untuk setiap usulan
      const map = {}
      await Promise.all(response.data.map(async (usulan) => {
        try {
          const komentarRes = await $fetch(`/api/ide_inovasi_comments?ide_inovasi_id=${usulan.id}&limit=1`)
          if (komentarRes.success && komentarRes.data.length > 0) {
            map[usulan.id] = komentarRes.data[0]
          } else {
            map[usulan.id] = null
          }
        } catch {
          map[usulan.id] = null
        }
      }))
      komentarMap.value = map
    }
  } catch (error) {
    toast.error('Gagal memuat data usulan inovasi')
    usulanList.value = []
    komentarMap.value = {}
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsulanData()
})

const submitForm = async () => {
  if (isSubmitting.value) return
  // Validate required fields
  const requiredFields = ['latarBelakang', 'ideInovasi', 'stakeholderInovasi', 'sumberDaya', 'penerimaManfaat', 'deskripsiSingkat']
  const missingFields = requiredFields.filter(field => !form.value[field].trim())
  if (missingFields.length > 0) {
    toast.error('Harap lengkapi semua field yang wajib diisi')
    return
  }
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('dinda_token')
    const userRes = await $fetch('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } })
    if (!userRes.success || !userRes.data?.user) throw new Error('User tidak ditemukan')
    
    if (isEditing.value && editingId.value) {
      // Update existing usulan
      const response = await $fetch(`/api/ide-inovasi/${editingId.value}`, {
        method: 'PUT',
        body: {
          latar_belakang: form.value.latarBelakang,
          ide_inovasi: form.value.ideInovasi,
          stakeholder_inovasi: form.value.stakeholderInovasi,
          sumber_daya: form.value.sumberDaya,
          penerima_manfaat: form.value.penerimaManfaat,
          deskripsi_singkat: form.value.deskripsiSingkat,
          keterangan: form.value.keterangan,
          kebaruan: form.value.kebaruan
        }
      })
      if (response.success) {
        toast.success('Usulan inovasi berhasil diupdate!')
        showModal.value = false
        resetForm()
        await fetchUsulanData()
      } else {
        toast.error('Gagal mengupdate usulan inovasi')
      }
    } else {
      // Create new usulan
      const response = await $fetch('/api/ide-inovasi', {
        method: 'POST',
        body: {
          latar_belakang: form.value.latarBelakang,
          ide_inovasi: form.value.ideInovasi,
          stakeholder_inovasi: form.value.stakeholderInovasi,
          sumber_daya: form.value.sumberDaya,
          penerima_manfaat: form.value.penerimaManfaat,
          deskripsi_singkat: form.value.deskripsiSingkat,
          keterangan: form.value.keterangan,
          kebaruan: form.value.kebaruan,
          created_by: userRes.data.user.id
        }
      })
      if (response.success) {
        toast.success('Anda telah berhasil mengajukan ide inovasi!')
        showModal.value = false
        resetForm()
        await fetchUsulanData()
      } else {
        toast.error('Gagal mengajukan usulan inovasi')
      }
    }
  } catch (error) {
    toast.error('Terjadi kesalahan saat mengajukan usulan')
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}

const editUsulan = (usulan) => {
  isEditing.value = true
  editingId.value = usulan.id
  form.value = {
    latarBelakang: usulan.latarBelakang || '',
    ideInovasi: usulan.ideInovasi || '',
    stakeholderInovasi: usulan.stakeholderInovasi || '',
    sumberDaya: usulan.sumberDaya || '',
    penerimaManfaat: usulan.penerimaManfaat || '',
    deskripsiSingkat: usulan.deskripsiSingkat || '',
    keterangan: usulan.keterangan || '',
    kebaruan: usulan.kebaruan || ''
  }
  showModal.value = true
}

const deleteUsulan = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus usulan ini?')) {
    return
  }

  try {
    const response = await $fetch(`/api/ide-inovasi/${id}`, {
      method: 'DELETE'
    })
    if (response.success) {
      toast.success('Usulan inovasi berhasil dihapus!')
      await fetchUsulanData()
    } else {
      toast.error('Gagal menghapus usulan inovasi')
    }
  } catch (error) {
    toast.error('Terjadi kesalahan saat menghapus usulan')
    console.error(error)
  }
}

const resetForm = () => {
  form.value = {
    latarBelakang: '',
    ideInovasi: '',
    stakeholderInovasi: '',
    sumberDaya: '',
    penerimaManfaat: '',
    deskripsiSingkat: '',
    keterangan: '',
    kebaruan: ''
  }
  isEditing.value = false
  editingId.value = null
}

const closeModal = () => {
  showModal.value = false
  resetForm()
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

const downloadPDF = async () => {
  const jsPDF = (await import('jspdf')).default
  const autoTable = (await import('jspdf-autotable')).default
  const doc = new jsPDF()
  const columns = [
    { header: 'Judul', dataKey: 'judul' },
    { header: 'Status', dataKey: 'status' },
    { header: 'Deskripsi', dataKey: 'deskripsi' },
    { header: 'Stakeholder', dataKey: 'stakeholder' },
    { header: 'Penerima Manfaat', dataKey: 'penerimaManfaat' },
    { header: 'Tanggal Diajukan', dataKey: 'tanggal' },
    { header: 'Keterangan', dataKey: 'keterangan' }
  ]
  const rows = usulanList.value.map(u => ({
    judul: u.ideInovasi || 'Tanpa Judul',
    status: u.status || 'Dalam Review',
    deskripsi: u.deskripsiSingkat || '-',
    stakeholder: u.stakeholderInovasi || '-',
    penerimaManfaat: u.penerimaManfaat || '-',
    tanggal: formatDate(u.createdAt),
    keterangan: u.keterangan || '-'
  }))
  autoTable(doc, {
    head: [columns.map(col => col.header)],
    body: rows.map(row => columns.map(col => row[col.dataKey])),
    styles: { font: 'helvetica', fontSize: 10 },
    headStyles: { fillColor: [13, 148, 136] },
    margin: { top: 20 }
  })
  doc.save('usulan-inovasi.pdf')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Apply Poppins font to all text */
* {
  font-family: 'Poppins', sans-serif;
}

/* Additional styling if needed */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>