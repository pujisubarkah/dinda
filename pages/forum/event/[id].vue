<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gray-50">
    <!-- Sidebar Forum -->
    <sidebar_forum class="shrink-0" />
    <!-- Konten Detail Webinar -->
    <div class="flex-1">
      <div class="max-w-6xl mx-auto py-8 px-2 md:px-8">
        <!-- Tombol Back -->
        <NuxtLink to="/forum/event" class="inline-flex items-center gap-2 mb-6 text-orange-600 hover:underline font-semibold">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L4.414 8H17a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z" clip-rule="evenodd"/></svg>
          Kembali ke Daftar Event
        </NuxtLink>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="flex flex-col items-center gap-4">
            <div class="loading loading-spinner loading-lg text-green-600"></div>
            <p class="text-gray-600 font-medium">Memuat detail webinar...</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="flex justify-center items-center py-20">
          <div class="alert alert-error shadow-lg max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 class="font-bold">Error!</h3>
              <div class="text-xs">{{ error }}</div>
            </div>
            <button @click="fetchWebinarEvent" class="btn btn-sm btn-outline">
              Coba Lagi
            </button>
          </div>
        </div>

        <!-- Content -->
        <div v-else-if="webinar" class="flex flex-col md:flex-row gap-6">
          <!-- Konten Utama -->
          <div class="w-full md:w-2/3">
            <div class="card card-bordered shadow bg-white">
              <!-- Event Image -->
              <figure v-if="webinar.imageUrl" class="px-6 pt-6">
                <img :src="webinar.imageUrl" :alt="webinar.title" class="rounded-xl object-cover w-full h-64" />
              </figure>
              
              <div class="card-body">
                <h1 class="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{{ webinar.title }}</h1>
                
                <!-- Event Code -->
                <div v-if="webinar.kodeEvent" class="mb-4">
                  <span class="badge badge-outline badge-lg">Kode: {{ webinar.kodeEvent }}</span>
                </div>
                
                <div class="divider"></div>
                
                <!-- Description -->
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold text-gray-700">Deskripsi Event</h3>
                  <div class="prose max-w-none">
                    <p class="text-gray-600 leading-relaxed">
                      {{ webinar.description || 'Deskripsi tidak tersedia' }}
                    </p>
                  </div>
                  
                  <!-- Platform & Link -->
                  <div v-if="webinar.platform || webinar.meetingLink" class="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 class="font-semibold text-blue-800 mb-2">Platform & Akses</h4>
                    <div class="space-y-2">
                      <p v-if="webinar.platform" class="text-sm text-blue-700">
                        <strong>Platform:</strong> {{ webinar.platform }}
                      </p>
                      <div v-if="webinar.meetingLink" class="flex items-center gap-2">
                        <strong class="text-sm text-blue-700">Link Meeting:</strong>
                        <a :href="webinar.meetingLink" target="_blank" class="btn btn-sm btn-primary">
                          Bergabung
                        </a>
                      </div>
                    </div>
                  </div>

                  <!-- Speaker & Organizer -->
                  <div v-if="webinar.speaker || webinar.organizer" class="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 class="font-semibold text-green-800 mb-2">Penyelenggara</h4>
                    <div class="space-y-2">
                      <p v-if="webinar.speaker" class="text-sm text-green-700">
                        <strong>Pembicara:</strong> {{ webinar.speaker }}
                      </p>
                      <p v-if="webinar.organizer" class="text-sm text-green-700">
                        <strong>Penyelenggara:</strong> {{ webinar.organizer }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Informasi Event -->
          <div class="w-full md:w-1/3">
            <div class="card card-bordered shadow bg-white">
              <div class="card-head px-6 pt-6">
                <div class="card-title text-lg font-bold">Informasi Event</div>
              </div>
              <div class="card-body pt-2">
                <div class="space-y-4">
                  <!-- Date Range -->
                  <div class="flex items-start gap-3 text-sm">
                    <span class="text-green-600 mt-1">
                      <svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8-3.6-8-8v-64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v584z" fill="#1677ff"></path></svg>
                    </span>
                    <div>
                      <div class="font-semibold text-gray-700">Tanggal</div>
                      <div class="text-gray-600">
                        {{ formatDate(webinar.dateStart) }}
                        <span v-if="webinar.dateEnd && webinar.dateEnd !== webinar.dateStart">
                          - {{ formatDate(webinar.dateEnd) }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Duration -->
                  <div class="flex items-start gap-3 text-sm">
                    <span class="text-blue-600 mt-1">
                      <svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372-166.6 372-372-166.6-372-372-372zm176.5 509.7l-28.6 39a7.99 7.99 0 01-11.2 1.7L483.3 569.8a7.92 7.92 0 01-3.3-6.5V288c0-4.4 3.6-8 8-8h48.1c4.4 0 8 3.6 8 8v247.5l142.6 103.1c3.6 2.5 4.4 7.5 1.8 11.1z" fill="#e6f4ff"></path></svg>
                    </span>
                    <div>
                      <div class="font-semibold text-gray-700">Durasi</div>
                      <div class="text-gray-600">{{ webinar.durationHours || 0 }} Jam</div>
                    </div>
                  </div>

                  <!-- Participants -->
                  <div class="flex items-start gap-3 text-sm">
                    <span class="text-purple-600 mt-1">
                      <svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor"><path d="M477.5 694l311.9-311.8-19-224.6-224.6-19-311.9 311.9L477.5 694zm116-415.5a47.81 47.81 0 0133.9-33.9c16.6-4.4 34.2.3 46.4 12.4a47.93 47.93 0 0112.4 46.4 47.81 47.81 0 01-33.9 33.9c-16.6 4.4-34.2-.3-46.4-12.4a48.3 48.3 0 01-12.4-46.4z"></path></svg>
                    </span>
                    <div>
                      <div class="font-semibold text-gray-700">Peserta</div>
                      <div class="text-gray-600">{{ webinar.totalParticipants || 0 }} Orang</div>
                    </div>
                  </div>

                  <!-- Category -->
                  <div v-if="webinar.category" class="flex items-start gap-3 text-sm">
                    <span class="text-orange-600 mt-1">
                      <svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor"><path d="M256 120c-70.7 0-128 57.3-128 128v128c0 70.7 57.3 128 128 128h512c70.7 0 128-57.3 128-128V248c0-70.7-57.3-128-128-128H256zm0 256V248h512v128H256z" /></svg>
                    </span>
                    <div>
                      <div class="font-semibold text-gray-700">Kategori</div>
                      <div class="text-gray-600">{{ webinar.category }}</div>
                    </div>
                  </div>

                  <!-- Status -->
                  <div class="flex items-start gap-3 text-sm">
                    <span class="text-gray-600 mt-1">
                      <svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372-166.6 372-372-166.6-372-372-372z" /></svg>
                    </span>
                    <div>
                      <div class="font-semibold text-gray-700">Status</div>
                      <span :class="{
                        'badge badge-success': webinar.status === 'active',
                        'badge badge-warning': webinar.status === 'upcoming',
                        'badge badge-error': webinar.status === 'cancelled',
                        'badge badge-outline': !webinar.status || webinar.status === 'completed'
                      }">
                        {{ getStatusText(webinar.status) }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div class="divider"></div>
                
                <!-- Action Button -->
                <button 
                  type="button" 
                  class="btn btn-block flex items-center gap-2"
                  :class="{
                    'btn-primary': webinar.status === 'active' || webinar.status === 'upcoming',
                    'btn-disabled': webinar.status === 'completed' || webinar.status === 'cancelled'
                  }"
                  :disabled="webinar.status === 'completed' || webinar.status === 'cancelled'"
                >
                  <span v-if="webinar.status === 'active' || webinar.status === 'upcoming'">
                    <svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor"><path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path></svg>
                  </span>
                  <span v-else>
                    <svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor"><path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path></svg>
                  </span>
                  <span>{{ getButtonText(webinar.status) }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import sidebar_forum from '~/components/sidebar_forum.vue'

const route = useRoute()
const id = route.params.id

// Reactive variables
const webinar = ref(null)
const loading = ref(false)
const error = ref('')

// Format date function
const formatDate = (dateString) => {
  if (!dateString) return 'Tanggal tidak tersedia'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Get status text
const getStatusText = (status) => {
  const statusMap = {
    'active': 'Aktif',
    'upcoming': 'Akan Datang',
    'completed': 'Selesai',
    'cancelled': 'Dibatalkan'
  }
  return statusMap[status] || 'Tidak Diketahui'
}

// Get button text
const getButtonText = (status) => {
  const buttonMap = {
    'active': 'Daftar Sekarang',
    'upcoming': 'Daftar',
    'completed': 'Event Selesai',
    'cancelled': 'Event Dibatalkan'
  }
  return buttonMap[status] || 'Tidak Tersedia'
}

// Fetch webinar event detail from API
const fetchWebinarEvent = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const response = await $fetch(`/api/webinar-events/${id}`)
    
    if (response.success) {
      webinar.value = response.data
    } else {
      throw new Error('Failed to fetch webinar event detail')
    }
  } catch (err) {
    console.error('Error fetching webinar event:', err)
    if (err.statusCode === 404) {
      error.value = 'Event tidak ditemukan'
    } else {
      error.value = 'Gagal memuat detail event'
    }
  } finally {
    loading.value = false
  }
}

// Load data on component mount
onMounted(() => {
  fetchWebinarEvent()
})
</script>
