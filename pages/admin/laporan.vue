<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8 bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
        <h1 class="text-4xl font-bold text-green-800 mb-2">📋 Laporan Inovasi Daerah</h1>
        <p class="text-yellow-600 text-lg">Generate dan kelola laporan komprehensif inovasi daerah</p>
      </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <button @click="generateQuickReport('monthly')" class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 text-left">
        <div class="text-3xl mb-3">📊</div>
        <h3 class="font-bold text-lg">Laporan Bulanan</h3>
        <p class="text-sm opacity-90">Ringkasan bulan ini</p>
      </button>
      <button @click="generateQuickReport('quarterly')" class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 text-left">
        <div class="text-3xl mb-3">📈</div>
        <h3 class="font-bold text-lg">Laporan Triwulan</h3>
        <p class="text-sm opacity-90">Data 3 bulan terakhir</p>
      </button>
      <button @click="generateQuickReport('yearly')" class="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 text-left">
        <div class="text-3xl mb-3">📅</div>
        <h3 class="font-bold text-lg">Laporan Tahunan</h3>
        <p class="text-sm opacity-90">Summary tahun ini</p>
      </button>
      <button @click="showCustomReport = true" class="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 text-left">
        <div class="text-3xl mb-3">⚙️</div>
        <h3 class="font-bold text-lg">Custom Report</h3>
        <p class="text-sm opacity-90">Laporan kustom</p>
      </button>
    </div>

    <!-- Report Generator -->
    <div class="bg-white rounded-xl shadow-lg p-8 mb-8 border border-green-200">
      <div class="flex items-center mb-6">
        <div class="bg-green-100 p-3 rounded-lg mr-4">
          <span class="text-2xl">🔧</span>
        </div>
        <h3 class="text-2xl font-bold text-green-700">Generator Laporan</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label class="block text-sm font-bold text-green-800 mb-2">Periode Laporan</label>
          <select v-model="reportConfig.period" class="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white">
            <option value="week">Mingguan</option>
            <option value="month">Bulanan</option>
            <option value="quarter">Triwulan</option>
            <option value="year">Tahunan</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-bold text-green-800 mb-2">Format Export</label>
          <select v-model="reportConfig.format" class="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white">
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="word">Word</option>
            <option value="html">HTML</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-bold text-green-800 mb-2">Template</label>
          <select v-model="reportConfig.template" class="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white">
            <option value="executive">Executive Summary</option>
            <option value="detailed">Detailed Report</option>
            <option value="statistical">Statistical Analysis</option>
            <option value="presentation">Presentation</option>
          </select>
        </div>
      </div>
      
      <!-- Custom Date Range -->
      <div v-if="reportConfig.period === 'custom'" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-semibold text-green-700 mb-1">Tanggal Mulai</label>
          <input v-model="reportConfig.startDate" type="date" class="w-full px-3 py-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-sm font-semibold text-green-700 mb-1">Tanggal Akhir</label>
          <input v-model="reportConfig.endDate" type="date" class="w-full px-3 py-2 border rounded-lg">
        </div>
      </div>

      <!-- Content Sections -->
      <div class="mb-4">
        <label class="block text-sm font-semibold text-green-700 mb-2">Konten Laporan</label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <label class="flex items-center space-x-2">
            <input v-model="reportConfig.sections.summary" type="checkbox" class="text-green-600">
            <span class="text-sm">Executive Summary</span>
          </label>
          <label class="flex items-center space-x-2">
            <input v-model="reportConfig.sections.statistics" type="checkbox" class="text-green-600">
            <span class="text-sm">Statistik</span>
          </label>
          <label class="flex items-center space-x-2">
            <input v-model="reportConfig.sections.charts" type="checkbox" class="text-green-600">
            <span class="text-sm">Charts & Grafik</span>
          </label>
          <label class="flex items-center space-x-2">
            <input v-model="reportConfig.sections.table" type="checkbox" class="text-green-600">
            <span class="text-sm">Tabel Data</span>
          </label>
          <label class="flex items-center space-x-2">
            <input v-model="reportConfig.sections.opd" type="checkbox" class="text-green-600">
            <span class="text-sm">Performa OPD</span>
          </label>
          <label class="flex items-center space-x-2">
            <input v-model="reportConfig.sections.trends" type="checkbox" class="text-green-600">
            <span class="text-sm">Tren Analysis</span>
          </label>
          <label class="flex items-center space-x-2">
            <input v-model="reportConfig.sections.recommendations" type="checkbox" class="text-green-600">
            <span class="text-sm">Rekomendasi</span>
          </label>
          <label class="flex items-center space-x-2">
            <input v-model="reportConfig.sections.appendix" type="checkbox" class="text-green-600">
            <span class="text-sm">Appendix</span>
          </label>
        </div>
      </div>

      <div class="flex gap-4 pt-4">
        <button @click="generateReport" class="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg">
          🔄 Generate Laporan
        </button>
        <button @click="previewReport" class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg">
          👁️ Preview
        </button>
        <button @click="saveTemplate" class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-lg font-bold hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg">
          💾 Save Template
        </button>
      </div>
    </div>

    <!-- Recent Reports -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Generated Reports History -->
      <div class="bg-white border border-yellow-300 rounded-xl shadow p-6">
        <h3 class="font-semibold text-green-700 mb-4">📚 Riwayat Laporan</h3>
        <div class="space-y-3">
          <div v-for="report in recentReports" :key="report.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div class="flex items-center space-x-3">
              <div :class="getReportIcon(report.type)" class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold">
                {{ report.type.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h4 class="font-semibold text-green-800">{{ report.title }}</h4>
                <p class="text-sm text-gray-600">{{ report.date }} • {{ report.format.toUpperCase() }}</p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button @click="downloadReport(report)" class="text-green-600 hover:text-green-800 text-sm">
                📥 Download
              </button>
              <button @click="shareReport(report)" class="text-blue-600 hover:text-blue-800 text-sm">
                🔗 Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Scheduled Reports -->
      <div class="bg-white border border-yellow-300 rounded-xl shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold text-green-700">⏰ Laporan Terjadwal</h3>
          <button @click="showScheduleModal = true" class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition">
            + Jadwal Baru
          </button>
        </div>
        <div class="space-y-3">
          <div v-for="schedule in scheduledReports" :key="schedule.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 class="font-semibold text-green-800">{{ schedule.name }}</h4>
              <p class="text-sm text-gray-600">{{ schedule.frequency }} • Next: {{ schedule.nextRun }}</p>
            </div>
            <div class="flex space-x-2">
              <button @click="toggleSchedule(schedule)" :class="schedule.active ? 'text-green-600' : 'text-gray-400'" class="text-sm">
                {{ schedule.active ? '⏸️ Pause' : '▶️ Resume' }}
              </button>
              <button @click="editSchedule(schedule)" class="text-blue-600 hover:text-blue-800 text-sm">
                ✏️ Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics Overview -->
    <div class="bg-white rounded-xl shadow-lg p-8 border border-green-200">
      <div class="flex items-center mb-6">
        <div class="bg-green-100 p-3 rounded-lg mr-4">
          <span class="text-2xl">📊</span>
        </div>
        <h3 class="text-2xl font-bold text-green-700">Overview Laporan</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
          <div class="text-4xl font-bold text-green-800 mb-2">{{ reportStats.total }}</div>
          <div class="text-sm text-green-600 font-semibold">Total Laporan</div>
        </div>
        <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
          <div class="text-4xl font-bold text-blue-800 mb-2">{{ reportStats.thisMonth }}</div>
          <div class="text-sm text-blue-600 font-semibold">Bulan Ini</div>
        </div>
        <div class="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
          <div class="text-4xl font-bold text-purple-800 mb-2">{{ reportStats.scheduled }}</div>
          <div class="text-sm text-purple-600 font-semibold">Terjadwal</div>
        </div>
        <div class="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
          <div class="text-4xl font-bold text-orange-800 mb-2">{{ reportStats.shared }}</div>
          <div class="text-sm text-orange-600 font-semibold">Dibagikan</div>
        </div>
      </div>
    </div>

    <!-- Loading Modal -->
    <div v-if="isGenerating" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-xl p-8 text-center">
        <div class="animate-spin w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <h3 class="text-lg font-semibold text-green-700">Generating Report...</h3>
        <p class="text-gray-600">{{ generatingProgress }}%</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
import { ref, reactive } from 'vue'

// Reactive data
const showCustomReport = ref(false)
const showScheduleModal = ref(false)
const isGenerating = ref(false)
const generatingProgress = ref(0)

const reportConfig = reactive({
  period: 'month',
  format: 'pdf',
  template: 'executive',
  startDate: '',
  endDate: '',
  sections: {
    summary: true,
    statistics: true,
    charts: true,
    table: true,
    opd: true,
    trends: false,
    recommendations: true,
    appendix: false
  }
})

const recentReports = ref([
  { id: 1, title: 'Laporan Bulanan Juli 2024', type: 'monthly', date: '2024-07-31', format: 'pdf' },
  { id: 2, title: 'Analisis Triwulan Q2 2024', type: 'quarterly', date: '2024-06-30', format: 'excel' },
  { id: 3, title: 'Summary Inovasi Juni 2024', type: 'monthly', date: '2024-06-30', format: 'pdf' },
  { id: 4, title: 'Laporan Tahunan 2023', type: 'yearly', date: '2023-12-31', format: 'word' },
])

const scheduledReports = ref([
  { id: 1, name: 'Laporan Bulanan', frequency: 'Monthly', nextRun: '2024-08-31', active: true },
  { id: 2, name: 'Summary Mingguan', frequency: 'Weekly', nextRun: '2024-08-25', active: true },
  { id: 3, name: 'Analisis Triwulan', frequency: 'Quarterly', nextRun: '2024-09-30', active: false },
])

const reportStats = ref({
  total: 156,
  thisMonth: 12,
  scheduled: 8,
  shared: 24
})

// Methods
const generateQuickReport = (type) => {
  isGenerating.value = true
  generatingProgress.value = 0
  
  // Simulate report generation
  const interval = setInterval(() => {
    generatingProgress.value += 10
    if (generatingProgress.value >= 100) {
      clearInterval(interval)
      isGenerating.value = false
      generatingProgress.value = 0
      
      // Add to recent reports
      const newReport = {
        id: Date.now(),
        title: `Laporan ${type} - ${new Date().toLocaleDateString()}`,
        type: type,
        date: new Date().toLocaleDateString(),
        format: 'pdf'
      }
      recentReports.value.unshift(newReport)
      
      alert(`Laporan ${type} berhasil di-generate!`)
    }
  }, 200)
}

const generateReport = () => {
  isGenerating.value = true
  generatingProgress.value = 0
  
  // Simulate custom report generation
  const interval = setInterval(() => {
    generatingProgress.value += 15
    if (generatingProgress.value >= 100) {
      clearInterval(interval)
      isGenerating.value = false
      generatingProgress.value = 0
      alert('Laporan custom berhasil di-generate!')
    }
  }, 300)
}

const previewReport = () => {
  alert('Preview laporan akan ditampilkan di tab baru')
}

const saveTemplate = () => {
  alert('Template laporan berhasil disimpan!')
}

const getReportIcon = (type) => {
  const icons = {
    monthly: 'bg-blue-500',
    quarterly: 'bg-purple-500',
    yearly: 'bg-green-500',
    custom: 'bg-orange-500'
  }
  return icons[type] || 'bg-gray-500'
}

const downloadReport = (report) => {
  alert(`Downloading ${report.title}...`)
}

const shareReport = (report) => {
  alert(`Sharing ${report.title}...`)
}

const toggleSchedule = (schedule) => {
  schedule.active = !schedule.active
  alert(`Schedule ${schedule.active ? 'resumed' : 'paused'}`)
}

const editSchedule = (schedule) => {
  alert(`Editing schedule: ${schedule.name}`)
}
</script>
