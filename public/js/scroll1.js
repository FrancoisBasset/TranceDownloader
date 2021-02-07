var genresList = document.getElementById('genresList');

fetch('/library').then(function(response) {
	response.json().then(function(json) {
		const tracks = json.response;

		for (const track of tracks) {
			if (document.getElementById('genre-' + track.genre) == null) {
				const genre = document.createElement('li');
				genre.id = 'genre-' + track.genre;
				genre.innerText = track.genre;
				genre.className = 'scroll';
				genre.onclick = showHide;

				genre.appendChild(document.createElement('ul'));
				genresList.appendChild(genre);
			}

			if (document.getElementById('genre-' + track.genre + '_artist' + track.artist) == null) {
				const genre = document.getElementById('genre-' + track.genre);

				const artist = document.createElement('li');
				artist.id = 'genre-' + track.genre + '_artist' + track.artist;
				artist.innerText = track.artist;
				artist.className = 'scroll';
				artist.onclick = showHide;

				artist.appendChild(document.createElement('ul'));
				genre.children[0].appendChild(artist);
			}

			const artist = document.getElementById('genre-' + track.genre + '_artist' + track.artist);
			
			const trackElement = document.createElement('li');
			trackElement.id = 'artist_' + track.artist + '-track-' + track.title;
			trackElement.innerText = track.title;
			trackElement.dataset.track = JSON.stringify(track);
			trackElement.className = 'scroll';

			const audio = document.createElement('audio');
			audio.src = track.url;
			audio.controls = true;
			audio.className = 'scroll';

			artist.children[0].appendChild(trackElement);
			artist.children[0].appendChild(audio);
		}
	});
});

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