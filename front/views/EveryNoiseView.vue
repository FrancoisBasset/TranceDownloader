<template>
	<BlockView @scroll="scrollToEveryNoise" ref="list">
		<div class="sticky top-0 z-10 bg-zinc-100 p-4">
			<div class="relative flex justify-center">
				<div class="flex gap-2">
					<input type="text" v-model="search" placeholder="Rechercher un genre musical" />
					<button @click="findGenresByName" :class="{ 'green-button': search.trim() !== '' }">Rechercher</button>
					<button v-if="search.trim() !== ''" @click="resetForm" class="red-button">Effacer</button>
				</div>
			</div>
		</div>

		<button v-for="genre in genres" @click="showArtists(genre)" class="m-1 bg-gray-300" :class="{ 'green-button': genre === selectedGenre }">{{ genre }}</button>
		<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center my-4">
			<EveryNoiseArtist v-for="artist in artists" :key="artist" :artist="artist" />
		</div>
	</BlockView>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue';
import BlockView from '@/components/BlockView.vue';
import EveryNoiseArtist from '@/components/EveryNoiseArtist.vue';
import useApp from '@/stores/app';

const app = useApp();

const list = useTemplateRef('list');

const search = ref('');
const genres = ref([]);
const selectedGenre = ref(null);
const artists = ref([]);

function findGenresByName() {
	fetch(import.meta.env.VITE_API + '/everynoise/genres?name=' + search.value)
		.then(res => res.json())
		.then(json => {
			genres.value = json;
			artists.value = [];
			selectedGenre.value = null;
		});
}

function resetForm() {
	search.value = '';
	genres.value = [];
	selectedGenre.value = null;
	artists.value = [];

	if (app.currentTrack.url.includes('mp3-preview')) {
		app.currentTrack = null;
	}
}

function showArtists(genre) {
	selectedGenre.value = genre;

	fetch(import.meta.env.VITE_API + '/everynoise/genres/' + genre)
		.then(res => res.json())
		.then(json => {
			artists.value = json;
		});
}

function scrollToEveryNoise() {
	app.goTo('everynoise');
}
</script>
