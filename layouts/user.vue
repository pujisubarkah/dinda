<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header - Full Width -->
    <HeaderUser />
    
    <!-- Content Area with Sidebar and Main -->
    <div class="flex">
      <!-- Sidebar -->
      <SidebarUser />
      
      <!-- Main Content -->
      <main class="flex-1 p-6">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import SidebarUser from '~/components/sidebar_user.vue'
import HeaderUser from '~/components/header_user.vue'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}
</style>
