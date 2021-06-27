var wishesTable = new WishesTable();
var wishesSelect = new WishesSelect();

var artistInputAdd = document.getElementById('artistInputAdd');
var trackInputAdd = document.getElementById('trackInputAdd');

var artistInputUpdate = document.getElementById('artistInputUpdate');
var trackInputUpdate = document.getElementById('trackInputUpdate');

var backButton = document.getElementById('backButton');

fetch('/trancedownloader/wishes').then(function(response) {
	response.json().then(function(json) {
		for (const wish of json.response) {
			if (!wish.done) {
				wishesTable.addRow(wish.id, wish.artist, wish.track);
			}

			wishesSelect.addOption(wish.id, wish.artist, wish.track, wish.done);
		}

		updateForm();
	});
});

function searchWish(artist, track) {
	window.location.href = '/youtube.html?search=' + artist + ' ' + track;
}

function doneWish(id) {
	fetch('/trancedownloader/wishes/done/' + id, {
		method: 'PUT'
	}).then(function(response) {
		response.json().then(function(json) {
			wishesTable.deleteRow(id);
			wishesSelect.updateOption(json.response.id, json.response.artist, json.response.track, json.response.done);
			updateForm();
		});
	});
}

function addWish() {
	fetch('/trancedownloader/wishes', {
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

			wishesTable.addRow(json.response.id, json.response.artist, json.response.track);
			wishesSelect.addOption(json.response.id, json.response.artist, json.response.track, json.response.done);
		});
	});
}

function updateForm() {
	if (wishesSelect.getValue() == '') {
		return;
	}

	const wish = JSON.parse(wishesSelect.getValue());

	artistInputUpdate.value = wish.artist;
	trackInputUpdate.value = wish.track;

	if (wish.done) {
		backButton.style.display = '';
	} else {
		backButton.style.display = 'none';
	}
}

function updateWish() {
	const wish = JSON.parse(wishesSelect.getValue());

	fetch('/trancedownloader/wishes/' + wish.id, {
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
			wishesTable.updateRow(json.response.id, json.response.artist, json.response.track);
			wishesSelect.updateOption(json.response.id, json.response.artist, json.response.track, json.response.done);
		});
	});
}

function backWish() {
	const wish = JSON.parse(wishesSelect.getValue());

	fetch('/trancedownloader/wishes/back/' + wish.id, {
		method: 'PUT'
	}).then(function(response) {
		response.json().then(function(json) {
			wishesTable.addRow(json.response.id, json.response.artist, json.response.track);
			wishesSelect.updateOption(json.response.id, json.response.artist, json.response.track, json.response.done);
			updateForm();
		});
	});
}