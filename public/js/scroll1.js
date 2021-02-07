var genresList = new GenresList();

fetch('/library').then(function(response) {
	response.json().then(function(json) {
		const tracks = json.response;

		for (const track of tracks) {
			if (document.getElementById('genre-' + track.genre) == null) {
				genresList.addGenre(track.genre);
			}

			if (document.getElementById('genre-' + track.genre + '_artist' + track.artist) == null) {
				genresList.addArtist(track.genre, track.artist);
			}

			genresList.addTrack(track.genre, track.artist, track.title, track.url);
		}
	});
});