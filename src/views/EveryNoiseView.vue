<template>
	<div>
		<h1>EveryNoise</h1>

		<div>
			<input type="text" v-model="search" />
		</div>

		<div>
			<button @click="showGenres('')">Tous les genres</button>
			<button @click="showGenres('trance')">Trance</button>
			<button @click="showGenres('psy')">Psy</button>
			<button @click="showGenres('hi-tech')">Hi-Tech</button>
			<button @click="showGenres('nitzhonot')">Nitzhonot</button>
			<button @click="showGenres('full on')">Full-on</button>
			<button @click="showGenres('suomisaundi')">Suomisaundi</button>
		</div>

		<table :key="genres" v-if="artists == null">
			<tr v-for="genres_4 in genres" :key="genres_4">
				<td @click="showArtists(genre)" v-for="genre in genres_4" :key="genre" :style="{ backgroundColor: getRandomColor() }">{{ genre }}</td>
			</tr>
		</table>
		<table :key="artists" v-if="artists">
			<tr v-for="artists_4 in artists" :key="artists_4">
				<td @click="addWish(artist)" v-for="artist in artists_4" :key="artist" :style="{ backgroundColor: getRandomColor() }" :class="{'have1': artist.have == 1, 'have2': artist.have == 2}">{{ artist.artist }}</td>
			</tr>
		</table>
	</div>
</template>

<style scoped>
button {
	width: 200px;
}

td {
	padding: 10px;
	cursor: pointer;
}

.have1 {
	color: orange;
	border: 10px solid orange;
	animation: opacity 1s ease-in-out infinite;
    opacity: 1;
}

.have2 {
	color: white;
	border: 10px solid rgb(41, 184, 41);
	animation: opacity 1s ease-in-out infinite;
    opacity: 1;
}
</style>

<script>
import { getRandomColor } from '../utils';

export default {
	data() {
		return {
			genre: null,
			artists: null,
			search: ''
		};
	},
	created() {
		this.fetchGenres();
	},
	methods: {
		getRandomColor,
		fetchGenres() {
			if (localStorage.getItem('genres')) {
				return;
			}

			fetch('http://localhost:3000/trancedownloader/everynoise/genres').then(response => {
				response.json().then(json => {
					localStorage.setItem('genres', JSON.stringify(json.response));
				});
			});
		},
		showGenres(search) {
			this.search = search;
			this.artists = null;
		},
		showArtists(genre) {
			this.genre = genre.split('-').join('');

			if (localStorage.getItem('genre-' + this.genre)) {
				this.artists = JSON.parse(localStorage.getItem('genre-' + this.genre));
				return;
			}

			fetch('http://localhost:3000/trancedownloader/everynoise/genre/' + this.genre).then(response => {
				response.json().then(json => {
					this.artists = [];

					for (let i = 0; i < json.response.length; i += 4) {
						this.artists.push(json.response.slice(i, i + 4));
					}

					localStorage.setItem('genre-' + this.genre, JSON.stringify(this.artists));
				});
			});
		},
		addWish(artist) {
			if (artist.have != 0) {
				return;
			}

			fetch('http://localhost:3000/trancedownloader/wishes', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					artist: artist.artist,
					track: ''
				})
			}).then(() => {
				artist.have = 1;
				localStorage.setItem('genre-' + this.genre, JSON.stringify(this.artists));
			});
		}
	},
	computed: {
		genres() {
			if (localStorage.getItem('genres') == null) {
				return null;
			}
			let result = JSON.parse(localStorage.getItem('genres'));
			if (this.search !== '') {
				result = result.filter(g => g.includes(this.search));
			}

			const genres = [];
			
			for (let i = 0; i < result.length; i += 4) {
				genres.push(result.slice(i, i + 4));
			}
			
			return genres;
		}
	}
};
</script>
