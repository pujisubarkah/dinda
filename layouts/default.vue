<template>
  <div class="font-poppins bg-white min-h-screen flex flex-col">
    <Navbar />
    <NuxtPage />
    <Footer />

    <!-- Global Chat widget (client-only to avoid SSR/localStorage issues) -->
    <client-only>
      <Chat class="dinda-chat-widget" />
    </client-only>
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
import Chat from '~/components/Chat.vue'
</script>

<style scoped>
/* Custom styles if needed */

/* Floating chat widget styles */
.dinda-chat-widget {
  position: fixed;
  right: 1rem;
  bottom: 1.25rem;
  z-index: 60;
  width: 320px;
  max-width: calc(100% - 2rem);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  border-radius: 12px;
  overflow: hidden;
}

@media (min-width: 1280px) {
  .dinda-chat-widget {
    width: 360px;
  }
}
</style>
