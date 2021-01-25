var wishesTable = document.getElementById('wishesTable').getElementsByTagName('tbody')[0];
var artistInput = document.getElementById('artistInput');
var trackInput = document.getElementById('trackInput');

fetch('/wishes').then(function(response) {
	response.json().then(function(json) {
		for (const wish of json.response) {
			if (!wish.done) {
				addRow(wish.id, wish.artist, wish.track, wish.done);
			}
		}
	});
});

function addRow(id, artist, track, done) {
	const row = wishesTable.insertRow();
	row.id = 'wish-' + id;
	row.insertCell().innerText = artist;
	row.insertCell().innerText = track;
	
	if (done) {
		row.insertCell().innerHTML = '<input type="checkbox" onclick="return false" checked />';
	} else {
		row.insertCell().innerHTML = '<input type="checkbox" onclick="return false" />';
	}

	row.insertCell().innerHTML = `<button onclick="searchWish('${artist}', '${track}')">Rechercher</button>`;
	row.insertCell().innerHTML = `<button onclick="doneWish(${id})">Done</button>`;
}

function searchWish(artist, track) {
	console.log('Search ' + artist + ' ' + track + ' on youtube');
}

function doneWish(id) {
	fetch('/wishes/done/' + id, {
		method: 'PUT'
	}).then(function(response) {
		document.getElementById('wish-' + id).remove();
	});
}

function addWish() {
	fetch('/wishes', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			artist: artistInput.value,
			track: trackInput.value
		})
	}).then(function(response) {
		response.json().then(function(json) {
			artistInput.value = '';
			trackInput.value = '';

			addRow(json.response.id, json.response.artist, json.response.track, json.response.done);
		});
	});
}