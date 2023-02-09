import TrackSelector from './TrackSelector.js';
import DefinitionsSelect from './DefinitionsSelect.js';

export default class RemoveTagsButton {
	static #element = document.getElementById('removeTagsButton');

	static {
		this.#element.onclick = this.removeTags;
	}

	static removeTags() {
		const selectedTrack = TrackSelector.getCurrentTrack();
		if (selectedTrack === null) {
			return;
		}
	
		const url = selectedTrack.url;
	
		fetch('/trancedownloader/library/', {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				url: url
			})
		});
		
		for (const option of DefinitionsSelect.getOptions()) {
			option.style.color = 'white';
		}
	}
}