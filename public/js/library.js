var trackSelector = null;
var definitionsSelect = document.getElementById('definitionsSelect');
var valueInput = document.getElementById('valueInput');
var updateButton = document.getElementById('updateButton');

var mode = 'genres';
var switchButton = document.getElementById('switchButton');
switchButton.onclick = function() {
	console.log(mode);
	if (mode == 'genres') {
		switchButton.textContent = 'Artistes';
		mode = 'artists';
	} else {
		switchButton.textContent = 'Genres';
		mode = 'genres';
	}

	loadTracks();
}

loadTracks();

function loadTracks() {
	fetch('/trancedownloader/library').then(function(response) {
		response.json().then(function(json) {
			if (mode == 'genres') {
				var genres = buildGenres(json.response);
				trackSelector = new TrackSelector(genres, mode);
			} else {
				var artists = buildArtists(json.response);
				trackSelector = new TrackSelector(artists, mode);
			}
			
		});
	});
}

fetch('/trancedownloader/library/definitions').then(function(response) {
	response.json().then(function(json) {
		for (const tag of json.response) {
			const option = new Option(tag, tag);
			definitionsSelect.add(option);
		}
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

function buildArtists(tracks) {
	const artists = [];

	for (const track of tracks) {
		if (artists[track.artist] == null) {
			artists[track.artist] = [];
		}

		artists[track.artist].push(track);
	}

	return artists;
}

function showTagValue() {
	const selectedTrack = trackSelector.getCurrentTrack();
	if (selectedTrack != null) {
		const value = selectedTrack[definitionsSelect.value];

		if (value != undefined) {
			valueInput.value = value;
		} else {
			valueInput.value = '';
		}
	}
}

function updateTrack() {
	const selectedTrack = trackSelector.getCurrentTrack();
	if (selectedTrack == null) {
		return;
	}

	const url = selectedTrack.url;
	const tag = definitionsSelect.value;
	const value = valueInput.value;

	if (tag == '') {
		return;
	}

	fetch('/trancedownloader/library/', {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			url: url,
			tag: tag,
			value: value
		})
	}).then(function(response) {
		response.json().then(function(json) {
			trackSelector.setCurrentTrack(json.response);

			for (const option of definitionsSelect.options) {
				if (Object.keys(json.response).includes(option.value)) {
					option.style.color = 'red';
				} else {
					option.style.color = 'white';
				}
			}
		})
	})
}