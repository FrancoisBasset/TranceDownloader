import Definitions from './Definitions.js';
import TrackSelector from './TrackSelector.js';
import DefinitionsInput from './DefinitionsInput.js';

export default class DefinitionsSelect {
	static #element = document.getElementById('definitionsSelect');

	static {
		for (const tag of Definitions) {
			const option = new Option(tag, tag);
			this.#element.add(option);
		}

		this.#element.onclick = () => {
			const selectedTrack = TrackSelector.getCurrentTrack();

			if (selectedTrack !== null) {
				DefinitionsInput.value = selectedTrack[this.#element.value] ?? '';
			}
		};
	}

	static getValue() {
		return this.#element.value;
	}

	static getOptions() {
		return this.#element.options;
	}
}
