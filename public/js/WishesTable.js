class WishesTable {
	#element

	constructor() {
		this.#element = document.getElementById('wishesTable').getElementsByTagName('tbody')[0];
	}

	addRow(id, artist, track) {
		const row = this.#element.insertRow();
		row.className = 'scroll';
		row.id = 'wish-' + id;
		
		var cell = row.insertCell();
		cell.className = 'scroll';
		cell.innerText = artist;
		
		cell = row.insertCell();
		cell.className = 'scroll';
		cell.innerText = track;
		
		cell = row.insertCell();
		cell.className = 'scroll';
		cell.innerHTML = `<button onclick="searchWish('${artist}', '${track}')">Rechercher</button>`;
		
		cell = row.insertCell();
		cell.className = 'scroll';
		cell.innerHTML = `<button onclick="doneWish(${id})">Done</button>`;
	}

	updateRow(id, artist, track) {
		if (document.getElementById('wish-' + id) != null) {
			document.getElementById('wish-' + id).cells[0].textContent = artist;
			document.getElementById('wish-' + id).cells[1].textContent = track;
			document.getElementById('wish-' + id).cells[2].firstChild.onclick = function() {
				searchWish(artist, track);
			}
		}
	}

	deleteRow(id) {
		document.getElementById('wish-' + id).remove();
	}
}