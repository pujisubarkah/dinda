<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar - Fixed Position -->
    <Sidebar />
    
    <!-- Main Content Area with Left Margin -->
    <div class="ml-64">
      <!-- Header -->
      <Header />
      
      <!-- Main Content -->
      <main class="p-6">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '~/components/sidebar.vue'
import Header from '~/components/header.vue'
</script>
