<template>
	<BlockView @scroll="scrollToEveryNoise" ref="list">
		<div class="sticky top-0 z-10 bg-zinc-100 p-4">
			<div class="relative flex justify-center">
				<div class="flex gap-2">
					<input type="text" v-model="search" />
					<button @click="findGenresByName">Rechercher</button>
				</div>
			</div>
		</div>

		<button v-for="genre in genres" @click="showArtists(genre)" class="m-1 bg-gray-300" :class="{ 'green-button': genre === selectedGenre }">{{ genre }}</button>
		<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center my-4">
			<EveryNoiseArtist v-for="artist in artists" :key="artist" :artist="artist" />
		</div>
	</BlockView>
</template>

<script>
import BlockView from '@/components/BlockView.vue';
import EveryNoiseArtist from '@/components/EveryNoiseArtist.vue';
import useApp from '@/stores/app';

export default {
	components: { BlockView, EveryNoiseArtist },
	data() {
		return {
			search: '',
			genres: [],
			selectedGenre: null,
			artists: []
		};
	},
	setup: () => ({
		app: useApp()
	}),
	methods: {
		findGenresByName() {
			fetch(import.meta.env.VITE_API + '/everynoise/genres?name=' + this.search)
				.then(res => res.json())
				.then(json => {
					this.genres = json;
					this.artists = [];
					this.selectedGenre = null;
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
		scrollToEveryNoise() {
			this.scrollTop = this.$refs.list.scrollTop;
			this.app.goTo('everynoise');
		}
	}
};
</script>
