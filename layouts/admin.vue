<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
* {
  font-family: 'Poppins', sans-serif;
}
</style>
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header - Full Width -->
    <Header />
    <!-- Content Area with Sidebar and Main -->
    <div class="flex">
      <!-- Sidebar -->
      <Sidebar />
      <!-- Main Content -->
      <main class="flex-1 p-6">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '~/components/sidebar.vue'
import Header from '~/components/header.vue'
</script>
