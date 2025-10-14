// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'DINDA CILEGON - Dashboard Inovasi Daerah Cilegon',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Dashboard Inovasi Daerah (DINDA) Cilegon - Platform digital untuk menampilkan dan mengelola inovasi-inovasi daerah di Kota Cilegon yang mendukung pencapaian Sustainable Development Goals (SDGs)' 
        },
        { name: 'keywords', content: 'dinda, cilegon, inovasi daerah, dashboard, SDGs, sustainable development goals, inovator, pemerintah daerah' },
        { name: 'author', content: 'Pemerintah Kota Cilegon' },
        { property: 'og:title', content: 'DINDA CILEGON - Dashboard Inovasi Daerah Cilegon' },
        { 
          property: 'og:description', 
          content: 'Platform digital untuk menampilkan dan mengelola inovasi-inovasi daerah di Kota Cilegon yang mendukung pencapaian Sustainable Development Goals (SDGs)' 
        },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'DINDA CILEGON - Dashboard Inovasi Daerah Cilegon' },
        { 
          name: 'twitter:description', 
          content: 'Platform digital untuk menampilkan dan mengelola inovasi-inovasi daerah di Kota Cilegon yang mendukung pencapaian Sustainable Development Goals (SDGs)' 
        }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' },
        { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css' }
      ],
      script: [
        { src: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js' }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
})
