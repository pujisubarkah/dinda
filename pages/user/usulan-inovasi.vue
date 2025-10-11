<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Usulan Inovasi</h1>
        <p class="mt-2 text-gray-600">
          Ajukan ide inovasi Anda untuk meningkatkan pelayanan publik
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-600">
          <h2 class="text-xl font-semibold text-white">Form Usulan Inovasi</h2>
        </div>

        <form @submit.prevent="submitForm" class="p-6 space-y-6">
          <!-- Latar Belakang -->
          <div>
            <label for="latarBelakang" class="block text-sm font-medium text-gray-700 mb-2">
              Latar Belakang <span class="text-red-500">*</span>
            </label>
            <textarea
              id="latarBelakang"
              v-model="form.latarBelakang"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Jelaskan latar belakang masalah yang mendorong ide inovasi ini..."
              required
            ></textarea>
          </div>

          <!-- Ide Inovasi -->
          <div>
            <label for="ideInovasi" class="block text-sm font-medium text-gray-700 mb-2">
              Ide Inovasi <span class="text-red-500">*</span>
            </label>
            <textarea
              id="ideInovasi"
              v-model="form.ideInovasi"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Deskripsikan ide inovasi yang Anda usulkan..."
              required
            ></textarea>
          </div>

          <!-- Stakeholder Inovasi -->
          <div>
            <label for="stakeholderInovasi" class="block text-sm font-medium text-gray-700 mb-2">
              Stakeholder Inovasi <span class="text-red-500">*</span>
            </label>
            <textarea
              id="stakeholderInovasi"
              v-model="form.stakeholderInovasi"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Sebutkan pihak-pihak yang terlibat atau berkepentingan dengan inovasi ini..."
              required
            ></textarea>
          </div>

          <!-- Sumber Daya -->
          <div>
            <label for="sumberDaya" class="block text-sm font-medium text-gray-700 mb-2">
              Sumber Daya <span class="text-red-500">*</span>
            </label>
            <textarea
              id="sumberDaya"
              v-model="form.sumberDaya"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Jelaskan sumber daya yang dibutuhkan (SDM, anggaran, teknologi, dll)..."
              required
            ></textarea>
          </div>

          <!-- Penerima Manfaat -->
          <div>
            <label for="penerimaManfaat" class="block text-sm font-medium text-gray-700 mb-2">
              Penerima Manfaat <span class="text-red-500">*</span>
            </label>
            <textarea
              id="penerimaManfaat"
              v-model="form.penerimaManfaat"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Sebutkan siapa yang akan merasakan manfaat dari inovasi ini..."
              required
            ></textarea>
          </div>

          <!-- Deskripsi Singkat -->
          <div>
            <label for="deskripsiSingkat" class="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Singkat <span class="text-red-500">*</span>
            </label>
            <textarea
              id="deskripsiSingkat"
              v-model="form.deskripsiSingkat"
              rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Ringkasan singkat ide inovasi dalam 1-2 kalimat..."
              required
            ></textarea>
          </div>

          <!-- Keterangan -->
          <div>
            <label for="keterangan" class="block text-sm font-medium text-gray-700 mb-2">
              Keterangan Tambahan
            </label>
            <textarea
              id="keterangan"
              v-model="form.keterangan"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Informasi tambahan yang perlu disampaikan..."
            ></textarea>
          </div>

          <!-- Kebaruan -->
          <div>
            <label for="kebaruan" class="block text-sm font-medium text-gray-700 mb-2">
              Kebaruan/Inovasi
            </label>
            <textarea
              id="kebaruan"
              v-model="form.kebaruan"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Jelaskan aspek kebaruan atau inovasi dari usulan ini..."
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-md hover:from-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isSubmitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mengirim...
              </span>
              <span v-else>Ajukan Usulan</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="successMessage" class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium">{{ successMessage }}</p>
          </div>
        </div>
      </div>

      <div v-if="errorMessage" class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'user'
})

import { ref, onMounted, nextTick, watch } from 'vue'

// Reactive form data
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

// State management
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Get current user from auth
const user = ref(null)

onMounted(async () => {
  try {
    // Get token from localStorage (or wherever you store it)
    const token = localStorage.getItem('auth-token')
    
    if (token) {
      const response = await $fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.success) {
        user.value = response.data.user
      }
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    // Redirect to login if not authenticated
    await navigateTo('/login')
  }
})

// Submit form
const submitForm = async () => {
  if (isSubmitting.value) return

  // Clear previous messages
  successMessage.value = ''
  errorMessage.value = ''

  // Validate required fields
  const requiredFields = ['latarBelakang', 'ideInovasi', 'stakeholderInovasi', 'sumberDaya', 'penerimaManfaat', 'deskripsiSingkat']
  const missingFields = requiredFields.filter(field => !form.value[field].trim())
  
  if (missingFields.length > 0) {
    errorMessage.value = 'Harap lengkapi semua field yang wajib diisi'
    return
  }

  if (!user.value) {
    errorMessage.value = 'Anda harus login terlebih dahulu'
    return
  }

  isSubmitting.value = true

  try {
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
        created_by: user.value.id
      }
    })

    if (response.success) {
      successMessage.value = 'Usulan inovasi berhasil diajukan!'
      resetForm()
      
      // Auto scroll to success message
      nextTick(() => {
        document.querySelector('.bg-green-100')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
      })
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    errorMessage.value = error.data?.message || 'Terjadi kesalahan saat mengajukan usulan'
  } finally {
    isSubmitting.value = false
  }
}

// Reset form
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
  successMessage.value = ''
  errorMessage.value = ''
}

// Auto-hide messages after 5 seconds
watch([successMessage, errorMessage], () => {
  if (successMessage.value || errorMessage.value) {
    setTimeout(() => {
      successMessage.value = ''
      errorMessage.value = ''
    }, 5000)
  }
})
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
</style>
