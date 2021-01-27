var wishesTable = document.getElementById('wishesTable').getElementsByTagName('tbody')[0];
var artistInputAdd = document.getElementById('artistInputAdd');
var trackInputAdd = document.getElementById('trackInputAdd');
var wishesSelect = document.getElementById('wishesSelect');
var artistInputUpdate = document.getElementById('artistInputUpdate');
var trackInputUpdate = document.getElementById('trackInputUpdate');
var backButton = document.getElementById('backButton');

fetch('/wishes').then(function(response) {
	response.json().then(function(json) {
		for (const wish of json.response) {
			if (!wish.done) {
				addRow(wish.id, wish.artist, wish.track);
			}

			addOption(wish.id, wish.artist, wish.track, wish.done);
		}

		updateForm();
	});
});

function addRow(id, artist, track) {
	const row = wishesTable.insertRow();
	row.id = 'wish-' + id;
	row.insertCell().innerText = artist;
	row.insertCell().innerText = track;
	row.insertCell().innerHTML = `<button onclick="searchWish('${artist}', '${track}')">Rechercher</button>`;
	row.insertCell().innerHTML = `<button onclick="doneWish(${id})">Done</button>`;
}

function updateRow(id, artist, track) {
	document.getElementById('wish-' + id).cells[0].textContent = artist;
	document.getElementById('wish-' + id).cells[1].textContent = track;
}

function deleteRow(id) {
	document.getElementById('wish-' + id).remove();
}

function addOption(id, artist, track, done) {
	wishesSelect.add(
		new Option(
			artist + ' ' + track,
			JSON.stringify({
				id: id,
				artist: artist,
				track: track,
				done: done
			})
		)
	);
}

function updateOption(id, artist, track, done)
{
	
}

function searchWish(artist, track) {
	console.log('Search ' + artist + ' ' + track + ' on youtube');
}

function doneWish(id) {
	fetch('/wishes/done/' + id, {
		method: 'PUT'
	}).then(function(response) {
		deleteRow(id);
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
			artist: artistInputAdd.value,
			track: trackInputAdd.value
		})
	}).then(function(response) {
		response.json().then(function(json) {
			artistInputAdd.value = '';
			trackInputAdd.value = '';

			addRow(json.response.id, json.response.artist, json.response.track);
		});
	});
}

function updateForm() {
	const wish = JSON.parse(wishesSelect.value);

	artistInputUpdate.value = wish.artist;
	trackInputUpdate.value = wish.track;

	if (wish.done) {
		backButton.style.display = '';
	} else {
		backButton.style.display = 'none';
	}
}

function updateWish() {
	const wish = JSON.parse(wishesSelect.value);

	fetch('/wishes/' + wish.id, {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			artist: artistInputUpdate.value,
			track: trackInputUpdate.value
		})
	}).then(function(response) {
		response.json().then(function(json) {
			updateRow(json.response.id, json.response.artist, json.response.track);
		});
	});
}

function backWish() {
	const wish = JSON.parse(wishesSelect.value);

	fetch('/wishes/back/' + wish.id, {
		method: 'PUT'
	}).then(function(response) {
		response.json().then(function(json) {
			addRow(json.response.id, json.response.artist, json.response.track);
			for (var i = 0; i < wishesSelect.options.length; i++) {
				const toModify = JSON.parse(wishesSelect.options[i].value);
				
				if (toModify.id = wish.id) {
					toModify.done = false;
					wishesSelect.options[i].value = JSON.stringify(toModify);
					updateForm();
					break;
				}
			}
		});
	});
}