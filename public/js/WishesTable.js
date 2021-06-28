class WishesTable {
	#element

	constructor() {
		this.#element = document.getElementById('wishesTable').getElementsByTagName('tbody')[0];
	}

	addRow(id, artist, track) {
		const row = this.#element.insertRow();
		row.id = 'wish-' + id;
		
		var cell = row.insertCell();
		cell.innerText = artist;
		cell.style.backgroundColor = this.#getRandomColor();
		
		cell = row.insertCell();
		cell.innerText = track;
		cell.style.backgroundColor = this.#getRandomColor();
		
		cell = row.insertCell();
		cell.innerHTML = `<button style="color: white; background-color: transparent" onclick="searchWish('${artist}', '${track}')">Rechercher</button>`;
		cell.style.backgroundColor = this.#getRandomColor();
		
		cell = row.insertCell();
		cell.innerHTML = `<button style="color: white; background-color: transparent" onclick="doneWish(${id})">Done</button>`;
		cell.style.backgroundColor = this.#getRandomColor();
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

	#getRandomColor() {
		const r = Math.floor(Math.random() * 75) + 50;
		const g = Math.floor(Math.random() * 75) + 50;
		const b = Math.floor(Math.random() * 75) + 50;
	
		return `rgb(${r}, ${g}, ${b})`;
	}
}