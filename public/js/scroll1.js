var trackSelector = null;

fetch('/library').then(function(response) {
	response.json().then(function(json) {
		genres = buildGenres(json.response);
		trackSelector = new TrackSelector(genres);
	});
});

function buildGenres(tracks) {
	const genres = [];

	for (const track of tracks) {
		if (genres[track.genre] == null) {
			genres[track.genre] = [];
		}

		if (genres[track.genre][track.artist] == null) {
			genres[track.genre][track.artist] = [];
		}

		genres[track.genre][track.artist].push(track);
	}

	return genres;
}