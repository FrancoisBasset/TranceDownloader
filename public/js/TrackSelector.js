class TrackSelector {
	#backButton = document.getElementById('backButton');
	#headLabel = document.getElementById('headLabel');
	#genresDiv = document.getElementById('genresDiv');
	#currentGenre = null
	#currentArtist = null
	#currentTrack = null

	constructor(genres) {
		this.#showGenres(genres);
	}

	#showGenres() {
		this.#backButton.style.display = 'none';

		this.#headLabel.innerText = 'Genres';
		this.#headLabel.style.width = '100%';
		this.#headLabel.style.backgroundColor = this.#getRandomColor();
		this.#genresDiv.innerHTML = '';
	
		for (const genre of Object.keys(genres)) {
			const genreDiv = document.createElement('div');
			genreDiv.innerText = genre;
			genreDiv.style.padding = '20px';
			genreDiv.style.border = '1px solid black';
			genreDiv.style.color = 'white';
			genreDiv.style.backgroundColor = this.#getRandomColor();
	
			genreDiv.onclick = () => {
				this.#currentGenre = genreDiv.innerText;
				this.#showArtists();
			}
	
			this.#genresDiv.appendChild(genreDiv);
		}
	}

	#showArtists() {
		this.#backButton.style.display = 'inline';
		this.#backButton.style.backgroundColor = this.#getRandomColor();
		this.#backButton.onclick = () => {
			this.#showGenres();
		}
		this.#headLabel.innerText = this.#currentGenre;
		this.#genresDiv.innerHTML = '';
	
		for (const artist of Object.keys(genres[this.#currentGenre])) {
			const artistDiv = document.createElement('div');
			artistDiv.innerText = artist;
			artistDiv.style.padding = '20px';
			artistDiv.style.border = '1px solid black';
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
		this.#backButton.onclick = () => {
			this.#showArtists();
		}
		this.#headLabel.innerText = this.#currentGenre + " > " + this.#currentArtist;
		this.#genresDiv.innerHTML = '';
	
		for (const track of genres[this.#currentGenre][this.#currentArtist]) {
			const trackDiv = document.createElement('div');
			trackDiv.innerText = track.title;
			trackDiv.style.padding = '20px';
			trackDiv.style.border = '1px solid black';
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
		const r = Math.floor(Math.random() * 75);
		const g = Math.floor(Math.random() * 75);
		const b = Math.floor(Math.random() * 75);
	
		return `rgb(${r}, ${g}, ${b})`;
	}

	getCurrentTrack() {
		return this.#currentTrack;
	}

	setCurrentTrack(track) {
		this.#currentTrack = track;
	}
}