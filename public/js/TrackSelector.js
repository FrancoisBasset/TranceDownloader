class TrackSelector {
	#backButton = document.getElementById('backButton');
	#headLabel = document.getElementById('headLabel');
	#genresDiv = document.getElementById('genresDiv');
	#switchButton = document.getElementById('switchButton');
	#currentGenre = null
	#currentArtist = null
	#currentTrack = null
	#genres = []
	#artists = []

	constructor(genresOrArtists, mode) {
		if (mode == 'genres') {
			this.#genres = genresOrArtists;
			this.#showGenres();
		} else {
			this.#artists = genresOrArtists;
			this.#showArtists();
		}
	}

	#showGenres() {
		this.#backButton.style.display = 'none';
		this.#switchButton.style.display = 'inline';

		this.#headLabel.innerText = 'Genres';
		this.#headLabel.style.width = '100%';
		this.#headLabel.style.backgroundColor = this.#getRandomColor();
		this.#switchButton.style.backgroundColor = this.#getRandomColor();
		this.#genresDiv.innerHTML = '';
	
		for (const genre of Object.keys(this.#genres)) {
			const genreDiv = document.createElement('div');
			genreDiv.innerText = genre;
			genreDiv.style.padding = '20px';
			genreDiv.style.color = 'white';
			genreDiv.style.backgroundColor = this.#getRandomColor();
	
			genreDiv.onclick = () => {
				this.#currentGenre = genreDiv.innerText;
				this.#showArtistsFromGenres();
			}
	
			this.#genresDiv.appendChild(genreDiv);
		}
	}

	#showArtistsFromGenres() {
		this.#backButton.style.display = 'inline';
		this.#switchButton.style.display = 'none';
		this.#backButton.style.backgroundColor = this.#getRandomColor();
		this.#backButton.onclick = () => {
			this.#showGenres();
		}
		this.#headLabel.innerText = this.#currentGenre;
		this.#genresDiv.innerHTML = '';
	
		for (const artist of Object.keys(this.#genres[this.#currentGenre])) {
			const artistDiv = document.createElement('div');
			artistDiv.innerText = artist;
			artistDiv.style.padding = '20px';
			artistDiv.style.color = 'white';
			artistDiv.style.backgroundColor = this.#getRandomColor();
	
			artistDiv.onclick = () => {
				this.#currentArtist = artistDiv.innerText;
				this.#showTracksFromGenres();
			}
	
			this.#genresDiv.appendChild(artistDiv);
		}
	}

	#showTracksFromGenres() {
		this.#backButton.style.display = 'inline';
		this.#switchButton.style.display = 'none';
		this.#backButton.onclick = () => {
			this.#showArtistsFromGenres();
		}
		this.#headLabel.innerText = this.#currentGenre + " > " + this.#currentArtist;
		this.#genresDiv.innerHTML = '';
	
		for (const track of this.#genres[this.#currentGenre][this.#currentArtist]) {
			const trackDiv = document.createElement('div');
			trackDiv.innerText = track.title;
			trackDiv.style.padding = '20px';
			trackDiv.style.color = 'white';
			trackDiv.style.backgroundColor = this.#getRandomColor();
	
			trackDiv.onclick = () => {
				this.#currentTrack = track;
				
				const audio = document.getElementById('audio');
				audio.src = this.#currentTrack.url;

				for (const option of definitionsSelect.options) {
					if (Object.keys(this.#currentTrack).includes(option.value)) {
						option.style.color = 'red';
					}
				}
			}
	
			this.#genresDiv.appendChild(trackDiv);
		}
	}

	#showArtists() {
		this.#backButton.style.display = 'none';
		this.#switchButton.style.display = 'inline';
		this.#backButton.style.backgroundColor = this.#getRandomColor();
		this.#switchButton.style.backgroundColor = this.#getRandomColor();
		this.#headLabel.innerText = 'Artistes';
		this.#genresDiv.innerHTML = '';
	
		for (const artist of Object.keys(this.#artists)) {
			const artistDiv = document.createElement('div');
			artistDiv.innerText = artist;
			artistDiv.style.padding = '20px';
			artistDiv.style.color = 'white';
			artistDiv.style.backgroundColor = this.#getRandomColor();
	
			artistDiv.onclick = () => {
				this.#currentArtist = artistDiv.innerText;
				this.#showTracks();
			}
	
			this.#genresDiv.appendChild(artistDiv);
		}
	}

	#showTracks() {
		this.#backButton.style.display = 'inline';
		this.#switchButton.style.display = 'none';
		this.#backButton.onclick = () => {
			this.#showArtists();
		}
		this.#headLabel.innerText = this.#currentArtist;
		this.#genresDiv.innerHTML = '';
	
		for (const track of this.#artists[this.#currentArtist]) {
			const trackDiv = document.createElement('div');
			trackDiv.innerText = track.title;
			trackDiv.style.padding = '20px';
			trackDiv.style.color = 'white';
			trackDiv.style.backgroundColor = this.#getRandomColor();
	
			trackDiv.onclick = () => {
				this.#currentTrack = track;
				
				const audio = document.getElementById('audio');
				audio.src = this.#currentTrack.url;

				for (const option of definitionsSelect.options) {
					if (Object.keys(this.#currentTrack).includes(option.value)) {
						option.style.color = 'red';
					}
				}
			}
	
			this.#genresDiv.appendChild(trackDiv);
		}
	}

	#getRandomColor() {
		const r = Math.floor(Math.random() * 75) + 50;
		const g = Math.floor(Math.random() * 75) + 50;
		const b = Math.floor(Math.random() * 75) + 50;
	
		return `rgb(${r}, ${g}, ${b})`;
	}

	getCurrentTrack() {
		return this.#currentTrack;
	}

	setCurrentTrack(track) {
		this.#currentTrack = track;
	}
}