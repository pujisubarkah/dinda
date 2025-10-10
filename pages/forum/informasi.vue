<template>
  <div class="flex min-h-screen bg-gradient-to-br from-teal-50 via-white to-yellow-50">
    <sidebar_forum class="shrink-0" />
    <div class="flex-1 py-8 px-4 md:px-12">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center space-x-3 mb-4">
          <div class="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            FAQ DINDA CILEGON
          </h1>
        </div>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Temukan jawaban atas pertanyaan yang sering diajukan tentang Dashboard Inovasi Daerah Kota Cilegon
        </p>
        <div class="mt-6 inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          <span>Klik pada pertanyaan untuk melihat jawaban</span>
        </div>
      </div>

      <!-- FAQ Cards -->
      <div class="max-w-4xl mx-auto space-y-4">
        <div class="collapse collapse-arrow bg-white shadow">
          <input type="checkbox" />
          <div class="collapse-title text-lg font-semibold">Apa itu DINDA Dashboard Inovasi Daerah Kota Cilegon?</div>
          <div class="collapse-content text-gray-700">
            DINDA adalah platform digital untuk memantau, mengelola, dan mendukung inovasi daerah di Kota Cilegon. Melalui dashboard ini, pengguna dapat mengakses data, berdiskusi, dan berbagi pengetahuan seputar inovasi daerah.
          </div>
        </div>
        <div class="collapse collapse-arrow bg-white shadow">
          <input type="checkbox" />
          <div class="collapse-title text-lg font-semibold">Bagaimana cara mengajukan pertanyaan atau diskusi?</div>
          <div class="collapse-content text-gray-700">
            Anda dapat mengajukan pertanyaan atau memulai diskusi melalui menu <b>Pertanyaan Saya</b> di sidebar. Pastikan mengikuti aturan forum yang berlaku.
          </div>
        </div>
        <div class="collapse collapse-arrow bg-white shadow">
          <input type="checkbox" />
          <div class="collapse-title text-lg font-semibold">Bagaimana cara mengikuti webinar atau event inovasi?</div>
          <div class="collapse-content text-gray-700">
            Silakan buka menu <b>Webinar</b> untuk melihat daftar webinar atau event inovasi yang tersedia. Klik pada event yang diinginkan untuk detail dan cara registrasi.
          </div>
        </div>
        <div class="collapse collapse-arrow bg-white shadow">
          <input type="checkbox" />
          <div class="collapse-title text-lg font-semibold">Siapa saja yang dapat bergabung di forum DINDA?</div>
          <div class="collapse-content text-gray-700">
            Forum ini terbuka untuk seluruh ASN, perangkat daerah, dan masyarakat Kota Cilegon yang ingin berdiskusi atau mencari informasi terkait inovasi daerah.
          </div>
        </div>
        <div class="collapse collapse-arrow bg-white shadow">
          <input type="checkbox" />
          <div class="collapse-title text-lg font-semibold">Bagaimana jika saya mengalami kendala teknis?</div>
          <div class="collapse-content text-gray-700">
            Jika mengalami kendala, silakan hubungi admin DINDA melalui kontak yang tersedia di halaman utama atau menu bantuan.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import sidebar_forum from '~/components/sidebar_forum.vue'
</script>
