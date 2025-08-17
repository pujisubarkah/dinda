<template>
  <!-- Peta Inovasi -->
  <div class="bg-white border border-yellow-300 rounded-xl shadow p-6 mt-10">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-semibold text-green-700">Peta Inovasi Kota Cilegon</h3>
      <div class="space-x-2">
        <button
          class="px-4 py-2 rounded-lg border border-green-600 text-green-700 hover:bg-green-100"
          @click="mode = 'kota'"
          :class="{ 'bg-green-600 text-white': mode === 'kota' }"
        >
          Kota
        </button>
        <button
          class="px-4 py-2 rounded-lg border border-yellow-600 text-yellow-700 hover:bg-yellow-100"
          @click="mode = 'kecamatan'"
          :class="{ 'bg-yellow-600 text-white': mode === 'kecamatan' }"
        >
          Kecamatan
        </button>
      </div>
    </div>

    <LMap style="height: 500px;" :zoom="11" :center="[ -6.016, 106.05 ]">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <!-- Boundary Kota -->
      <LGeoJson
        v-if="mode === 'kota' && kota"
        :geojson="kota"
        :options-style="styleKota"
      />

      <!-- Boundary Kecamatan -->
      <LGeoJson
        v-if="mode === 'kecamatan' && kecamatan"
        :geojson="kecamatan"
        :options-style="styleKecamatan"
        :options-onEachFeature="onEachKecamatan"
      />
    </LMap>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('kota')
// Make sure to also define kota, kecamatan, styleKota, styleKecamatan, onEachKecamatan as needed
</script>
