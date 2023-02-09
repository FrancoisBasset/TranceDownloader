export default class GenreSelect {
	static #element = document.getElementById('genreSelect');

	static getValue() {
		return this.#element.value;
	}
}
