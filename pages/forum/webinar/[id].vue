<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gray-50">
    <!-- Sidebar Forum -->
    <sidebar_forum class="shrink-0" />
    <!-- Konten Detail Webinar -->
    <div class="flex-1">
      <div class="max-w-6xl mx-auto py-8 px-2 md:px-8">
        <!-- Tombol Back -->
        <NuxtLink to="/forum/webinar" class="inline-flex items-center gap-2 mb-6 text-orange-600 hover:underline font-semibold">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L4.414 8H17a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z" clip-rule="evenodd"/></svg>
          Kembali ke Daftar Webinar
        </NuxtLink>
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Konten Utama -->
          <div class="w-full md:w-2/3">
            <div class="card card-bordered shadow bg-white">
              <div class="card-body">
                <h4 class="text-xl font-bold mb-2">{{ webinar.title }}</h4>
                <div class="divider"></div>
                <div class="space-y-2">
                  <div class="text-sm text-gray-600">LIVE ON YOUTUBE @bkdjatimofficial</div>
                  <ul class="list-disc pl-5 text-sm text-gray-700">
                    <li>{{ webinar.title }}</li>
                  </ul>
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
                <div class="space-y-3">
                  <div class="flex items-center gap-2 text-sm">
                    <span><svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372-166.6 372-372-166.6-372-372-372zm176.5 509.7l-28.6 39a7.99 7.99 0 01-11.2 1.7L483.3 569.8a7.92 7.92 0 01-3.3-6.5V288c0-4.4 3.6-8 8-8h48.1c4.4 0 8 3.6 8 8v247.5l142.6 103.1c3.6 2.5 4.4 7.5 1.8 11.1z" fill="#e6f4ff"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.3c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.9 11.2-1.7l28.6-39c2.6-3.6 1.8-8.6-1.8-11.1z" fill="#1677ff"></path></svg></span>
                    <strong>{{ webinar.date }}</strong>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <span><svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor"><path d="M477.5 694l311.9-311.8-19-224.6-224.6-19-311.9 311.9L477.5 694zm116-415.5a47.81 47.81 0 0133.9-33.9c16.6-4.4 34.2.3 46.4 12.4a47.93 47.93 0 0112.4 46.4 47.81 47.81 0 01-33.9 33.9c-16.6 4.4-34.2-.3-46.4-12.4a48.3 48.3 0 01-12.4-46.4z" fill="#e6f4ff"></path><path d="M476.6 792.6c-1.7-.2-3.4-1-4.7-2.3L137.7 456.1a8.03 8.03 0 010-11.3L515.9 66.6c1.2-1.3 2.9-2.1 4.7-2.3h-.4c-2.3-.2-4.7.6-6.3 2.3L135.7 444.8a8.03 8.03 0 000 11.3l334.2 334.2c1.8 1.9 4.3 2.6 6.7 2.3z" fill="#e6f4ff"></path><path d="M889.7 539.8l-39.6-39.5a8.03 8.03 0 00-11.3 0l-362 361.3-237.6-237a8.03 8.03 0 00-11.3 0l-39.6 39.5a8.03 8.03 0 000 11.3l243.2 242.8 39.6 39.5c3.1 3.1 8.2 3.1 11.3 0l407.3-406.6c3.1-3.1 3.1-8.2 0-11.3zM652.3 337.3a47.81 47.81 0 0033.9-33.9c4.4-16.6-.3-34.2-12.4-46.4a47.93 47.93 0 00-46.4-12.4 47.81 47.81 0 00-33.9 33.9c-4.4 16.6.3 34.2 12.4 46.4a48.3 48.3 0 0046.4 12.4z" fill="#1677ff"></path><path d="M137.7 444.8a8.03 8.03 0 000 11.3l334.2 334.2c1.3 1.3 2.9 2.1 4.7 2.3 2.4.3 4.8-.5 6.6-2.3L861.4 412c1.7-1.7 2.5-4 2.3-6.3l-25.5-301.4c-.7-7.8-6.8-13.9-14.6-14.6L522.2 64.3h-1.6c-1.8.2-3.4 1-4.7 2.3L137.7 444.8zm408.1-306.2l224.6 19 19 224.6L477.5 694 233.9 450.5l311.9-311.9z" fill="#1677ff"></path></svg></span>
                    <strong>1943 Peserta</strong>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <span><svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8-3.6-8-8v-64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v584z" fill="#1677ff"></path><path d="M712 304c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H384v48c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H184v584h656V256H712v48zm-17.5 128.8L481.9 725.5a16.1 16.1 0 01-26 0l-126.4-174c-3.8-5.3 0-12.7 6.5-12.7h55.2c5.2 0 10 2.5 13 6.6l64.7 89 150.9-207.8c3-4.1 7.9-6.6 13-6.6H688c6.5 0 10.3 7.4 6.5 12.8z" fill="#e6f4ff"></path><path d="M688 420h-55.2c-5.1 0-10 2.5-13 6.6L468.9 634.4l-64.7-89c-3-4.1-7.8-6.6-13-6.6H336c-6.5 0-10.3 7.4-6.5 12.7l126.4 174a16.1 16.1 0 0026 0l212.6-292.7c3.8-5.4 0-12.8-6.5-12.8z" fill="#1677ff"></path></svg></span>
                    <strong>{{ webinar.duration }}</strong>
                  </div>
                  <div>
                    <span class="badge badge-error badge-outline">Belum Registrasi</span>
                  </div>
                </div>
                <div class="divider"></div>
                <button type="button" class="btn btn-block btn-outline btn-disabled flex items-center gap-2" disabled>
                  <span><svg viewBox="64 64 896 896" width="18" height="18" fill="currentColor"><path d="M288 421a48 48 0 1096 0 48 48 0 10-96 0zm352 0a48 48 0 1096 0 48 48 0 10-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 01248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 01249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 01775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 01775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 00-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 00-8-8.4z"></path></svg></span>
                  <span>Ditutup</span>
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
import sidebar_forum from '~/components/sidebar_forum.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id
// Dummy data detail webinar
const webinar = {
  id: 1,
  title: 'Penguatan Mental Rohani dan Peningkatan Etos Kerja bagi anggota KORPRI 2025',
  date: '23 Jun 2025 - 23 Jun 2025',
  duration: '8 Jam Pelajaran',
  peserta: 1943,
}
</script>
