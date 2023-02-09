import WishesTable from './WishesTable.js';
import WishesSelect from './WishesSelect.js';

var wishesTable = new WishesTable();
var wishesSelect = new WishesSelect();

var artistInputAdd = document.getElementById('artistInputAdd');
var trackInputAdd = document.getElementById('trackInputAdd');

var artistInputUpdate = document.getElementById('artistInputUpdate');
var trackInputUpdate = document.getElementById('trackInputUpdate');

var addWishButton = document.getElementById('addWishButton');
addWishButton.onclick = addWish;
var updateWishButton = document.getElementById('updateWishButton');
updateWishButton.onclick = updateWish;
var deleteWishButton = document.getElementById('deleteWishButton');
deleteWishButton.onclick = deleteWish;
var initWishesButton = document.getElementById('initWishesButton');
initWishesButton.onclick = initWishes;

loadWishes();

function loadWishes() {
	if (localStorage.getItem('wishes') !== null) {
		loadWishesJson(JSON.parse(localStorage.getItem('wishes')));
		updateWishes();
		return;
	}

	updateWishes();
}

function loadWishesJson(wishes) {
	wishesTable.clear();
	wishesSelect.clear();

	wishes = wishes.sort((wish1, wish2) => {
		return wish1.artist.localeCompare(wish2.artist) || wish1.track.localeCompare(wish2.track);
	});

	for (const wish of wishes) {
		if (!wish.done) {
			wishesTable.addRow(wish.id, wish.artist, wish.track);
		}

		wishesSelect.addOption(wish.id, wish.artist, wish.track, wish.done);
	}

	updateForm();
}

export function searchWish(artist, track) {
	window.location.href = '/youtube.html?search=' + artist + ' ' + track;
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

export function updateFormFromTab(id) {
	document.getElementById('wish_option_' + id).selected = true;
	
	updateForm();
}

export function updateForm() {
	if (wishesSelect.getValue() === '') {
		return;
	}

	const wish = JSON.parse(wishesSelect.getValue());

	artistInputUpdate.value = wish.artist;
	trackInputUpdate.value = wish.track;
}

function clearForm() {
	artistInputUpdate.value = '';
	trackInputUpdate.value = '';
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

function deleteWish() {
	const wish = JSON.parse(wishesSelect.getValue());

	fetch('/trancedownloader/wishes/' + wish.id, {
		method: 'DELETE'
	}).then(function(response) {
		response.json().then(function(json) {
			wishesTable.deleteRow(wish.id);
			wishesSelect.clearOption();
			clearForm();
		});
	});
}

function updateWishes() {
	fetch('/trancedownloader/wishes').then(function(response) {
		response.json().then(function(json) {
			localStorage.setItem('wishes', JSON.stringify(json.response));

			loadWishesJson(json.response);
		});
	});
}

function initWishes() {
	fetch('/trancedownloader/wishes', {
		method: 'PATCH'
	});
}