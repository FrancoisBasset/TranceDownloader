<template>
	<div class="flex flex-col items-center p-4 bg-gray-200 rounded-xl shadow-lg" :class="{ 'bg-teal-400': isPlaying }">
		<div class="font-bold text-center">{{ artist.artist }}</div>
		<div class="text-center mb-2">{{ artist.title }}</div>
		<div class="px-5">
			<button class="orange-button me-2" @click="read">Lire</button>
			<button class="orange-button ml-2" @click="searchOnYouTube">Rechercher</button>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import useApp from '@/stores/app';

const app = useApp();

const { artist } = defineProps(['artist']);
const isPlaying = ref(false);

function read() {
	app.currentTrack = {
		artist: artist.artist,
		title: artist.title,
		url: artist.preview_url
	};
	isPlaying.value = true;
}

function searchOnYouTube() {
	app.goTo('youtube');
	app.youtubeSearch = artist.artist + ' ' + artist.title;
}

watch(
	() => app.currentTrack,
	() => {
		if (app.currentTrack === null || artist.preview_url !== app.currentTrack.url) {
			isPlaying.value = false;
		}
	}
);
</script>
