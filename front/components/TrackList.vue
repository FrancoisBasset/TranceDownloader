<template>
	<table class="mx-auto text-start">
		<tr class="cursor-pointer">
			<th></th>
			<th @click="sort('artist')" class="text-start" :class="{ 'text-teal-400': order === 'artist' }">Artiste</th>
			<th @click="sort('title')" class="text-start" :class="{ 'text-teal-400': order === 'title' }">Titre</th>
			<th @click="sort('genre')" class="text-start" :class="{ 'text-teal-400': order === 'genre' }">Genre</th>
		</tr>
		<TrackRow v-for="track of tracks" :key="track" :track="track" @onEdit="track => $emit('onEdit', track)" />
	</table>
</template>

<script setup>
import TrackRow from '@/components/TrackRow.vue';
import { onMounted, ref } from 'vue';

const tracks = ref([]);
const order = ref('artist');

onMounted(async () => {
	tracks.value = await fetch('/library.json').then(res => res.json());
});

function sort(_order) {
	order.value = _order;

	tracks.value = tracks.value.sort((t1, t2) => {
		return t1[_order].localeCompare(t2[_order]);
	});
}
</script>
