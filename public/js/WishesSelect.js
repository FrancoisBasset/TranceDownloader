class WishesSelect {
	#element

	constructor() {
		this.#element = document.getElementById('wishesSelect');
	}

	addOption(id, artist, track, done) {
		const option = new Option(
			artist + ' ' + track,
			JSON.stringify({
				id: id,
				artist: artist,
				track: track,
				done: done
			})
		);
		
		if (done) {
			option.style.color = 'red';
		}

		this.#element.add(option);
	}

	updateOption(id, artist, track, done) {
		for (var i = 0; i < this.#element.options.length; i++) {
			const wish = JSON.parse(this.#element.options[i].value);
				
			if (id == wish.id) {
				wish.artist = artist;
				wish.track = track;
				wish.done = done;

				this.#element.options[i].text = artist + ' ' + track;
				this.#element.options[i].value = JSON.stringify(wish);
				if (done) {
					this.#element.options[i].style.color = 'red';
				} else {
					this.#element.options[i].style.color = '';
				}
				break;
			}

			if (wish.done) {
				this.#element.options[i].style.color = 'red';
			} else {
				this.#element.options[i].style.color = '';
			}
		}
	}

	getValue() {
		return this.#element.value;
	}
}