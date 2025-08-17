<template>
  <div>
    <div class="flex space-x-2 mb-4">
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
    <div id="map" class="w-full h-[500px] rounded-xl shadow"></div>
    <div v-if="mode === 'kecamatan'">
      <svg><!-- paste isi kecamatan.svg di sini --></svg>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue"
import { Map, View } from "ol"
import TileLayer from "ol/layer/Tile"
import VectorLayer from "ol/layer/Vector"
import { OSM, Vector as VectorSource } from "ol/source"
import { GeoJSON } from "ol/format"
import { Style, Stroke, Fill } from "ol/style"

export default {
  setup() {
    const map = ref(null)
    const kotaLayer = ref(null)
    const kecamatanLayer = ref(null)
    const mode = ref("kota") // default tampil kota

    onMounted(async () => {
      // Buat peta dasar
      map.value = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [11800000, -700000], // koordinat Cilegon (pakai projection EPSG:3857)
          zoom: 11,
        }),
      })

      // Load Kota
      const kotaData = await fetch("/geojson/kota_cilegon.geojson").then((r) => r.json())
      kotaLayer.value = new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures(kotaData, {
            featureProjection: "EPSG:3857",
          }),
        }),
        style: new Style({
          stroke: new Stroke({
            color: "green",
            width: 3,
          }),
          fill: new Fill({
            color: "rgba(0,128,0,0.05)",
          }),
        }),
      })

      // Load Kecamatan
      const kecamatanData = await fetch("/geojson/kecamatan.geojson").then((r) => r.json())
      kecamatanLayer.value = new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures(kecamatanData, {
            featureProjection: "EPSG:3857",
          }),
        }),
        style: new Style({
          stroke: new Stroke({
            color: "#2563eb", // biru Tailwind
            width: 2,
          }),
          fill: new Fill({
            color: "rgba(37,99,235,0.2)", // biru transparan
          }),
        }),
      })

      // Fokus ke extent kecamatan saat mode kecamatan aktif
      const kecamatanExtent = kecamatanLayer.value.getSource().getExtent();
      watch(mode, (val) => {
        if (!map.value) return;
        if (val === "kota") {
          map.value.removeLayer(kecamatanLayer.value);
          map.value.addLayer(kotaLayer.value);
        } else {
          map.value.removeLayer(kotaLayer.value);
          map.value.addLayer(kecamatanLayer.value);
          map.value.getView().fit(kecamatanExtent, { duration: 1000, padding: [50, 50, 50, 50] });
        }
      });

      // Default: tampil kota
      map.value.addLayer(kotaLayer.value)

      // Load dan tampilkan poligon dari geojson
      const geojsonData = await fetch("/geojson/poligon.geojson").then((r) => r.json())
      const poligonLayer = new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures(geojsonData),
        }),
        style: new Style({
          stroke: new Stroke({ color: "#16a34a", width: 2 }),
          fill: new Fill({ color: "rgba(34,197,94,0.3)" }),
        }),
      })
      map.value.addLayer(poligonLayer)
    })

    // Toggle antara kota & kecamatan
    watch(mode, (val) => {
      if (!map.value) return
      if (val === "kota") {
        map.value.removeLayer(kecamatanLayer.value)
        map.value.addLayer(kotaLayer.value)
      } else {
        map.value.removeLayer(kotaLayer.value)
        map.value.addLayer(kecamatanLayer.value)
      }
    })

    return {
      mode,
    }
  },
}
</script>

<style>
#map {
  width: 100%;
  height: 500px;
}
</style>
