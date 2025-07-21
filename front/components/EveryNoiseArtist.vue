<template>
	<div class="flex flex-col items-center p-4 bg-gray-200 rounded-xl shadow-lg" :class="{ 'bg-teal-400': isPlaying }">
		<div class="font-bold text-center">{{ artist.artist }}</div>
		<div class="text-center mb-2">{{ artist.title }}</div>
		<audio class="rounded-lg bg-blue-200 w-full" controls preload="none" :src="artist.preview_url" @play="isPlaying = true" @pause="isPlaying = false"></audio>
		<button class="orange-button mt-2" @click="searchOnYoutube(artist.artist + ' ' + artist.title)">Rechercher</button>
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
		searchOnYoutube(search) {
			this.app.goTo('youtube');
			this.app.youtubeSearch = search;
		}
	}
};
</script>
