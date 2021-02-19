var genresList = new GenresList();
var step = 'genre';

var backButton = document.getElementById('backButton');
var headLabel = document.getElementById('headLabel');
var genresDiv = document.getElementById('genresDiv');
var genres = [];
var currentGenre = null;
var currentArtist = null;
var track = null;

fetch('/library').then(function(response) {
	response.json().then(function(json) {
		const tracks = json.response;

		for (const track of tracks) {
			if (genres[track.genre] == null) {
				genres[track.genre] = [];
			}

			if (genres[track.genre][track.artist] == null) {
				genres[track.genre][track.artist] = [];
			}

			genres[track.genre][track.artist].push(track);
		}

		showGenres();
	});
});

function showGenres() {
	backButton.style.display = 'none';
	headLabel.innerText = 'Genres';
	genresDiv.innerHTML = '';

	for (const genre of Object.keys(genres)) {
		const genreDiv = document.createElement('div');
		genreDiv.innerText = genre;
		genreDiv.onclick = function() {
			currentGenre = genreDiv.innerText;
			showArtists();
		}
		genreDiv.style.padding = '20px';
		genreDiv.style.border = '1px solid black';

		genresDiv.appendChild(genreDiv);
	}
}

function showArtists() {
	backButton.style.display = 'block';
	backButton.onclick = function() {
		showGenres();
	}
	headLabel.innerText = currentGenre;
	genresDiv.innerHTML = '';

	for (const artist of Object.keys(genres[currentGenre])) {
		const artistDiv = document.createElement('div');
		artistDiv.innerText = artist;
		artistDiv.onclick = function() {
			currentArtist = artistDiv.innerText;
			showTracks();
		}
		artistDiv.style.padding = '20px';
		artistDiv.style.border = '1px solid black';

		genresDiv.appendChild(artistDiv);
	}
}

function showTracks() {
	backButton.style.display = 'block';
	backButton.onclick = function() {
		showArtists();
	}
	headLabel.innerText = currentArtist;
	genresDiv.innerHTML = '';

	for (const track of genres[currentGenre][currentArtist]) {
		const trackDiv = document.createElement('div');
		trackDiv.innerText = track.title;
		trackDiv.onclick = function() {
			currentTrack = track;
			
			const audio = document.createElement('audio');
			audio.src = currentTrack.url;
			audio.controls = true;
			audio.className = 'scroll';

			genresDiv.appendChild(audio);
		}
		trackDiv.style.padding = '20px';
		trackDiv.style.border = '1px solid black';

		genresDiv.appendChild(trackDiv);
	}
}