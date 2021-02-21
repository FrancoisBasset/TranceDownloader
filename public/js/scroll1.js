var trackSelector = null;
var definitionsSelect = document.getElementById('definitionsSelect');
var valueInput = document.getElementById('valueInput');
var updateButton = document.getElementById('updateButton');

fetch('/library').then(function(response) {
	response.json().then(function(json) {
		genres = buildGenres(json.response);
		trackSelector = new TrackSelector(genres);
	});
});

fetch('/library/definitions').then(function(response) {
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

	fetch('/library/', {
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
			console.log(json);
		})
	})
}