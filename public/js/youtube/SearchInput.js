import VideosTable from './VideosTable.js';

export default class SearchInput {
	static #element = document.getElementById('searchInput');

	static {
		this.#element.onkeydown = (e) => {
			if (e.key === 'Enter') {
				this.search(this.#element.value);
			}
		};
	}

	static search(value) {
		fetch('/trancedownloader/youtube?search=' + value).then(function(response) {
			response.json().then(function(json) {
				VideosTable.clear();
	
				for (const video of json.response) {
					VideosTable.addVideo(video.title, video.image, video.channel, video.views, video.url);
				}
			});
		});
	}

	static getValue() {
		return this.#element.value;
	}
}
