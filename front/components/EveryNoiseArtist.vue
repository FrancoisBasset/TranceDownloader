<template>
	<div class="flex flex-col items-center p-4 bg-gray-200 rounded-xl shadow-lg" :class="{ 'bg-teal-400': isPlaying }">
		<div class="font-bold text-center">{{ artist.artist }}</div>
		<div class="text-center mb-2">{{ artist.title }}</div>
		<div class="px-5">
			<button class="orange-button me-2" @click="read">Lire</button>
			<button class="orange-button ml-2" @click="searchOnYoutube">Rechercher</button>
		</div>
	</div>
</template>

<script>
import useApp from '@/stores/app';

export default {
	props: ['artist'],
	data: () => ({
		isPlaying: false
	}),
	setup: () => ({
		app: useApp()
	}),
	methods: {
		read() {
			this.app.currentTrack = {
				artist: this.artist.artist,
				title: this.artist.title,
				url: this.artist.preview_url
			};
			this.isPlaying = true;
		},
		searchOnYoutube() {
			this.app.goTo('youtube');
			this.app.youtubeSearch = this.artist.artist + ' ' + this.artist.title;
		}
	},
	watch: {
		'app.currentTrack'() {
			if (this.app.currentTrack === null || this.artist.preview_url !== this.app.currentTrack.url) {
				this.isPlaying = false;
			}
		}
	}
};
</script>
