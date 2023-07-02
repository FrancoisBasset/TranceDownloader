<template>
	<div id="track-selector" :class="{'middle-width': library.track, 'full-width': !library.track }">
		<div id="bar">
			<button v-if="library.artist || library.genre" @click="onBackClicked()" id="back" :style="{ backgroundColor: getRandomColor() }">◀</button>
			<label id="headLabel" :style="{ backgroundColor: getRandomColor() }">{{ library.headLabel }}</label>
			<button @click="changeMode()" id="switch" :style="{ backgroundColor: getRandomColor() }">
				<text v-if="library.mode === 'genre'">Artistes</text>
				<text v-else>Genres</text>
			</button>
		</div>
		<div v-if="library.mode === 'artist' && library.artist === null">
			<div v-for="element in Object.keys(elements)" :key="element"
				@click="onArtistClicked(element)"
				class="element"
				:style="{ backgroundColor: getRandomColor() }">
				{{ element }}
			</div>
		</div>
		
		<div v-if="library.mode === 'artist' && library.artist !== null">
			<div v-for="element in elements" :key="element"
				@click="onTrackClicked(element)"
				class="element"
				:style="{ backgroundColor: getRandomColor() }">
				{{  element.title }}
			</div>
		</div>

		<div v-if="library.mode === 'genre' && library.genre === null">
			<div v-for="element in Object.keys(elements)" :key="element"
				@click="onGenreClicked(element)"
				class="element"
				:style="{ backgroundColor: getRandomColor() }">
				{{ element }}
			</div>
		</div>

		<div v-if="library.mode === 'genre' && library.genre !== null && library.artist === null">
			<div v-for="element in Object.keys(elements)" :key="element"
				@click="onGenreArtistClicked(element)"
				class="element"
				:style="{ backgroundColor: getRandomColor() }">
				{{ element }}
			</div>
		</div>

		<div v-if="library.mode === 'genre' && library.artist !== null">
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
.full-width {
	width: 90%;
}

.middle-width {
	width: 40%;
}

#track-selector {
	height: 70%;

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
	margin: 0;

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
	margin: 0;
	padding: 0;

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
			library: useLibraryStore(),
			elements: [],
		};
	},
	mounted() {
		this.showArtists();
	},
	methods: {
		getRandomColor,
		changeMode() {
			if (this.library.mode === 'artist') {
				this.library.mode = 'genre';
				this.showGenres();
			} else {
				this.library.mode = 'artist';
				this.showArtists();
			}
		},
		showArtists() {
			this.library.artist = null;
			this.library.genre = null;
			this.elements = this.library.artists;
			this.library.headLabel = 'Artistes';
		},
		showGenres() {
			this.library.artist = null;
			this.library.genre = null;
			this.elements = this.library.genres;
			this.library.headLabel = 'Genres';
		},
		showGenresArtists() {
			this.library.artist = null;
			this.elements = this.library.genres[this.library.genre];
			this.library.headLabel = 'Genres > ' + this.library.genre;
		},
		onBackClicked() {
			if (this.library.mode === 'artist') {
				this.showArtists();
			} else {
				if (this.library.genre && this.library.artist) {
					this.showGenresArtists();
				} else {
					this.showGenres();
				}
			}
			this.library.track = null;
		},
		onArtistClicked(artist) {
			this.library.artist = artist;
			this.elements = this.library.artists[artist];
			this.library.headLabel = 'Artistes > ' + artist;
		},
		onTrackClicked(track) {
			this.library.track = track;
			if (this.library.track) {
				this.library.url = track.url;
			}
		},
		onGenreClicked(genre) {
			this.library.genre = genre;
			this.elements = this.library.genres[genre];
			this.library.headLabel = 'Genres > ' + genre;
		},
		onGenreArtistClicked(artist) {
			this.library.artist = artist;
			this.elements = this.library.genres[this.library.genre][artist];
			this.library.headLabel = 'Genres > ' + this.library.genre + ' > ' + artist;
		}
	}
};
</script>
