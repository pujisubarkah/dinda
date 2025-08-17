<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-green-800">🚀 Status Inkubasi Inovasi</h1>
      <p class="text-yellow-600 mt-2">Monitor dan kelola status proses inkubasi inovasi secara real-time</p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <div class="bg-gradient-to-br from-blue-100 to-blue-300 border-2 border-blue-400 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-blue-800">{{ stats.total }}</h2>
        <p class="text-base text-blue-900 font-semibold">📝 Total Inovasi</p>
      </div>
      <div class="bg-gradient-to-br from-gray-100 to-gray-300 border-2 border-gray-400 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-gray-800">{{ stats.ideaBaru }}</h2>
        <p class="text-base text-gray-900 font-semibold">💡 Ide Baru</p>
      </div>
      <div class="bg-gradient-to-br from-yellow-100 to-yellow-300 border-2 border-yellow-400 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-yellow-800">{{ stats.sedangProses }}</h2>
        <p class="text-base text-yellow-900 font-semibold">⚙️ Sedang Proses</p>
      </div>
      <div class="bg-gradient-to-br from-purple-100 to-purple-300 border-2 border-purple-400 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-purple-800">{{ stats.ujiCoba }}</h2>
        <p class="text-base text-purple-900 font-semibold">🧪 Uji Coba</p>
      </div>
      <div class="bg-gradient-to-br from-green-100 to-green-300 border-2 border-green-400 rounded-xl p-6 text-center shadow-lg">
        <h2 class="text-3xl font-extrabold text-green-800">{{ stats.selesai }}</h2>
        <p class="text-base text-green-900 font-semibold">✅ Selesai</p>
      </div>
    </div>

    <!-- Filter & Actions -->
    <div class="bg-green-50 p-4 rounded-xl border border-yellow-300 mb-8 flex flex-wrap items-center gap-4">
      <select v-model="selectedStatus" class="px-3 py-2 border rounded-lg">
        <option value="">Semua Status</option>
        <option value="Ide Baru">Ide Baru</option>
        <option value="Sedang Proses">Sedang Proses</option>
        <option value="Uji Coba">Uji Coba</option>
        <option value="Selesai">Selesai</option>
      </select>
      <select v-model="selectedOPD" class="px-3 py-2 border rounded-lg">
        <option value="">Semua OPD</option>
        <option value="Dinas PU">Dinas PU</option>
        <option value="DLH">DLH</option>
        <option value="Diskominfo">Diskominfo</option>
        <option value="BKD">BKD</option>
        <option value="Dinas PTSP">Dinas PTSP</option>
      </select>
      <select v-model="selectedMentor" class="px-3 py-2 border rounded-lg">
        <option value="">Semua Mentor</option>
        <option value="Budi">Budi</option>
        <option value="Siti">Siti</option>
        <option value="Rahman">Rahman</option>
        <option value="Rina">Rina</option>
        <option value="Agus">Agus</option>
      </select>
      <input v-model="searchTerm" type="text" placeholder="Cari inovasi..." class="px-3 py-2 border rounded-lg flex-1 min-w-[200px]" />
      <button @click="refreshData" class="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
        🔄 Refresh
      </button>
    </div>

    <!-- Kanban Board -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <div v-for="(column, status) in kanbanColumns" :key="status" class="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold text-green-700">{{ column.title }}</h3>
          <span class="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">{{ column.items.length }}</span>
        </div>
        
        <div class="space-y-3 min-h-[400px]">
          <div 
            v-for="item in column.items" 
            :key="item.id" 
            class="bg-white rounded-lg border border-yellow-300 p-4 shadow hover:shadow-lg transition cursor-pointer"
            @click="openDetailModal(item)"
          >
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-semibold text-green-800 text-sm">{{ item.nama }}</h4>
              <button @click.stop="openQuickActions(item)" class="text-gray-400 hover:text-gray-600">
                ⋮
              </button>
            </div>
            
            <p class="text-xs text-gray-600 mb-2">{{ item.opd }}</p>
            
            <!-- Progress Bar -->
            <div class="mb-2">
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-600">Progress</span>
                <span class="text-green-700 font-bold">{{ item.progress }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-700" :style="{ width: item.progress + '%' }"></div>
              </div>
            </div>
            
            <!-- Tags & Info -->
            <div class="flex justify-between items-center text-xs">
              <span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{{ item.mentor }}</span>
              <span class="text-gray-500">{{ item.lastUpdate }}</span>
            </div>
            
            <!-- Quick Actions -->
            <div v-if="item.status !== 'Selesai'" class="mt-3 flex gap-2">
              <button 
                v-if="item.status === 'Ide Baru'" 
                @click.stop="updateStatus(item, 'Sedang Proses')"
                class="flex-1 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold hover:bg-yellow-300 transition"
              >
                ✅ Seleksi
              </button>
              <button 
                v-if="item.status === 'Sedang Proses'" 
                @click.stop="updateStatus(item, 'Uji Coba')"
                class="flex-1 bg-purple-400 text-purple-900 px-2 py-1 rounded text-xs font-semibold hover:bg-purple-300 transition"
              >
                🔍 Kurasi
              </button>
              <button 
                v-if="item.status === 'Uji Coba'" 
                @click.stop="updateStatus(item, 'Selesai')"
                class="flex-1 bg-green-400 text-green-900 px-2 py-1 rounded text-xs font-semibold hover:bg-green-300 transition"
              >
                🎉 Selesaikan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Alerts & Notifications -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Overdue Items -->
      <div class="bg-red-50 border border-red-300 rounded-xl p-6">
        <h3 class="font-semibold text-red-700 mb-4">⚠️ Inovasi Terlambat</h3>
        <div class="space-y-3">
          <div v-for="item in overdueItems" :key="item.id" class="bg-white p-3 rounded-lg border border-red-200">
            <div class="flex justify-between items-center">
              <div>
                <h4 class="font-semibold text-red-800">{{ item.nama }}</h4>
                <p class="text-sm text-red-600">{{ item.opd }} • Terlambat {{ item.daysOverdue }} hari</p>
              </div>
              <button @click="sendReminder(item)" class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition">
                📧 Reminder
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Deadlines -->
      <div class="bg-orange-50 border border-orange-300 rounded-xl p-6">
        <h3 class="font-semibold text-orange-700 mb-4">⏰ Deadline Mendekati</h3>
        <div class="space-y-3">
          <div v-for="item in upcomingDeadlines" :key="item.id" class="bg-white p-3 rounded-lg border border-orange-200">
            <div class="flex justify-between items-center">
              <div>
                <h4 class="font-semibold text-orange-800">{{ item.nama }}</h4>
                <p class="text-sm text-orange-600">{{ item.opd }} • Deadline {{ item.daysLeft }} hari lagi</p>
              </div>
              <span class="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {{ item.daysLeft }}d
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activities -->
    <div class="bg-white border border-yellow-300 rounded-xl shadow p-6">
      <h3 class="font-semibold text-green-700 mb-4">📋 Aktivitas Terbaru</h3>
      <div class="space-y-4">
        <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
          <div :class="getActivityIcon(activity.type)" class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {{ activity.type.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1">
            <p class="text-sm text-gray-800">{{ activity.description }}</p>
            <p class="text-xs text-gray-500">{{ activity.timestamp }}</p>
          </div>
          <span :class="getStatusBadge(activity.status)" class="px-2 py-1 rounded-full text-xs font-semibold">
            {{ activity.status }}
          </span>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="showDetailModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-green-700">Detail Inovasi</h2>
          <button @click="showDetailModal = false" class="text-gray-400 hover:text-gray-700 text-xl">&times;</button>
        </div>
        
        <div v-if="selectedItem" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-green-700 mb-1">Nama Inovasi</label>
              <p class="text-gray-800">{{ selectedItem.nama }}</p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-green-700 mb-1">OPD</label>
              <p class="text-gray-800">{{ selectedItem.opd }}</p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-green-700 mb-1">Status</label>
              <span :class="getStatusClass(selectedItem.status)" class="px-3 py-1 rounded-full text-sm font-semibold">
                {{ selectedItem.status }}
              </span>
            </div>
            <div>
              <label class="block text-sm font-semibold text-green-700 mb-1">Progress</label>
              <div class="flex items-center">
                <div class="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div class="bg-green-500 h-2 rounded-full" :style="{ width: selectedItem.progress + '%' }"></div>
                </div>
                <span class="text-sm font-bold text-green-700">{{ selectedItem.progress }}%</span>
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-green-700 mb-1">Mentor</label>
              <p class="text-gray-800">{{ selectedItem.mentor }}</p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-green-700 mb-1">Last Update</label>
              <p class="text-gray-800">{{ selectedItem.lastUpdate }}</p>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-green-700 mb-1">Deskripsi</label>
            <p class="text-gray-800">{{ selectedItem.deskripsi }}</p>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex gap-4 pt-4 border-t">
            <button @click="editItem(selectedItem)" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              ✏️ Edit
            </button>
            <button @click="addNote(selectedItem)" class="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition">
              📝 Add Note
            </button>
            <button @click="viewHistory(selectedItem)" class="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition">
              📊 History
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
import { ref, computed, reactive, onMounted } from 'vue'

// Reactive data
const selectedStatus = ref('')
const selectedOPD = ref('')
const selectedMentor = ref('')
const searchTerm = ref('')
const showDetailModal = ref(false)
const selectedItem = ref(null)

// Sample data
const inovasiData = ref([
  { 
    id: 1, nama: "Smart Lampu Jalan", opd: "Dinas PU", status: "Ide Baru", progress: 10, mentor: "Budi", 
    lastUpdate: "2024-08-15", deskripsi: "Sistem lampu jalan pintar dengan sensor gerak dan hemat energi",
    deadline: "2024-12-31", daysOverdue: 0, daysLeft: 137
  },
  { 
    id: 2, nama: "Aplikasi Sampah Digital", opd: "DLH", status: "Ide Baru", progress: 5, mentor: "Siti", 
    lastUpdate: "2024-08-10", deskripsi: "Platform digital untuk pengelolaan sampah berbasis komunitas",
    deadline: "2024-11-30", daysOverdue: 0, daysLeft: 106
  },
  { 
    id: 3, nama: "E-Perizinan", opd: "Dinas PTSP", status: "Sedang Proses", progress: 40, mentor: "Rahman", 
    lastUpdate: "2024-08-14", deskripsi: "Sistem perizinan online terintegrasi untuk kemudahan masyarakat",
    deadline: "2024-09-30", daysOverdue: 0, daysLeft: 45
  },
  { 
    id: 4, nama: "Sistem Absensi Digital", opd: "BKD", status: "Uji Coba", progress: 70, mentor: "Rina", 
    lastUpdate: "2024-08-16", deskripsi: "Sistem absensi digital dengan teknologi face recognition",
    deadline: "2024-08-20", daysOverdue: 0, daysLeft: 4
  },
  { 
    id: 5, nama: "Cilegon Smart City", opd: "Diskominfo", status: "Selesai", progress: 100, mentor: "Agus", 
    lastUpdate: "2024-08-12", deskripsi: "Platform terintegrasi untuk smart city Cilegon",
    deadline: "2024-08-15", daysOverdue: 0, daysLeft: 0
  },
  { 
    id: 6, nama: "Portal Pengaduan Masyarakat", opd: "BKD", status: "Sedang Proses", progress: 25, mentor: "Lisa", 
    lastUpdate: "2024-07-20", deskripsi: "Portal online untuk pengaduan dan aspirasi masyarakat",
    deadline: "2024-08-10", daysOverdue: 7, daysLeft: 0
  }
])

const recentActivities = ref([
  { id: 1, type: 'update', description: 'Progress Smart Lampu Jalan diperbarui dari 5% menjadi 10%', timestamp: '2 jam lalu', status: 'Ide Baru' },
  { id: 2, type: 'status', description: 'E-Perizinan berubah status dari Ide Baru ke Sedang Proses', timestamp: '5 jam lalu', status: 'Sedang Proses' },
  { id: 3, type: 'note', description: 'Catatan baru ditambahkan untuk Sistem Absensi Digital', timestamp: '1 hari lalu', status: 'Uji Coba' },
  { id: 4, type: 'complete', description: 'Cilegon Smart City telah selesai dan siap implementasi', timestamp: '2 hari lalu', status: 'Selesai' }
])

// Computed properties
const filteredInovasi = computed(() => {
  return inovasiData.value.filter(item => {
    const statusMatch = !selectedStatus.value || item.status === selectedStatus.value
    const opdMatch = !selectedOPD.value || item.opd === selectedOPD.value
    const mentorMatch = !selectedMentor.value || item.mentor === selectedMentor.value
    const searchMatch = !searchTerm.value || item.nama.toLowerCase().includes(searchTerm.value.toLowerCase())
    return statusMatch && opdMatch && mentorMatch && searchMatch
  })
})

const stats = computed(() => {
  const data = filteredInovasi.value
  return {
    total: data.length,
    ideaBaru: data.filter(item => item.status === 'Ide Baru').length,
    sedangProses: data.filter(item => item.status === 'Sedang Proses').length,
    ujiCoba: data.filter(item => item.status === 'Uji Coba').length,
    selesai: data.filter(item => item.status === 'Selesai').length
  }
})

const kanbanColumns = computed(() => {
  return {
    'Ide Baru': {
      title: '💡 Ide Baru',
      items: filteredInovasi.value.filter(item => item.status === 'Ide Baru')
    },
    'Sedang Proses': {
      title: '⚙️ Sedang Proses',
      items: filteredInovasi.value.filter(item => item.status === 'Sedang Proses')
    },
    'Uji Coba': {
      title: '🧪 Uji Coba',
      items: filteredInovasi.value.filter(item => item.status === 'Uji Coba')
    },
    'Selesai': {
      title: '✅ Selesai',
      items: filteredInovasi.value.filter(item => item.status === 'Selesai')
    }
  }
})

const overdueItems = computed(() => {
  return inovasiData.value.filter(item => item.daysOverdue > 0)
})

const upcomingDeadlines = computed(() => {
  return inovasiData.value.filter(item => item.daysLeft > 0 && item.daysLeft <= 7)
})

// Methods
const updateStatus = (item, newStatus) => {
  item.status = newStatus
  if (newStatus === 'Sedang Proses') item.progress = 30
  if (newStatus === 'Uji Coba') item.progress = 70
  if (newStatus === 'Selesai') item.progress = 100
  item.lastUpdate = new Date().toISOString().split('T')[0]
  
  // Add to activities
  recentActivities.value.unshift({
    id: Date.now(),
    type: 'status',
    description: `${item.nama} berubah status menjadi ${newStatus}`,
    timestamp: 'Baru saja',
    status: newStatus
  })
}

const openDetailModal = (item) => {
  selectedItem.value = item
  showDetailModal.value = true
}

const openQuickActions = (item) => {
  // Implement quick actions menu
  console.log('Quick actions for:', item.nama)
}

const refreshData = () => {
  // Simulate data refresh
  console.log('Data refreshed')
}

const sendReminder = (item) => {
  alert(`Reminder sent for ${item.nama}`)
}

const editItem = (item) => {
  alert(`Edit ${item.nama}`)
}

const addNote = (item) => {
  alert(`Add note for ${item.nama}`)
}

const viewHistory = (item) => {
  alert(`View history for ${item.nama}`)
}

const getStatusClass = (status) => {
  const classes = {
    'Ide Baru': 'bg-gray-100 text-gray-700',
    'Sedang Proses': 'bg-yellow-100 text-yellow-700',
    'Uji Coba': 'bg-purple-100 text-purple-700',
    'Selesai': 'bg-green-100 text-green-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const getStatusBadge = (status) => {
  const classes = {
    'Ide Baru': 'bg-gray-100 text-gray-700',
    'Sedang Proses': 'bg-yellow-100 text-yellow-700',
    'Uji Coba': 'bg-purple-100 text-purple-700',
    'Selesai': 'bg-green-100 text-green-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const getActivityIcon = (type) => {
  const icons = {
    'update': 'bg-blue-500',
    'status': 'bg-green-500',
    'note': 'bg-yellow-500',
    'complete': 'bg-purple-500'
  }
  return icons[type] || 'bg-gray-500'
}

onMounted(() => {
  console.log('Status Inkubasi page loaded')
})
</script>
