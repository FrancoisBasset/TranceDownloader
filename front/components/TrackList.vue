<template>
	<table class="mx-auto text-start m-8">
		<tr class="cursor-pointer">
			<th @click="sortBy('artist')" class="text-start" :class="{ 'text-green-500': sortMode === 'artist' }">Artiste</th>
			<th @click="sortBy('title')" class="text-start" :class="{ 'text-green-500': sortMode === 'title' }">Titre</th>
			<th @click="sortBy('genre')" class="text-start" :class="{ 'text-green-500': sortMode === 'genre' }">Genre</th>
		</tr>
		<TrackRow v-for="track of tracks" :key="track" :track="track" />
	</table>
</template>

<script setup>
import TrackRow from '@/components/TrackRow.vue';
</script>

<script>
import useApp from '@/stores/app';

export default {
	data: () => ({
		app: useApp(),
		tracks: [],
		sortMode: 'artist'
	}),
	created() {
		this.setTracks();
	},
	methods: {
		async setTracks() {
			this.tracks = await fetch('/library.json').then(res => res.json());
		},
		sortBy(type) {
			this.sortMode = type;

			this.tracks = this.tracks.sort((t1, t2) => {
				return t1[type].localeCompare(t2[type]);
			});
		}
	}
};
</script>
