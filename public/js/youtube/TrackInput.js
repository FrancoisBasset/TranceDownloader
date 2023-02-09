export default class TrackInput {
	static #element = document.getElementById('trackInput');

	static getValue() {
		return this.#element.value;
	}

	static setValue(value) {
		this.#element.value = value;
	}
}