<template>
	<div>
		<b class="text-lg">Vidéos à ajouter</b>
		<br /><br />
		<div class="bg-sky-100 !overflow-scroll rounded-lg h-[80vh]">
			<WishesList />
		</div>
	</div>
</template>

<script setup>
import WishesList from '@/components/WishesList.vue';
</script>
