class GenresList {
	#element
	clicked = false

	constructor() {
		this.#element = document.getElementById('genresList');
	}

	addGenre(genre) {
		const li = document.createElement('li');
		li.id = 'genre-' + genre;
		li.innerText = genre;
		li.className = 'scroll';
		li.onclick = this.#showHide;
	
		li.appendChild(document.createElement('ul'));
		this.#element.appendChild(li);
	}

	addArtist(genre, artist) {
		const liParent = document.getElementById('genre-' + genre);
	
		const li = document.createElement('li');
		li.id = 'genre-' + genre + '_artist' + artist;
		li.innerText = artist;
		li.className = 'scroll';
		li.onclick = this.#showHide;
	
		li.appendChild(document.createElement('ul'));
		liParent.children[0].appendChild(li);
	}

	addTrack(genre, artist, track, url) {
		const liParent = document.getElementById('genre-' + genre + '_artist' + artist);
				
		const li = document.createElement('li');
		li.id = 'artist_' + artist + '-track-' + track;
		li.innerText = track;
		li.dataset.track = JSON.stringify(track);
		li.className = 'scroll';
	
		const audio = document.createElement('audio');
		audio.src = url;
		audio.controls = true;
		audio.className = 'scroll';
	
		liParent.children[0].appendChild(li);
		liParent.children[0].appendChild(audio);
	}

	#showHide(e) {
		//console.log(e);
		if (this.clicked) {
			this.clicked = false;
			return;
		}
	
		this.clicked = true;
		
		if (e.target.children[0].style.display == '') {
			e.target.children[0].style.display = 'none';
		} else {
			e.target.children[0].style.display = '';
		}
	}
}