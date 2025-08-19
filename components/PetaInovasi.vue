<template>
  <div class="mb-10">
    <h2 class="text-2xl font-bold text-green-700 mb-4">Peta Sebaran Inovasi Kecamatan</h2>
    <div id="map" class="w-full h-96 rounded-xl border border-yellow-300 shadow"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  if (typeof window !== 'undefined') {
    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet/dist/leaflet.css'
      document.head.appendChild(link)
    }
    // Load Leaflet JS
    if (!window.L) {
      await new Promise(resolve => {
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet/dist/leaflet.js'
        script.onload = resolve
        document.body.appendChild(script)
      })
    }
    // Initialize map
    const map = window.L.map('map').setView([-6.0167, 106.0167], 11)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)
    // Load GeoJSON
    fetch('/geojson/kecamatan.geojson')
      .then(res => res.json())
      .then(geojson => {
        window.L.geoJSON(geojson, {
          style: {
            color: '#facc15',
            weight: 2,
            fillColor: '#22c55e',
            fillOpacity: 0.4
          }
        }).addTo(map)
      })
  }
})
</script>
