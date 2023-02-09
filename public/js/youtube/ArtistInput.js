export default class ArtistInput {
	static #element = document.getElementById('artistInput');

	static getValue() {
		return this.#element.value;
	}

	static setValue(value) {
		this.#element.value = value;
	}
}