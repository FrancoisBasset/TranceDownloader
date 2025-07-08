<template>
	<div @scroll="scrollToEveryNoise" ref="list" class="bg-zinc-100 !overflow-scroll rounded-lg h-[80vh] shadow-2xl">
		<div class="sticky top-0 z-10 bg-zinc-100 p-4">
			<div class="relative flex justify-center">
				<div class="flex gap-2">
					<input type="text" v-model="search">
					<button @click="findGenresByName">Rechercher</button>
				</div>
			</div>
		</div>
		
		<button v-for="genre in genres" @click="showArtists(genre)" class="rounded-xl m-1 bg-gray-300" :class="{ 'green-button': genre === selectedGenre}">{{ genre }}</button>
		<div v-for="artist in artists" class="rounded-xl w-auto m-1 p-2 flex flex-row bg-gray-200">
			<div class="w-3/12 text-xl m-5">{{ artist.artist }}</div>
			<div class="w-3/12 text-xl m-5">{{ artist.title }}</div>
			<div class="w-3/12">
				<audio class="rounded-full text-black opacity-20" style="background-color: lightblue; width: 300px;" controls :src="artist.preview_url"></audio>
			</div>
			<div class="w-1/12">
				<button @click="searchOnYoutube(artist.artist + ' ' + artist.title)">Rechercher</button>
			</div>
		</div>
	</div>
</template>

<script>
import useApp from '@/stores/app';

export default {
	data() {
		return {
			app: useApp(),
			search: '',
			genres: [],
			selectedGenre: '',
			artists: []
		};
	},
	methods: {
		findGenresByName() {
			fetch(import.meta.env.VITE_API + '/everynoise/genres?name=' + this.search)
				.then(res => res.json())
				.then(json => {
					this.genres = json;
				});
		},
		showArtists(genre) {
			this.selectedGenre = genre;

			fetch(import.meta.env.VITE_API + '/everynoise/genres/' + genre)
				.then(res => res.json())
				.then(json => {
					this.artists = json;
				});
		},
		getRandomColor() {
			const letters = '0123456789ABCDEF';
			let color = '#';
			for (let i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}

			return color;
		},
		scrollToEveryNoise() {
			this.scrollTop = this.$refs.list.scrollTop;
			this.app.goTo('everynoise');
		},
		searchOnYoutube(search) {
			this.app.goTo('youtube');
			this.app.youtubeSearch = search;
		}
	}
};
</script>
