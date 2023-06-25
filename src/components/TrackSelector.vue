<template>
	<div id="track-selector">
		<div id="bar">
			<button v-if="artist || genre" @click="onBackClicked()" id="back" :style="{ backgroundColor: getRandomColor() }">◀</button>
			<label id="headLabel" :style="{ backgroundColor: getRandomColor() }">{{ headLabel }}</label>
			<button @click="changeMode()" id="switch" :style="{ backgroundColor: getRandomColor() }">
				<text v-if="mode == 'genre'">Artistes</text>
				<text v-else>Genres</text>
			</button>
		</div>
		<div v-if="mode === 'artist' && artist === null">
			<div v-for="element in Object.keys(elements)" :key="element"
				@click="onArtistClicked(element)"
				class="element"
				:style="{ backgroundColor: getRandomColor() }">
				{{ element }}
			</div>
		</div>
		
		<div v-if="mode === 'artist' && artist !== null">
			<div v-for="element in elements" :key="element"
				@click="onTrackClicked(element)"
				class="element"
				:style="{ backgroundColor: getRandomColor() }">
				{{  element.title }}
			</div>
		</div>

		<div v-if="mode === 'genre' && genre === null">
			<div v-for="element in Object.keys(elements)" :key="element"
				@click="onGenreClicked(element)"
				class="element"
				:style="{ backgroundColor: getRandomColor() }">
				{{ element }}
			</div>
		</div>

		<div v-if="mode === 'genre' && genre !== null && artist === null">
			<div v-for="element in Object.keys(elements)" :key="element"
				@click="onGenreArtistClicked(element)"
				class="element"
				:style="{ backgroundColor: getRandomColor() }">
				{{ element }}
			</div>
		</div>

		<div v-if="mode === 'genre' && artist !== null">
			<div v-for="element in elements" :key="element"
				@click="onTrackClicked(element)"
				class="element"
				:style="{ backgroundColor: getRandomColor() }">
				{{ element.title }}
			</div>
		</div>
	</div>
</template>

<style scoped>
#track-selector {
	width: 40%;
	height: 80%;

	cursor: pointer;
	overflow: scroll;
}

#bar {
	width: 100%;
	height: 5%;

	display: inline-flex;
}

#back {
	width: 20%;
	height: 100%;
	color: white;
	border: none;
	outline: none;

	cursor: pointer;
}

#headLabel {
	width: 100%;
	text-align: center;

	font-size: 20px;
	vertical-align: middle;

	padding-top: 8px;
}

#switch {
	margin: 0px;
	padding: 0px;

	width: 100px;
	height: 100%;

	color: white;
}

.element {
	padding: 20px;
	color: white;	
}
</style>

<script>
import { getRandomColor } from '../utils';
import useLibraryStore from '../stores/Library';

export default {
	data() {
		return {
			mode: 'artist',
			library: useLibraryStore(),
			artist: null,
			genre: null,
			elements: [],
			headLabel: ''
		};
	},
	mounted() {
		this.showArtists();
	},
	methods: {
		getRandomColor,
		changeMode() {
			if (this.mode === 'artist') {
				this.mode = 'genre';
				this.showGenres();
			} else {
				this.mode = 'artist';
				this.showArtists();
			}
		},
		showArtists() {
			this.artist = null;
			this.genre = null;
			this.elements = this.library.artists;
			this.headLabel = 'Artistes';
		},
		showGenres() {
			this.artist = null;
			this.genre = null;
			this.elements = this.library.genres;
			this.headLabel = 'Genres';
		},
		showGenresArtists() {
			this.artist = null;
			this.elements = this.library.genres[this.genre];
			this.headLabel = 'Genres > ' + this.genre;
		},
		onBackClicked() {
			if (this.mode === 'artist') {
				this.showArtists();
			} else {
				if (this.genre && this.artist) {
					this.showGenresArtists();
				} else {
					this.showGenres();
				}
			}
		},
		onArtistClicked(artist) {
			this.artist = artist;
			this.elements = this.library.artists[artist];
			this.headLabel = 'Artistes > ' + artist;
		},
		onTrackClicked(track) {
			this.library.track = track;
		},
		onGenreClicked(genre) {
			this.genre = genre;
			this.elements = this.library.genres[genre];
			this.headLabel = 'Genres > ' + genre;
		},
		onGenreArtistClicked(artist) {
			this.artist = artist;
			this.elements = this.library.genres[this.genre][artist];
			this.headLabel = 'Genres > ' + this.genre + ' > ' + artist;
		}
	}
};
</script>
