<template>
	<table class="mx-auto text-start">
		<tr>
			<th class="text-start">Artiste</th>
			<th class="text-start">Track</th>
			<th class="text-start">Genre</th>
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
		tracks: []
	}),
	created() {
		this.setTracks();
	},
	methods: {
		async setTracks() {
			this.tracks = await fetch('/library.json')
				.then(res => res.json())
		}
	}
};
</script>
