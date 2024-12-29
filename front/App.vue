<template>
	<div class="text-center">
		<MenuBar class="fixed bg-white w-full" />
		<RouterView class="pt-[50px]" />
	</div>
</template>

<script setup>
import MenuBar from '@/components/MenuBar.vue';
</script>
