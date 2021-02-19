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
	headLabel.style.width = '100%';
	headLabel.style.backgroundColor = getRandomColor();
	genresDiv.innerHTML = '';

	for (const genre of Object.keys(genres)) {
		const genreDiv = document.createElement('div');
		genreDiv.innerText = genre;
		genreDiv.style.padding = '20px';
		genreDiv.style.border = '1px solid black';
		genreDiv.style.color = 'white';
		genreDiv.style.backgroundColor = getRandomColor();

		genreDiv.onclick = function() {
			currentGenre = genreDiv.innerText;
			showArtists();
		}

		genresDiv.appendChild(genreDiv);
	}
}

function showArtists() {
	backButton.style.display = 'inline';
	backButton.style.backgroundColor = getRandomColor();
	backButton.onclick = function() {
		showGenres();
	}
	headLabel.innerText = currentGenre;
	genresDiv.innerHTML = '';

	for (const artist of Object.keys(genres[currentGenre])) {
		const artistDiv = document.createElement('div');
		artistDiv.innerText = artist;
		artistDiv.style.padding = '20px';
		artistDiv.style.border = '1px solid black';
		artistDiv.style.color = 'white';
		artistDiv.style.backgroundColor = getRandomColor();

		artistDiv.onclick = function() {
			currentArtist = artistDiv.innerText;
			showTracks();
		}

		genresDiv.appendChild(artistDiv);
	}
}

function showTracks() {
	backButton.style.display = 'inline';
	backButton.onclick = function() {
		showArtists();
	}
	headLabel.innerText = currentGenre + " > " + currentArtist;
	genresDiv.innerHTML = '';

	for (const track of genres[currentGenre][currentArtist]) {
		const trackDiv = document.createElement('div');
		trackDiv.innerText = track.title;
		trackDiv.style.padding = '20px';
		trackDiv.style.border = '1px solid black';
		trackDiv.style.color = 'white';
		trackDiv.style.backgroundColor = getRandomColor();

		trackDiv.onclick = function() {
			currentTrack = track;
			
			const audio = document.createElement('audio');
			audio.src = currentTrack.url;
			audio.controls = true;
			audio.className = 'scroll';

			genresDiv.appendChild(audio);
		}

		genresDiv.appendChild(trackDiv);
	}
}

function getRandomColor() {
	const r = Math.floor(Math.random() * 75);
	const g = Math.floor(Math.random() * 75);
	const b = Math.floor(Math.random() * 75);

	return `rgb(${r}, ${g}, ${b})`;
}