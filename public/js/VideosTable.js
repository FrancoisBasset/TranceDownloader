class VideosTable {
	#element
	#index

	constructor() {
		this.#element = document.getElementById('videosTable').getElementsByTagName('tbody')[0];
		this.#index = 0;
	}

	addVideo(title, image, channel, views, url) {
		const row = this.#element.insertRow();
		row.className = 'scroll';

		var cell = row.insertCell();
		cell.className = 'scroll';
		cell.textContent = title;

		const img = document.createElement('img');
		img.src = image;
		img.width = 400;
		img.height = 250;
		img.className = 'scroll';
		img.onclick = this.#transformToIframe.bind(this, [row, url]);

		cell = row.insertCell();
		cell.appendChild(img);
		cell.className = 'scroll';

		cell = row.insertCell();
		cell.innerText = 'Chaine : ' + channel;
		cell.className = 'scroll';

		cell = row.insertCell();
		cell.innerText = views;
		cell.className = 'scroll';

		var cell = row.insertCell();
		cell.className = 'scroll';

		const artistLabel = document.createElement('label');
		artistLabel.className = 'scroll';
		artistLabel.innerText = 'Artiste : ';

		const artistInput = document.createElement('input');
		artistInput.className = 'scroll';
		artistInput.id = 'artistInput-' + this.#index;

		const br = document.createElement('br');
		
		const trackLabel = document.createElement('label');
		trackLabel.className = 'scroll';
		trackLabel.innerText = 'Track : ';

		const trackInput = document.createElement('input');
		trackInput.className = 'scroll';
		trackInput.id = 'trackInput-' + this.#index;

		const downloadButton = document.createElement('button');
		downloadButton.className = 'scroll';
		downloadButton.id = 'downloadButton-' + this.#index;
		downloadButton.onclick = function() {
			download(url, artistInput.value, trackInput.value);
		};
		downloadButton.innerText = 'Télécharger';

		cell.appendChild(artistLabel);
		cell.appendChild(artistInput);
		cell.appendChild(br);
		cell.appendChild(trackLabel);
		cell.appendChild(trackInput);
		cell.appendChild(downloadButton);

		this.#index++;
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
}