<template>
  <div>
    <section
      class="w-full py-16 flex items-center justify-center"
      style="background-image: url('https://cilegon.go.id/assets/images/bgtagline.jpg'); background-size: cover; background-repeat: no-repeat; background-attachment: fixed; background-position: center;"
    >
      <div class="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
        <div class="flex flex-col items-center justify-center">
          <span class="text-5xl font-light mb-2">8</span>
          <h3 class="text-lg font-light mt-2">KECAMATAN</h3>
        </div>
        <div class="flex flex-col items-center justify-center">
          <p class="text-lg font-semibold mt-2 mb-2">MEWUJUDKAN CILEGON MAJU, SEJAHTERA DAN BERKELANJUTAN</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <span class="text-5xl font-light mb-2">43</span>
          <h3 class="text-lg font-light mt-2">KELURAHAN</h3>
        </div>
      </div>
    </section>
   
  <!-- Hero -->
    <section class="bg-white text-green-900 py-20 text-center relative">
      <button @click="showModal = true" class="absolute top-6 right-8 bg-yellow-400 text-green-900 px-8 py-4 rounded-full font-bold text-lg shadow hover:bg-yellow-300 transition">
        Punya Ide Inovasi?
      </button>
    <!-- Modal Ide Inovasi -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
        <button @click="showModal = false" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
        <h2 class="text-2xl font-bold text-green-700 mb-4">Daftarkan Ide Inovasi</h2>
        <p class="mb-4 text-gray-700">Silakan isi form ide inovasi Anda di halaman Inkubasi.</p>
        <NuxtLink to="/inkubasi" class="bg-yellow-400 text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition block text-center">Ke Halaman Inkubasi</NuxtLink>
      </div>
    </div>
      <h1 class="text-4xl md:text-5xl font-extrabold text-green-700">
        DINDA 
      </h1>
      <p class="mt-4 text-lg md:text-xl text-gray-700">
        Dashboard Inovasi Daerah — Wadah Kolaborasi & Inkubasi
      </p>
      <div class="mt-6 space-x-4">
        <NuxtLink to="/galeri" class="bg-yellow-400 text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
          Lihat Galeri Inovasi
        </NuxtLink>
        <NuxtLink to="/inkubasi" class="border-2 border-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-green-900 transition">
          Daftarkan Ide
        </NuxtLink>
      </div>
    </section>

   

    <!-- Statistik & Chart -->
    <section class="py-12 bg-green-50">
      <div class="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-10">
        <div class="p-6 bg-white rounded-xl shadow border-2 border-yellow-400">
          <h2 class="text-3xl font-bold text-green-700">12.810+</h2>
          <p class="text-sm text-gray-600">Ide Inovasi</p>
        </div>
        <div class="p-6 bg-white rounded-xl shadow border-2 border-yellow-400">
          <h2 class="text-3xl font-bold text-green-700">120</h2>
          <p class="text-sm text-gray-600">Daerah Terlibat</p>
        </div>
        <div class="p-6 bg-white rounded-xl shadow border-2 border-yellow-400">
          <h2 class="text-3xl font-bold text-green-700">500+</h2>
          <p class="text-sm text-gray-600">Inovator Aktif</p>
        </div>
        <div class="p-6 bg-white rounded-xl shadow border-2 border-yellow-400">
          <h2 class="text-3xl font-bold text-green-700">200+</h2>
          <p class="text-sm text-gray-600">Program Inkubasi</p>
        </div>
      </div>
      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white rounded-xl shadow border border-yellow-300 p-6 flex flex-col items-center">
          <h3 class="font-semibold text-green-700 mb-4">Distribusi Kategori</h3>
          <div style="height:250px;width:100%;" ref="pieChart"></div>
        </div>
        <div class="bg-white rounded-xl shadow border border-yellow-300 p-6 flex flex-col items-center">
          <h3 class="font-semibold text-green-700 mb-4">Jumlah Inovasi per Daerah</h3>
          <div style="height:250px;width:100%;" ref="barChart"></div>
        </div>
      </div>
    </section>

    <!-- Galeri Inovasi Terbaru -->
    <section class="py-12 max-w-7xl mx-auto px-6">
      <h2 class="text-2xl font-bold text-green-800 mb-6">Inovasi Terbaru</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white border border-yellow-300 rounded-xl shadow p-4">
          <h3 class="font-semibold text-green-700">Sistem Pertanian Cerdas</h3>
          <p class="text-sm text-gray-600">Kategori: Teknologi</p>
        </div>
        <div class="bg-white border border-yellow-300 rounded-xl shadow p-4">
          <h3 class="font-semibold text-green-700">Aplikasi Layanan Publik</h3>
          <p class="text-sm text-gray-600">Kategori: Digital</p>
        </div>
        <div class="bg-white border border-yellow-300 rounded-xl shadow p-4">
          <h3 class="font-semibold text-green-700">Energi Terbarukan Desa</h3>
          <p class="text-sm text-gray-600">Kategori: Lingkungan</p>
        </div>
      </div>
      <div class="text-center mt-6">
        <NuxtLink to="/galeri" class="text-green-700 hover:text-yellow-500 font-semibold">Lihat Semua →</NuxtLink>
      </div>
    </section>

  <!-- CTA dihapus, tombol sudah dipindahkan ke atas Hero section -->

     <!-- Kontak dan Maps -->
    <div class="max-w-5xl mx-auto my-12 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6">
      <div class="flex items-center justify-center">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2725.854697861844!2d106.03949054745402!3d-6.008599368925427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x82fc1a3883ee5a4e!2sDinas%20KOMINFO%20Kota%20Cilegon!5e0!3m2!1sid!2sid!4v1612801235312!5m2!1sid!2sid" frameborder="0" style="border:0;width:100%;height:300px;" allowfullscreen></iframe>
      </div>
      <div class="flex flex-col justify-center space-y-4">
        <div class="font-bold text-green-700 text-lg mb-2">Pemerintahan Kota Cilegon</div>
        <div class="flex items-center text-gray-700"><i class="fa fa-map-marker mr-2 text-yellow-500"></i> Jl. Raya Merak-Tirtayasa No.11, RT.3/RW.1, Ramanuju, Kec. Purwakarta, Kota Cilegon</div>
        <div class="flex items-center"><i class="fa fa-phone mr-2 text-green-600"></i> <span class="font-semibold mr-2">Phone:</span> 02142432</div>
        <div class="flex items-center"><i class="fa fa-fax mr-2 text-green-600"></i> <span class="font-semibold mr-2">Fax:</span> <a href="https://www.youtube.com/channel/UCuksmrFzRoe9nxAilA95EUA" class="text-blue-600 hover:underline">YouTube Channel</a></div>
        <div class="flex items-center"><i class="fa fa-envelope mr-2 text-green-600"></i> <span class="font-semibold mr-2">Email:</span> <a href="mailto:diskominfo@gmail.com" class="text-blue-600 hover:underline">diskominfo@gmail.com</a></div>
      </div>
    </div>
  </div>
</template>

<script setup>

import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const showModal = ref(false)
const pieChart = ref(null)
const barChart = ref(null)

const pieOptions = {
  title: { show: false },
  tooltip: { trigger: 'item' },
  legend: { orient: 'vertical', left: 'left' },
  series: [
    {
      name: 'Kategori',
      type: 'pie',
      radius: '60%',
      data: [
        { value: 40, name: 'Teknologi' },
        { value: 30, name: 'Digital' },
        { value: 20, name: 'Lingkungan' },
        { value: 10, name: 'Infrastruktur' }
      ],
      itemStyle: {
        color: function(params) {
          const colors = ['#22c55e', '#15803d', '#65a30d', '#84cc16'];
          return colors[params.dataIndex];
        }
      }
    }
  ]
};

const barOptions = {
  tooltip: {},
  xAxis: {
    type: 'category',
    data: ['Cilegon', 'Anyer', 'Merak', 'Pulomerak', 'Grogol'],
    axisLabel: { color: '#15803d' }
  },
  yAxis: { type: 'value', axisLabel: { color: '#15803d' } },
  series: [{
    name: 'Jumlah Inovasi',
    type: 'bar',
    data: [20, 15, 25, 10, 30],
    itemStyle: { color: '#16a34a' }
  }]
};

onMounted(() => {
  if (pieChart.value) {
    const pieChartInstance = echarts.init(pieChart.value);
    pieChartInstance.setOption(pieOptions);
  }
  
  if (barChart.value) {
    const barChartInstance = echarts.init(barChart.value);
    barChartInstance.setOption(barOptions);
  }
})
</script>

<style>
/* CSS di sini */
</style>
