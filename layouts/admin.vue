<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <Header />
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
