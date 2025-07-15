<template>
	<table class="mx-auto text-start">
		<tr class="cursor-pointer">
			<th @click="sort('artist')" class="text-start" :class="{ 'text-teal-400': order === 'artist' }">Artiste</th>
			<th @click="sort('title')" class="text-start" :class="{ 'text-teal-400': order === 'title' }">Titre</th>
			<th @click="sort('genre')" class="text-start" :class="{ 'text-teal-400': order === 'genre' }">Genre</th>
		</tr>
		<TrackRow v-for="track of tracks" :key="track" :track="track" />
	</table>
</template>

<script>
import TrackRow from '@/components/TrackRow.vue';
import useApp from '@/stores/app';

export default {
	components: { TrackRow },
	data: () => ({
		tracks: [],
		order: 'artist'
	}),
	setup: () => ({
		app: useApp()
	}),
	created() {
		this.setTracks();
	},
	methods: {
		async setTracks() {
			this.tracks = await fetch('/library.json').then(res => res.json());
		},
		sort(order) {
			this.order = order;

			this.tracks = this.tracks.sort((t1, t2) => {
				return t1[order].localeCompare(t2[order]);
			});
		}
	}
};
</script>
