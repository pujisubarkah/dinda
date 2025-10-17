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

    <!-- Custom Report Modal -->
    <div v-if="showCustomReport" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold">Custom Report</h3>
          <button @click="showCustomReport = false" class="text-gray-500">✖</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium mb-1">Periode</label>
            <select v-model="reportConfig.period" class="w-full px-3 py-2 border rounded">
              <option value="week">Mingguan</option>
              <option value="month">Bulanan</option>
              <option value="quarter">Triwulan</option>
              <option value="year">Tahunan</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Format Export</label>
            <select v-model="reportConfig.format" class="w-full px-3 py-2 border rounded">
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="word">Word</option>
              <option value="html">HTML</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Template</label>
            <select v-model="reportConfig.template" class="w-full px-3 py-2 border rounded">
              <option value="executive">Executive Summary</option>
              <option value="detailed">Detailed Report</option>
              <option value="statistical">Statistical Analysis</option>
              <option value="presentation">Presentation</option>
            </select>
          </div>
          <div v-if="reportConfig.period === 'custom'">
            <label class="block text-sm font-medium mb-1">Tanggal Mulai</label>
            <input v-model="reportConfig.startDate" type="date" class="w-full px-3 py-2 border rounded" />
            <label class="block text-sm font-medium mb-1 mt-2">Tanggal Akhir</label>
            <input v-model="reportConfig.endDate" type="date" class="w-full px-3 py-2 border rounded" />
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Sections</label>
          <div class="grid grid-cols-2 gap-2">
            <label class="flex items-center"><input type="checkbox" v-model="reportConfig.sections.summary" class="mr-2" /> Executive Summary</label>
            <label class="flex items-center"><input type="checkbox" v-model="reportConfig.sections.statistics" class="mr-2" /> Statistik</label>
            <label class="flex items-center"><input type="checkbox" v-model="reportConfig.sections.charts" class="mr-2" /> Charts</label>
            <label class="flex items-center"><input type="checkbox" v-model="reportConfig.sections.table" class="mr-2" /> Tabel Data</label>
            <label class="flex items-center"><input type="checkbox" v-model="reportConfig.sections.opd" class="mr-2" /> Performa OPD</label>
            <label class="flex items-center"><input type="checkbox" v-model="reportConfig.sections.trends" class="mr-2" /> Tren</label>
            <label class="flex items-center"><input type="checkbox" v-model="reportConfig.sections.recommendations" class="mr-2" /> Rekomendasi</label>
            <label class="flex items-center"><input type="checkbox" v-model="reportConfig.sections.appendix" class="mr-2" /> Appendix</label>
          </div>
        </div>

        <div class="flex justify-end gap-3">
          <button @click="showCustomReport = false" class="px-4 py-2 border rounded">Batal</button>
          <button @click="previewReport(true)" class="px-4 py-2 bg-blue-600 text-white rounded">Preview</button>
          <button @click="generateReport(true)" class="px-4 py-2 bg-green-600 text-white rounded">Generate & Download</button>
          <button @click="saveTemplate(true)" class="px-4 py-2 bg-yellow-500 text-white rounded">Save Template</button>
        </div>
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
const generateQuickReport = async (type) => {
  // map quick action to period
  const map = { monthly: 'month', quarterly: 'quarter', yearly: 'year', weekly: 'week' }
  reportConfig.period = map[type] || 'month'
  // Prefer Excel for quick exports
  reportConfig.format = 'excel'
  try {
    await generateReport()
    recentReports.value.unshift({ id: Date.now(), title: `Laporan ${type} - ${new Date().toLocaleDateString()}`, type, date: new Date().toLocaleDateString(), format: reportConfig.format })
  } catch (err) {
    console.error('generateQuickReport error', err)
    alert('Gagal membuat laporan cepat')
  }
}

// helper: compute start/end for given period
const getRangeFromPeriod = (period) => {
  const now = new Date()
  let start, end
  switch (period) {
    case 'week': {
      const day = now.getDay() || 7
      start = new Date(now)
      start.setDate(now.getDate() - day + 1)
      start.setHours(0,0,0,0)
      end = new Date(start)
      end.setDate(start.getDate() + 6)
      end.setHours(23,59,59,999)
      break
    }
    case 'month': {
      start = new Date(now.getFullYear(), now.getMonth(), 1)
      end = new Date(now.getFullYear(), now.getMonth()+1, 0)
      end.setHours(23,59,59,999)
      break
    }
    case 'quarter': {
      const q = Math.floor(now.getMonth()/3)
      start = new Date(now.getFullYear(), q*3, 1)
      end = new Date(now.getFullYear(), q*3 + 3, 0)
      end.setHours(23,59,59,999)
      break
    }
    case 'year': {
      start = new Date(now.getFullYear(), 0, 1)
      end = new Date(now.getFullYear(), 11, 31)
      end.setHours(23,59,59,999)
      break
    }
    default:
      if (reportConfig.startDate && reportConfig.endDate) {
        start = new Date(reportConfig.startDate); start.setHours(0,0,0,0)
        end = new Date(reportConfig.endDate); end.setHours(23,59,59,999)
      } else {
        start = new Date(now.getFullYear(), now.getMonth(), 1)
        end = new Date(now.getFullYear(), now.getMonth()+1, 0); end.setHours(23,59,59,999)
      }
  }
  return { start, end }
}

const fetchInovasiForRange = async (start, end) => {
  try {
    const res = await $fetch('/api/inovasi')
    const items = (res && res.success && Array.isArray(res.data)) ? res.data : (Array.isArray(res) ? res : [])
    return items.filter(i => {
      // Prefer explicit createdAt/created_at/date; fall back to tahun (as Jan 1st of that year)
      let d = null
      if (i.createdAt || i.created_at || i.date) {
        d = new Date(i.createdAt || i.created_at || i.date)
      } else if (i.tahun) {
        // tahun might be string like "2024" — use start of year as fallback
        const y = String(i.tahun).slice(0,4)
        d = new Date(`${y}-01-01T00:00:00`)
      }
      if (!d || isNaN(d.getTime())) {
        // if we can't determine date, try to match by tahun range when possible
        if (i.tahun) {
          const y = parseInt(String(i.tahun).slice(0,4))
          return y >= start.getFullYear() && y <= end.getFullYear()
        }
        return false
      }
      return d >= start && d <= end
    })
  } catch (err) {
    console.error('fetchInovasiForRange error', err)
    return []
  }
}

const generateReport = async (fromModal = false) => {
  if (reportConfig.period === 'custom') {
    if (!reportConfig.startDate || !reportConfig.endDate) { alert('Silakan isi tanggal untuk periode custom'); return }
    if (new Date(reportConfig.startDate) > new Date(reportConfig.endDate)) { alert('Tanggal mulai tidak boleh setelah tanggal akhir'); return }
  }

  isGenerating.value = true
  generatingProgress.value = 5
  try {
    const { start, end } = getRangeFromPeriod(reportConfig.period)
    generatingProgress.value = 15
    const data = await fetchInovasiForRange(start, end)
    generatingProgress.value = 50

    // Map `/api/inovasi` shape to report columns
    const header = ['ID', 'Judul Inovasi', 'Deskripsi', 'Tahun', 'Inovator', 'Inovator ID', 'Kecamatan ID', 'Provinsi ID', 'Alamat', 'LongLat', 'SDGs Tujuan', 'SDGs Nama', 'ThumbUrl', 'VideoUrl', 'Tanggal Sumber']
    const rows = data.map(i => {
      // determine a best-effort date for display
      let itemDate = null
      if (i.createdAt || i.created_at || i.date) itemDate = new Date(i.createdAt || i.created_at || i.date)
      else if (i.tahun) itemDate = new Date(String(i.tahun).slice(0,4) + '-01-01T00:00:00')
      const tanggalSumber = (itemDate && !isNaN(itemDate.getTime())) ? itemDate.toLocaleDateString('id-ID') : (i.tahun || '')

      return [
        i.id ?? '',
        i.judulInovasi ?? i.title ?? '',
        i.deskripsi ?? i.deskripsiSingkat ?? i.description ?? '',
        i.tahun ?? '',
        i.inovator ?? i.creatorName ?? i.creator ?? '',
        i.inovatorId ?? '',
        (i.inovatorData && i.inovatorData.idKecamatan) || (i.inovatorData && i.inovatorData.id_kecamatan) || '',
        (i.inovatorData && i.inovatorData.idProvinsi) || (i.inovatorData && i.inovatorData.id_provinsi) || '',
        (i.inovatorData && i.inovatorData.alamat) || '',
        (i.inovatorData && i.inovatorData.longlat) || '',
        (i.sdgsData && (i.sdgsData.tujuanKe ?? i.sdgs)) || i.sdgs || '',
        (i.sdgsData && i.sdgsData.sdgs) || '',
        i.thumbUrl || '',
        i.videoUrl || '',
        tanggalSumber
      ]
    })

    if (reportConfig.format === 'excel') {
      try {
        const mod = await import('xlsx')
        const XLSX = mod?.default || mod
        const ws = XLSX.utils.aoa_to_sheet([header, ...rows])
        ws['!cols'] = header.map((h, idx) => ({ wch: Math.min(Math.max((rows.reduce((m, r) => Math.max(m, String(r[idx] || '').length), h.length)), 10), 60) }))
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Laporan')
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const blob = new Blob([wbout], { type: 'application/octet-stream' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `laporan-inovasi-${reportConfig.period}-${(new Date()).toISOString().slice(0,10)}.xlsx`
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
        generatingProgress.value = 100
        toast && toast.success && toast.success('Excel berhasil diunduh')
      } catch (err) {
        console.error('Excel export failed', err)
        // CSV fallback
        const csvRows = [header, ...rows].map(r => r.map(cell => {
          const s = String(cell || '')
          if (s.includes(',') || s.includes('"') || s.includes('\n')) return '"' + s.replace(/"/g, '""') + '"'
          return s
        }).join(','))
        const csvContent = csvRows.join('\n')
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `laporan-inovasi-${reportConfig.period}.csv`
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
        toast && toast.success && toast.success('CSV berhasil diunduh sebagai fallback')
      }
    } else if (reportConfig.format === 'pdf') {
      // open preview window and attempt html2pdf
      const previewHtml = buildPreviewHtml(header, rows)
      const newWin = window.open('', '_blank')
      newWin.document.write(previewHtml)
      newWin.document.close()
      const mod = await import('html2pdf.js').catch(() => null)
      if (mod) {
        try { await mod.default().from(newWin.document.body).save() } catch(e){ console.warn('html2pdf failed', e) }
      } else {
        alert('Preview terbuka; gunakan Print -> Save as PDF untuk menyimpan')
      }
    } else {
      // html or unsupported -> preview
      const previewHtml = buildPreviewHtml(header, rows)
      const newWin = window.open('', '_blank')
      newWin.document.write(previewHtml)
      newWin.document.close()
    }
  } catch (err) {
    console.error('generateReport error', err)
    alert('Gagal meng-generate laporan')
  } finally {
    isGenerating.value = false
    generatingProgress.value = 0
  }
}

const buildPreviewHtml = (header, rows) => {
  const styles = `<style>body{font-family:Arial,Helvetica,sans-serif;padding:20px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:8px}th{background:#f3f4f6}</style>`
  const headerRow = '<tr>' + header.map(h => `<th>${h}</th>`).join('') + '</tr>'
  const bodyRows = rows.map(r => '<tr>' + r.map(c => `<td>${escapeHtml(String(c||''))}</td>`).join('') + '</tr>').join('')
  return `<!doctype html><html><head><meta charset="utf-8"><title>Preview Laporan</title>${styles}</head><body><h2>Laporan Inovasi</h2><p>Periode: ${reportConfig.period} ${reportConfig.period === 'custom' ? '(' + reportConfig.startDate + ' - ' + reportConfig.endDate + ')' : ''}</p><table>${headerRow}${bodyRows}</table></body></html>`
}

const previewReport = async (fromModal = false) => {
  try {
    const { start, end } = getRangeFromPeriod(reportConfig.period)
    const data = await fetchInovasiForRange(start, end)
    // Same mapping for preview
    const header = ['ID', 'Judul Inovasi', 'Deskripsi', 'Tahun', 'Inovator', 'Inovator ID', 'Kecamatan ID', 'Provinsi ID', 'Alamat', 'LongLat', 'SDGs Tujuan', 'SDGs Nama', 'ThumbUrl', 'VideoUrl', 'Tanggal Sumber']
    const rows = data.map(i => {
      let itemDate = null
      if (i.createdAt || i.created_at || i.date) itemDate = new Date(i.createdAt || i.created_at || i.date)
      else if (i.tahun) itemDate = new Date(String(i.tahun).slice(0,4) + '-01-01T00:00:00')
      const tanggalSumber = (itemDate && !isNaN(itemDate.getTime())) ? itemDate.toLocaleDateString('id-ID') : (i.tahun || '')
      return [
        i.id ?? '',
        i.judulInovasi ?? i.title ?? '',
        i.deskripsi ?? i.deskripsiSingkat ?? i.description ?? '',
        i.tahun ?? '',
        i.inovator ?? i.creatorName ?? i.creator ?? '',
        i.inovatorId ?? '',
        (i.inovatorData && i.inovatorData.idKecamatan) || (i.inovatorData && i.inovatorData.id_kecamatan) || '',
        (i.inovatorData && i.inovatorData.idProvinsi) || (i.inovatorData && i.inovatorData.id_provinsi) || '',
        (i.inovatorData && i.inovatorData.alamat) || '',
        (i.inovatorData && i.inovatorData.longlat) || '',
        (i.sdgsData && (i.sdgsData.tujuanKe ?? i.sdgs)) || i.sdgs || '',
        (i.sdgsData && i.sdgsData.sdgs) || '',
        i.thumbUrl || '',
        i.videoUrl || '',
        tanggalSumber
      ]
    })
    const html = buildPreviewHtml(header, rows)
    const w = window.open('', '_blank')
    if (!w) { alert('Pop-up diblokir, aktifkan pop-up untuk preview'); return }
    w.document.write(html)
    w.document.close()
  } catch (err) {
    console.error('previewReport failed', err)
    alert('Gagal membuat preview')
  }
}

const saveTemplate = (fromModal = false) => {
  try {
    const templates = JSON.parse(localStorage.getItem('report_templates') || '[]')
    templates.unshift({ id: Date.now(), name: `Template ${new Date().toLocaleString()}`, config: JSON.parse(JSON.stringify(reportConfig)) })
    localStorage.setItem('report_templates', JSON.stringify(templates.slice(0, 20)))
    alert('Template laporan berhasil disimpan!')
  } catch (err) {
    console.error('saveTemplate error', err)
    alert('Gagal menyimpan template')
  }
}

// small helper to escape HTML for preview
function escapeHtml(s) {
  return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
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

const downloadReport = async (report) => {
  try {
    if (report.url) { window.open(report.url, '_blank'); return }
    const map = { monthly: 'month', quarterly: 'quarter', yearly: 'year' }
    reportConfig.period = map[report.type] || 'month'
    reportConfig.format = report.format || 'excel'
    await generateReport()
  } catch (err) {
    console.error('downloadReport failed', err)
    alert('Gagal mendownload report')
  }
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
