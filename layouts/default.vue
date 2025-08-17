<template>
  <div class="font-poppins bg-white min-h-screen flex flex-col">
    <Navbar />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
</script>

<style scoped>
/* Custom styles if needed */
</style>
