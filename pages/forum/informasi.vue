<template>
  <div class="flex min-h-screen bg-gray-50">
    <sidebar_forum class="shrink-0" />
    <div class="flex-1 py-8 px-4 md:px-12">
      <h1 class="text-2xl font-bold mb-6 text-green-900">Informasi & FAQ DINDA Dashboard Inovasi Daerah Kota Cilegon</h1>
      <div class="max-w-2xl space-y-6">
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
