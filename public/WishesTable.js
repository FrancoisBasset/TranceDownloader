class WishesTable {
	#element

	constructor() {
		this.#element = document.getElementById('wishesTable').getElementsByTagName('tbody')[0];
	}

	addRow(id, artist, track) {
		const row = this.#element.insertRow();
		row.id = 'wish-' + id;
		row.insertCell().innerText = artist;
		row.insertCell().innerText = track;
		row.insertCell().innerHTML = `<button onclick="searchWish('${artist}', '${track}')">Rechercher</button>`;
		row.insertCell().innerHTML = `<button onclick="doneWish(${id})">Done</button>`;
	}

	updateRow(id, artist, track) {
		if (document.getElementById('wish-' + id) != null) {
			document.getElementById('wish-' + id).cells[0].textContent = artist;
			document.getElementById('wish-' + id).cells[1].textContent = track;
		}
	}

	deleteRow(id) {
		document.getElementById('wish-' + id).remove();
	}
}