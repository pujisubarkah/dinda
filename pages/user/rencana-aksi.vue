<template>
  <div class="max-w-7xl mx-auto py-10 px-4">
  <h1 class="text-3xl font-bold mb-6 text-green-800">Rencana Inovasi</h1>

    <div v-if="loading" class="text-center py-10 text-lg text-gray-500">Loading data...</div>
    <div v-else-if="error" class="text-center py-10 text-red-500">{{ error }}</div>

    <div v-else>
      <div class="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table class="min-w-full border border-green-200 text-sm">
          <thead>
            <tr class="bg-green-700 text-white text-center">
              <th class="border px-3 py-2 w-1/12">No</th>
              <th class="border px-3 py-2 w-1/12">Tahap</th>
              <th class="border px-3 py-2 w-2/12">Kegiatan</th>
              <th class="border px-3 py-2 w-2/12">Pelaksana</th>
              <th class="border px-3 py-2 w-2/12">Output</th>
              <th class="border px-3 py-2 w-2/12">Metode</th>
              <th class="border px-3 py-2 w-1/12">Rencana Waktu</th>
              <th class="border px-3 py-2 w-2/12">Timeline</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, idx) in data"
              :key="item.id"
              class="hover:bg-green-50 transition"
            >
              <td class="border px-3 py-2 text-center align-top font-semibold">{{ idx + 1 }}</td>
              <td class="border px-3 py-2 text-center align-top font-semibold text-green-800">
                {{ item.tahap }}
              </td>
              <td class="border px-3 py-2">{{ item.judulAksi }}</td>
              <td class="border px-3 py-2">{{ item.picPelaksana }}</td>
              <td class="border px-3 py-2">{{ item.indikatorKeberhasilan || '-' }}</td>
              <td class="border px-3 py-2">{{ item.deskripsiAksi || '-' }}</td>
              <td class="border px-3 py-2 text-center">
                <span v-if="item.periodeMulai && item.periodeSelesai">
                  {{ formatDate(item.periodeMulai) }} - {{ formatDate(item.periodeSelesai) }}
                </span>
                <span v-else class="text-gray-400">Belum ditentukan</span>
              </td>
              <td class="border px-3 py-2">
                <div class="flex items-center gap-2">
                  <div class="flex-1 bg-gray-100 rounded-full h-3">
                    <div
                      class="h-3 rounded-full transition-all duration-500"
                      :class="timelineColor(item.progressPercentage)"
                      :style="{ width: (item.progressPercentage || 0) + '%' }"
                    ></div>
                  </div>
                  <span class="text-xs font-semibold text-green-700">
                    {{ item.progressPercentage || 0 }}%
                  </span>
                </div>
              </td>
            </tr>

            <tr v-if="data.length === 0">
              <td colspan="8" class="text-center py-8 text-gray-400">
                Belum ada rencana inovasi.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({ layout: 'user' })

const data = ref([])
const loading = ref(true)
const error = ref('')

function formatDate(val) {
  if (!val) return '-'
  return new Date(val).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
}

function timelineColor(percent) {
  if (percent >= 80) return 'bg-green-500'
  if (percent >= 50) return 'bg-yellow-400'
  if (percent > 0) return 'bg-red-400'
  return 'bg-gray-300'
}

onMounted(async () => {
  try {
    const res = await $fetch('/api/rencana_aksi')
    if (res.success) {
      data.value = res.data
    } else {
      error.value = res.error || 'Gagal memuat data'
    }
  } catch (e) {
    error.value = e.message || 'Terjadi kesalahan'
  } finally {
    loading.value = false
  }

  try {
    const userStr = localStorage.getItem('id');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      if (userObj && userObj.id) {
        payload.createdBy = userObj.id;
      }
    }
  } catch (e) {
    // Jika gagal parsing, biarkan createdBy kosong
  }
})

console.log('Payload sebelum submit:', payload);
</script>

<style scoped>
table {
  font-size: 0.95rem;
}
th,
td {
  white-space: nowrap;
}
</style>
