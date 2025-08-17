<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-yellow-100 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-200/30 to-yellow-200/30 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-200/30 to-green-200/30 rounded-full translate-x-40 translate-y-40 blur-3xl"></div>
    
    <div class="relative z-10 p-6 md:p-8">
      <!-- Header Dashboard -->
      <div class="mb-8 text-center">
        <div class="inline-flex items-center gap-4 mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
            <span class="text-3xl">📊</span>
          </div>
          <div class="text-left">
            <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-800 via-green-700 to-yellow-600 bg-clip-text text-transparent">
              Dashboard DINDA
            </h1>
            <p class="text-xl text-gray-700 font-medium mt-1">Dashboard Inovasi Daerah Kota Cilegon</p>
          </div>
        </div>
        <p class="text-gray-600 text-lg max-w-3xl mx-auto">
          📈 Pantau kinerja dan perkembangan inovasi daerah secara real-time dengan visualisasi data yang komprehensif
        </p>
      </div>

      <!-- Statistik Kinerja Inovasi -->
      <div class="mb-10">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span class="text-white text-lg">📊</span>
          </span>
          Statistik Kinerja Inovasi
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Card Inovasi Terdaftar -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span class="text-white text-xl">💡</span>
              </div>
              <span class="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Total</span>
            </div>
            <h3 class="text-3xl font-bold text-gray-800 mb-1">{{ stats.totalInovasi }}</h3>
            <p class="text-gray-600 font-medium">Inovasi Terdaftar</p>
            <div class="mt-3 flex items-center text-green-600 text-sm font-medium">
              <span class="mr-1">↗️</span>
              <span>+12% dari bulan lalu</span>
            </div>
          </div>

          <!-- Card Inovasi Implementasi -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <span class="text-white text-xl">🚀</span>
              </div>
              <span class="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">Aktif</span>
            </div>
            <h3 class="text-3xl font-bold text-gray-800 mb-1">{{ stats.inovasiImplementasi }}</h3>
            <p class="text-gray-600 font-medium">Sedang Implementasi</p>
            <div class="mt-3 flex items-center text-green-600 text-sm font-medium">
              <span class="mr-1">✅</span>
              <span>{{ Math.round((stats.inovasiImplementasi / stats.totalInovasi) * 100) }}% dari total</span>
            </div>
          </div>

          <!-- Card Inovasi Selesai -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span class="text-white text-xl">🏆</span>
              </div>
              <span class="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">Selesai</span>
            </div>
            <h3 class="text-3xl font-bold text-gray-800 mb-1">{{ stats.inovasiSelesai }}</h3>
            <p class="text-gray-600 font-medium">Inovasi Selesai</p>
            <div class="mt-3 flex items-center text-purple-600 text-sm font-medium">
              <span class="mr-1">🎯</span>
              <span>{{ Math.round((stats.inovasiSelesai / stats.totalInovasi) * 100) }}% success rate</span>
            </div>
          </div>

          <!-- Card OPD Terlibat -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <span class="text-white text-xl">🏢</span>
              </div>
              <span class="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">OPD</span>
            </div>
            <h3 class="text-3xl font-bold text-gray-800 mb-1">{{ stats.opdTerlibat }}</h3>
            <p class="text-gray-600 font-medium">OPD Terlibat</p>
            <div class="mt-3 flex items-center text-orange-600 text-sm font-medium">
              <span class="mr-1">🤝</span>
              <span>Kolaborasi lintas OPD</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Indikator Perkembangan -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <!-- Chart Perkembangan Bulanan -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
          <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span class="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <span class="text-white text-sm">📈</span>
            </span>
            Perkembangan Inovasi per Bulan
          </h3>
          <div class="h-64">
            <div ref="lineChart" class="w-full h-full"></div>
          </div>
        </div>

        <!-- Chart Status Inovasi -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
          <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span class="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span class="text-white text-sm">🎯</span>
            </span>
            Distribusi Status Inovasi
          </h3>
          <div class="h-64">
            <div ref="pieChart" class="w-full h-full"></div>
          </div>
        </div>
      </div>

      <!-- Indikator Kinerja -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 mb-10">
        <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span class="text-white text-lg">🎯</span>
          </span>
          Indikator Kinerja Utama (KPI)
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- KPI 1: Tingkat Adopsi -->
          <div class="text-center">
            <div class="mb-4">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {{ kpi.tingkatAdopsi }}%
              </div>
            </div>
            <h4 class="text-lg font-bold text-gray-800 mb-2">Tingkat Adopsi Inovasi</h4>
            <p class="text-gray-600 text-sm">Persentase inovasi yang berhasil diadopsi oleh masyarakat</p>
            <div class="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-1000" :style="`width: ${kpi.tingkatAdopsi}%`"></div>
            </div>
          </div>

          <!-- KPI 2: Efektivitas -->
          <div class="text-center">
            <div class="mb-4">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {{ kpi.efektivitas }}%
              </div>
            </div>
            <h4 class="text-lg font-bold text-gray-800 mb-2">Efektivitas Program</h4>
            <p class="text-gray-600 text-sm">Tingkat keberhasilan program inovasi dalam mencapai target</p>
            <div class="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-1000" :style="`width: ${kpi.efektivitas}%`"></div>
            </div>
          </div>

          <!-- KPI 3: Kepuasan -->
          <div class="text-center">
            <div class="mb-4">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {{ kpi.kepuasan }}%
              </div>
            </div>
            <h4 class="text-lg font-bold text-gray-800 mb-2">Kepuasan Masyarakat</h4>
            <p class="text-gray-600 text-sm">Tingkat kepuasan masyarakat terhadap inovasi yang diimplementasikan</p>
            <div class="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000" :style="`width: ${kpi.kepuasan}%`"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
        <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span class="text-white text-lg">📋</span>
          </span>
          Aktivitas Terbaru
        </h3>
        
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
            <div :class="`w-12 h-12 rounded-full flex items-center justify-center ${activity.color}`">
              <span class="text-white text-lg">{{ activity.icon }}</span>
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-gray-800">{{ activity.title }}</h4>
              <p class="text-gray-600 text-sm">{{ activity.description }}</p>
              <span class="text-xs text-gray-500">{{ activity.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'

// Refs untuk chart containers
const lineChart = ref(null)
const pieChart = ref(null)

// Data statistik kinerja inovasi
const stats = reactive({
  totalInovasi: 245,
  inovasiImplementasi: 87,
  inovasiSelesai: 142,
  opdTerlibat: 24
})

// Data KPI (Key Performance Indicators)
const kpi = reactive({
  tingkatAdopsi: 78,
  efektivitas: 85,
  kepuasan: 82
})

// Data aktivitas terbaru
const recentActivities = ref([
  {
    id: 1,
    icon: '💡',
    title: 'Inovasi Baru Terdaftar',
    description: 'Sistem Pelayanan Digital Terpadu telah didaftarkan oleh Dinas Komunikasi dan Informatika',
    time: '2 jam yang lalu',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    id: 2,
    icon: '🚀',
    title: 'Implementasi Dimulai',
    description: 'Program Smart Waste Management telah memasuki fase implementasi di 3 kecamatan',
    time: '5 jam yang lalu',
    color: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    id: 3,
    icon: '🏆',
    title: 'Inovasi Selesai',
    description: 'E-Perizinan Online berhasil diselesaikan dengan tingkat kepuasan 92%',
    time: '1 hari yang lalu',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    id: 4,
    icon: '📊',
    title: 'Laporan Evaluasi',
    description: 'Laporan evaluasi bulanan telah diterbitkan dengan 15 inovasi baru tercatat',
    time: '2 hari yang lalu',
    color: 'bg-gradient-to-br from-orange-500 to-orange-600'
  },
  {
    id: 5,
    icon: '🤝',
    title: 'Kolaborasi OPD',
    description: 'Kerjasama baru antara 5 OPD untuk program Digital Village telah disepakati',
    time: '3 hari yang lalu',
    color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
  }
])

// Inisialisasi charts
const initCharts = () => {
  // Line Chart - Perkembangan Inovasi per Bulan
  if (lineChart.value) {
    const lineChartInstance = echarts.init(lineChart.value)
    const lineOption = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e5e7eb',
        textStyle: {
          color: '#374151'
        }
      },
      legend: {
        data: ['Inovasi Terdaftar', 'Implementasi', 'Selesai'],
        textStyle: {
          color: '#6b7280'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu'],
        axisLine: {
          lineStyle: {
            color: '#d1d5db'
          }
        },
        axisTick: {
          lineStyle: {
            color: '#d1d5db'
          }
        },
        axisLabel: {
          color: '#6b7280'
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#d1d5db'
          }
        },
        axisTick: {
          lineStyle: {
            color: '#d1d5db'
          }
        },
        axisLabel: {
          color: '#6b7280'
        },
        splitLine: {
          lineStyle: {
            color: '#f3f4f6'
          }
        }
      },
      series: [
        {
          name: 'Inovasi Terdaftar',
          type: 'line',
          smooth: true,
          data: [12, 18, 25, 32, 28, 35, 42, 38],
          lineStyle: {
            color: '#3b82f6',
            width: 3
          },
          itemStyle: {
            color: '#3b82f6'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
            ])
          }
        },
        {
          name: 'Implementasi',
          type: 'line',
          smooth: true,
          data: [8, 12, 15, 20, 18, 22, 28, 25],
          lineStyle: {
            color: '#10b981',
            width: 3
          },
          itemStyle: {
            color: '#10b981'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.05)' }
            ])
          }
        },
        {
          name: 'Selesai',
          type: 'line',
          smooth: true,
          data: [5, 8, 12, 18, 15, 20, 25, 22],
          lineStyle: {
            color: '#8b5cf6',
            width: 3
          },
          itemStyle: {
            color: '#8b5cf6'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(139, 92, 246, 0.3)' },
              { offset: 1, color: 'rgba(139, 92, 246, 0.05)' }
            ])
          }
        }
      ]
    }
    lineChartInstance.setOption(lineOption)
  }

  // Pie Chart - Distribusi Status Inovasi
  if (pieChart.value) {
    const pieChartInstance = echarts.init(pieChart.value)
    const pieOption = {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e5e7eb',
        textStyle: {
          color: '#374151'
        },
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: '#6b7280'
        }
      },
      series: [
        {
          name: 'Status Inovasi',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['60%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
              color: '#374151'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            {
              value: 16,
              name: 'Perencanaan',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#60a5fa' },
                  { offset: 1, color: '#3b82f6' }
                ])
              }
            },
            {
              value: 87,
              name: 'Implementasi',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#34d399' },
                  { offset: 1, color: '#10b981' }
                ])
              }
            },
            {
              value: 142,
              name: 'Selesai',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#a78bfa' },
                  { offset: 1, color: '#8b5cf6' }
                ])
              }
            }
          ]
        }
      ]
    }
    pieChartInstance.setOption(pieOption)
  }
}

onMounted(() => {
  nextTick(() => {
    initCharts()
  })
})
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #1e40af, #059669, #d97706);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #3b82f6, #10b981);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #2563eb, #059669);
}
</style>
