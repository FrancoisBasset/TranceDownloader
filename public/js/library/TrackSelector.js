import { getRandomColor } from '../utils.js';
import MusicLibrary from './MusicLibrary.js';

await new Promise(resolve => setTimeout(resolve, 100));

export default class TrackSelector {
	static #switchButton = document.getElementById('switchButton');
	static #backButton = document.getElementById('backButton');
	static #headLabel = document.getElementById('headLabel');
	static #genresDiv = document.getElementById('genresDiv');
	static #currentGenre = null;
	static #currentArtist = null;
	static #currentTrack = null;
	static #currentTrackDiv = null;
	static #genres = [];
	static #artists = [];

	static #mode = 'artist';

	static {
		this.#artists = MusicLibrary.artists;
		this.#genres = MusicLibrary.genres;

		if (this.#mode === 'artist') {
			this.#showArtists();
		} else {
			this.#showGenres();
		}

		this.#switchButton.onclick = () => {
			this.#changeMode();
		};
	}

	static #changeMode() {
		if (this.#mode === 'artist') {
			this.#mode = 'genre';
			this.#switchButton.textContent = 'Genres';
			this.#showGenres();
		} else {
			this.#mode = 'artist';
			this.#switchButton.textContent = 'Artistes';
			this.#showArtists();
		}
	}

	static #showGenres() {
		this.#backButton.style.display = 'none';
		this.#switchButton.style.display = 'inline';

		this.#headLabel.innerText = 'Genres';
		this.#headLabel.style.width = '100%';
		this.#headLabel.style.backgroundColor = getRandomColor();
		this.#switchButton.style.backgroundColor = getRandomColor();
		this.#genresDiv.innerHTML = '';
	
		for (const genre of Object.keys(this.#genres)) {
			const genreDiv = document.createElement('div');
			genreDiv.innerText = genre;
			genreDiv.style.padding = '20px';
			genreDiv.style.color = 'white';
			genreDiv.style.backgroundColor = getRandomColor();
	
			genreDiv.onclick = () => {
				this.#currentGenre = genreDiv.innerText;
				this.#showArtistsFromGenres();
			};
	
			this.#genresDiv.appendChild(genreDiv);
		}
	}

	static #showArtistsFromGenres() {
		this.#backButton.style.display = 'inline';
		this.#switchButton.style.display = 'none';
		this.#backButton.style.backgroundColor = getRandomColor();
		this.#backButton.onclick = () => {
			this.#showGenres();
		};
		this.#headLabel.innerText = this.#currentGenre;
		this.#genresDiv.innerHTML = '';
	
		for (const artist of Object.keys(this.#genres[this.#currentGenre])) {
			const artistDiv = document.createElement('div');
			artistDiv.innerText = artist;
			artistDiv.style.padding = '20px';
			artistDiv.style.color = 'white';
			artistDiv.style.backgroundColor = getRandomColor();
	
			artistDiv.onclick = () => {
				this.#currentArtist = artistDiv.innerText;
				this.#showTracksFromGenres();
			};
	
			this.#genresDiv.appendChild(artistDiv);
		}
	}

	static #showTracksFromGenres() {
		this.#backButton.style.display = 'inline';
		this.#switchButton.style.display = 'none';
		this.#backButton.onclick = () => {
			this.#showArtistsFromGenres();
		};
		this.#headLabel.innerText = `${this.#currentGenre} > ${this.#currentArtist}`;
		this.#genresDiv.innerHTML = '';
	
		for (const track of this.#genres[this.#currentGenre][this.#currentArtist]) {
			const trackDiv = document.createElement('div');
			trackDiv.innerText = track.title;
			trackDiv.style.padding = '20px';
			trackDiv.style.color = 'white';
			trackDiv.style.backgroundColor = getRandomColor();
	
			trackDiv.onclick = () => {
				this.#onTrackSelected(track, trackDiv);
			};
	
			this.#genresDiv.appendChild(trackDiv);
		}
	}

	static #showArtists() {
		this.#backButton.style.display = 'none';
		this.#switchButton.style.display = 'inline';
		this.#backButton.style.backgroundColor = getRandomColor();
		this.#switchButton.style.backgroundColor = getRandomColor();
		this.#headLabel.style.backgroundColor = getRandomColor();
		this.#headLabel.style.width = '100%';
		this.#headLabel.innerText = 'Artistes';
		this.#genresDiv.innerHTML = '';
	
		for (const artist of Object.keys(this.#artists)) {
			const artistDiv = document.createElement('div');
			artistDiv.innerText = artist;
			artistDiv.style.padding = '20px';
			artistDiv.style.color = 'white';
			artistDiv.style.backgroundColor = getRandomColor();
	
			artistDiv.onclick = () => {
				this.#currentArtist = artistDiv.innerText;
				this.#showTracks();
			};
	
			this.#genresDiv.appendChild(artistDiv);
		}
	}

	static #showTracks() {
		this.#backButton.style.display = 'inline';
		this.#switchButton.style.display = 'none';
		this.#backButton.onclick = () => {
			this.#showArtists();
		};
		this.#headLabel.innerText = this.#currentArtist;
		this.#genresDiv.innerHTML = '';
	
		for (const track of this.#artists[this.#currentArtist]) {
			const trackDiv = document.createElement('div');
			trackDiv.innerText = track.title;
			trackDiv.style.padding = '20px';
			trackDiv.style.color = 'white';
			trackDiv.style.backgroundColor = getRandomColor();
	
			trackDiv.onclick = () => {
				this.#onTrackSelected(track, trackDiv);
			};
	
			this.#genresDiv.appendChild(trackDiv);
		}
	}

	static #onTrackSelected(track, trackDiv) {
		this.#currentTrack = track;
		this.#currentTrackDiv = trackDiv;
				
		const audio = document.getElementById('audio');
		audio.src = this.#currentTrack.url;

		for (const option of definitionsSelect.options) {
			if (Object.keys(this.#currentTrack).includes(option.value)) {
				option.style.color = 'red';
			}
		}
	}

	static async reload() {
		MusicLibrary.reload();
		await new Promise(resolve => setTimeout(resolve, 10));

		this.#artists = MusicLibrary.artists;
		this.#genres = MusicLibrary.genres;
	}

	static getCurrentTrack() {
		return this.#currentTrack;
	}

	static setCurrentTrack(track) {
		this.#currentTrack = track;
		this.#currentTrackDiv.innerText = track.title;
		if (this.#mode === 'artist') {
			this.#headLabel.textContent = track.artist;
		} else {
			this.#headLabel.textContent = track.genre + ' > ' + track.artist;
		}
	}
}
