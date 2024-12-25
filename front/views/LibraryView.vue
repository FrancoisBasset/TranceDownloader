<template>
	<div>
		<b>Bibliothèque</b>
		<br /><br />
		<div class="bg-sky-100 !overflow-scroll rounded-lg h-[80vh]">
			<TrackList  />
		</div>
	</div>
</template>

<script setup>
import TrackList from '@/components/TrackList.vue';
</script>
