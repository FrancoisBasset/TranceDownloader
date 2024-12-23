<template>
	<table class="mx-auto text-start">
		<tr>
			<th class="text-start">Artiste</th>
			<th class="text-start">Track</th>
			<th class="text-start">Genre</th>
		</tr>
		<tr v-for="track of tracks" :key="track" :class="trClasses(track)">
			<td>{{ track.artist }}</td>
			<td>{{ track.title }}</td>
			<td>{{ track.genre }}</td>
			<td>
				<PlayButton v-if="app.currentTrack !== track || !app.isPlaying" @click="selectTrack(track)" />
				<PauseButton v-else-if="app.currentTrack === track && app.isPlaying" @click="app.isPlaying = false" />
			</td>
		</tr>
	</table>
</template>

<script setup>
import PlayButton from './PlayButton.vue';
import PauseButton from './PauseButton.vue';
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
		},
		trClasses(track) {
			if (this.app.currentTrack === track) {
				return ['text-white', 'bg-green-500'];
			}

			return ['hover:bg-orange-100'];
		},
		selectTrack(track) {
			this.app.currentTrack = track
			this.app.isPlaying = true;
		}
	}
};
</script>
