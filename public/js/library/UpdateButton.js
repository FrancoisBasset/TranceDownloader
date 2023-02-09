import TrackSelector from './TrackSelector.js';
import DefinitionsSelect from './DefinitionsSelect.js';
import DefinitionsInput from './DefinitionsInput.js';

export default class UpdateButton {
	static #element = document.getElementById('updateButton');

	static {
		this.#element.onclick = this.updateTrack;
	}

	static updateTrack() {
		const selectedTrack = TrackSelector.getCurrentTrack();
		if (selectedTrack === null) {
			return;
		}
	
		if (DefinitionsSelect.getValue() === '') {
			return;
		}
	
		fetch('/trancedownloader/library/', {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				url: selectedTrack.url,
				tag: DefinitionsSelect.getValue(),
				value: DefinitionsInput.value
			})
		}).then(function(response) {
			response.json().then(function(json) {
				TrackSelector.setCurrentTrack(json.response);
				TrackSelector.reload();
	
				for (const option of DefinitionsSelect.getOptions()) {
					if (Object.keys(json.response).includes(option.value)) {
						option.style.color = 'red';
					} else {
						option.style.color = 'white';
					}
				}
			});
		});
	}
}
