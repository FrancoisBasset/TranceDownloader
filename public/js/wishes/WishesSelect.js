import { updateForm } from './wishes.js';

export default class WishesSelect {
	static #element = null;

	static {
		this.#element = document.getElementById('wishesSelect');
		this.#element.onclick = updateForm;
	}

	static addOption(id, artist, track, done) {
		const option = new Option(
			artist + ' ' + track,
			JSON.stringify({
				id: id,
				artist: artist,
				track: track,
				done: done
			})
		);
		option.id = 'wish_option_' + id;
		
		if (done) {
			option.style.color = 'red';
		}

		this.#element.add(option);
	}

	static updateOption(id, artist, track, done) {
		for (const element of this.#element.options) {
			const wish = JSON.parse(element.value);
				
			if (id === wish.id) {
				wish.artist = artist;
				wish.track = track;
				wish.done = done;

				element.text = artist + ' ' + track;
				element.value = JSON.stringify(wish);
				if (done) {
					element.style.color = 'red';
				} else {
					element.style.color = '';
				}
				break;
			}
		}
	}

	static clearOption() {
		this.#element.selectedIndex = 0;
	}

	static clear() {
		const length = this.#element.length;
	
		for (let i = 0; i < length; i++) {
			this.#element.remove(1);
		}
	}

	static getValue() {
		return this.#element.value;
	}
}
