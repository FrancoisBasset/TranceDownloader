var genresList = document.getElementById('genresList');

fetch('/library').then(function(response) {
	response.json().then(function(json) {
		const tracks = json.response;

		for (const track of tracks) {
			if (document.getElementById('genre-' + track.genre) == null) {
				addGenre(track.genre);
			}

			if (document.getElementById('genre-' + track.genre + '_artist' + track.artist) == null) {
				addArtist(track.genre, track.artist);
			}

			addTrack(track.genre, track.artist, track.title, track.url);
		}
	});
});

function addGenre(genre) {
	const li = document.createElement('li');
	li.id = 'genre-' + genre;
	li.innerText = genre;
	li.className = 'scroll';
	li.onclick = showHide;

	li.appendChild(document.createElement('ul'));
	genresList.appendChild(li);
}

function addArtist(genre, artist) {
	const liParent = document.getElementById('genre-' + genre);

	const li = document.createElement('li');
	li.id = 'genre-' + genre + '_artist' + artist;
	li.innerText = artist;
	li.className = 'scroll';
	li.onclick = showHide;

	li.appendChild(document.createElement('ul'));
	liParent.children[0].appendChild(li);
}

function addTrack(genre, artist, track, url) {
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

var clicked = false;

function showHide(e) {
	if (clicked) {
		clicked = false;
		return;
	}

	clicked = true;
	
	if (e.target.children[0].style.display == '') {
		e.target.children[0].style.display = 'none';
	} else {
		e.target.children[0].style.display = '';
	}
}