import { updateFormFromTab, searchWish } from './wishes.js';
import { getRandomColor } from '../utils.js';

export default class WishesTable {
	static #element = document.getElementById('wishesTable').getElementsByTagName('tbody')[0];

	static {
		
	}

	static addRow(id, artist, track) {
		const row = this.#element.insertRow();
		row.id = 'wish-' + id;
		row.onclick = function() {
			updateFormFromTab(id);
		};
		
		let cell = row.insertCell();
		cell.innerText = artist;
		cell.style.backgroundColor = getRandomColor();
		
		cell = row.insertCell();
		cell.innerText = track;
		cell.style.backgroundColor = getRandomColor();
		
		cell = row.insertCell();
		const searchButton = document.createElement('button');
		searchButton.textContent = 'Rechercher';
		searchButton.style.backgroundColor = 'transparent';
		searchButton.style.color = 'white';
		searchButton.onclick = function() {
			searchWish(artist, track);
		};
		cell.appendChild(searchButton);
		cell.style.backgroundColor = getRandomColor();
	}

	static updateRow(id, artist, track) {
		if (document.getElementById('wish-' + id) !== null) {
			document.getElementById('wish-' + id).cells[0].textContent = artist;
			document.getElementById('wish-' + id).cells[1].textContent = track;
			document.getElementById('wish-' + id).cells[2].firstChild.onclick = function() {
				searchWish(artist, track);
			};
		}
	}

	static deleteRow(id) {
		document.getElementById('wish-' + id).remove();
	}

	static clear() {
		const length = this.#element.rows.length;
	
		for (let i = 0; i < length; i++) {
			this.#element.deleteRow(0);
		}
	}
}
