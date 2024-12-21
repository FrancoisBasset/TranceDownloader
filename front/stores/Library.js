import { defineStore } from 'pinia';

export default defineStore('Library', {
	state: () => ({
		mode: 'artist',
		tracks: null,
		artists: [],
		genres: [],
		artist: null,
		genre: null,
		ready: false,
		track: null,
		headLabel: '',
		url: ''
	}),
	actions: {
		initTracks() {
			if (this.tracks === null) {
				fetch('/library.json').then(response => {
					response.json().then(tracks => {
						this.artists = this.getArtists(tracks);
						this.genres = this.getGenres(tracks);
						this.ready = true;
					});
				});
			} else {
				this.artists = this.getArtists(this.tracks);
				this.genres = this.getGenres(this.tracks);
			}
		},
		getArtists(tracks) {
			return tracks.reduce((artists, track) => {
				if (artists[track.artist] === undefined) {
					artists[track.artist] = [];
				}
		
				artists[track.artist].push(track);
		
				return artists;
			}, []);
		},
		getGenres(tracks) {
			return tracks.reduce((genres, track) => {
				if (genres[track.genre] === undefined) {
					genres[track.genre] = [];
				}
		
				if (genres[track.genre][track.artist] === undefined) {
					genres[track.genre][track.artist] = [];
				}
		
				genres[track.genre][track.artist].push(track);
		
				return genres;
			}, []);
		}
	}
});
