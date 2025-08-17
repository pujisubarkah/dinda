<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-green-800">📊 Status Inkubasi Inovasi</h1>
      <p class="text-yellow-600 mt-2">Pantau perkembangan dan statistik proses inkubasi inovasi daerah</p>
    </div>

    <!-- Filter & Period -->
    <div class="bg-green-50 p-4 rounded-xl border border-yellow-300 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      <select v-model="selectedPeriod" class="px-3 py-2 border rounded-lg">
        <option value="semua">Semua Periode</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
      </select>
      <select v-model="selectedOPD" class="px-3 py-2 border rounded-lg">
        <option value="semua">Semua OPD</option>
        <option value="Dinas PU">Dinas PU</option>
        <option value="DLH">DLH</option>
        <option value="Diskominfo">Diskominfo</option>
        <option value="BKD">BKD</option>
      </select>
      <select v-model="selectedStatus" class="px-3 py-2 border rounded-lg">
        <option value="semua">Semua Status</option>
        <option value="Ide Baru">Ide Baru</option>
        <option value="Sedang Proses">Sedang Proses</option>
        <option value="Uji Coba">Uji Coba</option>
        <option value="Selesai">Selesai</option>
      </select>
      <button @click="applyFilter" class="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
        Filter Data
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <div class="bg-gradient-to-br from-blue-100 to-blue-300 border-2 border-blue-400 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-blue-800">{{ stats.ideaBaru }}</h2>
        <p class="text-base text-blue-900 font-semibold">💡 Ide Baru</p>
        <p class="text-xs text-blue-700 mt-1">{{ getPercentage('Ide Baru') }}% dari total</p>
      </div>
      <div class="bg-gradient-to-br from-yellow-100 to-yellow-300 border-2 border-yellow-400 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-yellow-800">{{ stats.sedangProses }}</h2>
        <p class="text-base text-yellow-900 font-semibold">⚙️ Sedang Proses</p>
        <p class="text-xs text-yellow-700 mt-1">{{ getPercentage('Sedang Proses') }}% dari total</p>
      </div>
      <div class="bg-gradient-to-br from-purple-100 to-purple-300 border-2 border-purple-400 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-purple-800">{{ stats.ujiCoba }}</h2>
        <p class="text-base text-purple-900 font-semibold">🧪 Uji Coba</p>
        <p class="text-xs text-purple-700 mt-1">{{ getPercentage('Uji Coba') }}% dari total</p>
      </div>
      <div class="bg-gradient-to-br from-green-100 to-green-300 border-2 border-green-400 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-green-800">{{ stats.selesai }}</h2>
        <p class="text-base text-green-900 font-semibold">✅ Selesai</p>
        <p class="text-xs text-green-700 mt-1">{{ getPercentage('Selesai') }}% dari total</p>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
      <!-- Status Distribution Chart -->
      <div class="bg-white border border-yellow-300 rounded-xl shadow p-6">
        <h3 class="font-semibold text-green-700 mb-4">📈 Distribusi Status Inkubasi</h3>
        <div class="h-64" ref="pieChartRef"></div>
      </div>

      <!-- Progress Trend Chart -->
      <div class="bg-white border border-yellow-300 rounded-xl shadow p-6">
        <h3 class="font-semibold text-green-700 mb-4">📊 Tren Progress Bulanan</h3>
        <div class="h-64" ref="lineChartRef"></div>
      </div>
    </div>

    <!-- OPD Performance Table -->
    <div class="bg-white border border-yellow-300 rounded-xl shadow p-6 mb-10">
      <h3 class="font-semibold text-green-700 mb-4">🏢 Performa OPD</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-green-100 text-green-800">
            <tr>
              <th class="px-4 py-3 text-left">OPD</th>
              <th class="px-4 py-3 text-center">Total Ide</th>
              <th class="px-4 py-3 text-center">Ide Baru</th>
              <th class="px-4 py-3 text-center">Sedang Proses</th>
              <th class="px-4 py-3 text-center">Uji Coba</th>
              <th class="px-4 py-3 text-center">Selesai</th>
              <th class="px-4 py-3 text-center">Success Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="opd in opdPerformance" :key="opd.name" class="border-t hover:bg-gray-50">
              <td class="px-4 py-3 font-semibold text-green-800">{{ opd.name }}</td>
              <td class="px-4 py-3 text-center">{{ opd.total }}</td>
              <td class="px-4 py-3 text-center">
                <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">{{ opd.ideaBaru }}</span>
              </td>
              <td class="px-4 py-3 text-center">
                <span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">{{ opd.sedangProses }}</span>
              </td>
              <td class="px-4 py-3 text-center">
                <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">{{ opd.ujiCoba }}</span>
              </td>
              <td class="px-4 py-3 text-center">
                <span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">{{ opd.selesai }}</span>
              </td>
              <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center">
                  <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div class="bg-green-500 h-2 rounded-full" :style="{ width: opd.successRate + '%' }"></div>
                  </div>
                  <span class="text-xs font-bold text-green-700">{{ opd.successRate }}%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Detailed List -->
    <div class="bg-white border border-yellow-300 rounded-xl shadow p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-semibold text-green-700">📋 Daftar Detail Inovasi</h3>
        <button @click="exportData" class="bg-yellow-400 text-green-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
          📊 Export Excel
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-green-100 text-green-800">
            <tr>
              <th class="px-4 py-3 text-left">No</th>
              <th class="px-4 py-3 text-left">Nama Inovasi</th>
              <th class="px-4 py-3 text-left">OPD</th>
              <th class="px-4 py-3 text-center">Status</th>
              <th class="px-4 py-3 text-center">Progress</th>
              <th class="px-4 py-3 text-left">Mentor</th>
              <th class="px-4 py-3 text-center">Tanggal Daftar</th>
              <th class="px-4 py-3 text-center">Target Selesai</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredInovasi" :key="item.id" class="border-t hover:bg-gray-50">
              <td class="px-4 py-3">{{ index + 1 }}</td>
              <td class="px-4 py-3 font-semibold text-green-800">{{ item.nama }}</td>
              <td class="px-4 py-3">{{ item.opd }}</td>
              <td class="px-4 py-3 text-center">
                <span :class="getStatusClass(item.status)" class="px-3 py-1 rounded-full text-xs font-semibold">
                  {{ item.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center">
                  <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div class="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all" :style="{ width: item.progress + '%' }"></div>
                  </div>
                  <span class="text-xs font-bold text-green-700">{{ item.progress }}%</span>
                </div>
              </td>
              <td class="px-4 py-3">{{ item.mentor }}</td>
              <td class="px-4 py-3 text-center text-xs text-gray-600">{{ item.tanggalDaftar }}</td>
              <td class="px-4 py-3 text-center text-xs text-gray-600">{{ item.targetSelesai }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
import { ref, computed, onMounted } from 'vue'

// Reactive filters
const selectedPeriod = ref('semua')
const selectedOPD = ref('semua')
const selectedStatus = ref('semua')

// Sample data
const inovasiData = ref([
  { id: 1, nama: "Smart Lampu Jalan", opd: "Dinas PU", status: "Ide Baru", progress: 10, mentor: "Budi", tanggalDaftar: "2024-01-15", targetSelesai: "2024-06-15" },
  { id: 2, nama: "Aplikasi Sampah Digital", opd: "DLH", status: "Ide Baru", progress: 5, mentor: "Siti", tanggalDaftar: "2024-02-20", targetSelesai: "2024-07-20" },
  { id: 3, nama: "E-Perizinan", opd: "Dinas PTSP", status: "Sedang Proses", progress: 40, mentor: "Rahman", tanggalDaftar: "2023-11-10", targetSelesai: "2024-05-10" },
  { id: 4, nama: "Sistem Absensi Digital", opd: "BKD", status: "Uji Coba", progress: 70, mentor: "Rina", tanggalDaftar: "2023-08-05", targetSelesai: "2024-02-05" },
  { id: 5, nama: "Cilegon Smart City", opd: "Diskominfo", status: "Selesai", progress: 100, mentor: "Agus", tanggalDaftar: "2023-03-01", targetSelesai: "2023-12-01" },
  { id: 6, nama: "Monitoring Air Bersih", opd: "Dinas PU", status: "Sedang Proses", progress: 35, mentor: "Dewi", tanggalDaftar: "2024-01-20", targetSelesai: "2024-08-20" },
  { id: 7, nama: "Portal Layanan Publik", opd: "Diskominfo", status: "Uji Coba", progress: 85, mentor: "Hendra", tanggalDaftar: "2023-09-15", targetSelesai: "2024-04-15" },
  { id: 8, nama: "Sistem Pengaduan Online", opd: "BKD", status: "Selesai", progress: 100, mentor: "Lisa", tanggalDaftar: "2023-05-10", targetSelesai: "2024-01-10" }
])

// Computed properties
const filteredInovasi = computed(() => {
  return inovasiData.value.filter(item => {
    const periodMatch = selectedPeriod.value === 'semua' || item.tanggalDaftar.includes(selectedPeriod.value)
    const opdMatch = selectedOPD.value === 'semua' || item.opd === selectedOPD.value
    const statusMatch = selectedStatus.value === 'semua' || item.status === selectedStatus.value
    return periodMatch && opdMatch && statusMatch
  })
})

const stats = computed(() => {
  const data = filteredInovasi.value
  return {
    ideaBaru: data.filter(item => item.status === 'Ide Baru').length,
    sedangProses: data.filter(item => item.status === 'Sedang Proses').length,
    ujiCoba: data.filter(item => item.status === 'Uji Coba').length,
    selesai: data.filter(item => item.status === 'Selesai').length,
    total: data.length
  }
})

const opdPerformance = computed(() => {
  const opds = ['Dinas PU', 'DLH', 'Dinas PTSP', 'BKD', 'Diskominfo']
  return opds.map(opd => {
    const opdData = inovasiData.value.filter(item => item.opd === opd)
    const total = opdData.length
    const selesai = opdData.filter(item => item.status === 'Selesai').length
    const successRate = total > 0 ? Math.round((selesai / total) * 100) : 0
    
    return {
      name: opd,
      total: total,
      ideaBaru: opdData.filter(item => item.status === 'Ide Baru').length,
      sedangProses: opdData.filter(item => item.status === 'Sedang Proses').length,
      ujiCoba: opdData.filter(item => item.status === 'Uji Coba').length,
      selesai: selesai,
      successRate: successRate
    }
  })
})

// Methods
const getPercentage = (status) => {
  if (stats.value.total === 0) return 0
  const count = stats.value[status.replace(' ', '').toLowerCase()]
  return Math.round((count / stats.value.total) * 100)
}

const getStatusClass = (status) => {
  const classes = {
    'Ide Baru': 'bg-blue-100 text-blue-700',
    'Sedang Proses': 'bg-yellow-100 text-yellow-700',
    'Uji Coba': 'bg-purple-100 text-purple-700',
    'Selesai': 'bg-green-100 text-green-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const applyFilter = () => {
  // Filter is automatically applied through computed properties
  console.log('Filter applied:', { selectedPeriod: selectedPeriod.value, selectedOPD: selectedOPD.value, selectedStatus: selectedStatus.value })
}

const exportData = () => {
  // Simple CSV export simulation
  const csvContent = filteredInovasi.value.map(item => 
    `${item.nama},${item.opd},${item.status},${item.progress}%,${item.mentor},${item.tanggalDaftar},${item.targetSelesai}`
  ).join('\n')
  
  const header = 'Nama Inovasi,OPD,Status,Progress,Mentor,Tanggal Daftar,Target Selesai\n'
  const blob = new Blob([header + csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'statistik_inkubasi_inovasi.csv'
  a.click()
  window.URL.revokeObjectURL(url)
}

// Chart refs
const pieChartRef = ref(null)
const lineChartRef = ref(null)

onMounted(() => {
  // Initialize charts would go here
  console.log('Charts initialized')
})
</script>
