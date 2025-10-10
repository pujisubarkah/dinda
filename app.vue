<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout />
  </div>
</template>

<script setup>
// Set global head configuration
useHead({
  titleTemplate: '%s - DINDA CILEGON',
  meta: [
    { name: 'theme-color', content: '#1e40af' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>
