<template>
	<div class="min-h-screen bg-gray-50">
		<!-- Header -->
		<HeaderUser />
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
