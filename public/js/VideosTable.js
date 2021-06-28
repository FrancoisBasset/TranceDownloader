class VideosTable {
	#element
	#selectedUrl

	constructor() {
		this.#element = document.getElementById('videosTable').getElementsByTagName('tbody')[0];
	}

	addVideo(title, image, channel, views, url) {
		const row = this.#element.insertRow();

		var cell = row.insertCell();
		cell.textContent = title;

		const img = document.createElement('img');
		img.src = image;
		img.width = 400;
		img.height = 250;
		img.onclick = this.#transformToIframe.bind(this, [row, url]);

		cell = row.insertCell();
		cell.appendChild(img);

		cell = row.insertCell();
		cell.innerText = 'Chaine : ' + channel;

		cell = row.insertCell();
		cell.innerText = views;

		row.onclick = () => {
			this.#selectedUrl = url;

			for (const tr of this.#element.children) {
				tr.style.backgroundColor = '';
			}
			row.style.backgroundColor = 'rgb(60, 80, 190)';
		};
	}

	clear() {
		var length = this.#element.rows.length
		for (var i = 0; i < length; i++) {
			this.#element.deleteRow(0);
		}
	}

	#transformToIframe(args, event) {
		const row = args[0];
		const url = args[1];
		
		row.deleteCell(1);
	
		const cell = row.insertCell(1);
	
		const iframe = document.createElement('iframe');
		iframe.width = 400;
		iframe.height = 250;
		iframe.src = 'https://www.youtube.com/embed/' + url.split('v=')[1];
	
		cell.append(iframe);
	}

	getSelectedUrl() {
		return this.#selectedUrl;
	}
}