const searchInput = document.getElementById('searchInput');
const videosTable = document.getElementById('videosTable').getElementsByTagName('tbody')[0];

function search() {
	fetch('/youtube?search=' + searchInput.value).then(function(response) {
		response.json().then(function(json) {
			var i = 0;

			for (const video of json.response) {
				const row = videosTable.insertRow();
				row.className = 'scroll';

				var cell = row.insertCell();
				cell.className = 'scroll';
				cell.textContent = video.title;						

				const image = document.createElement('img');
				image.src = video.image;
				image.width = 400;
				image.height = 250;
				image.className = 'scroll';

				cell = row.insertCell();
				cell.appendChild(image);
				cell.className = 'scroll';

				cell = row.insertCell();
				cell.innerText = 'Chaine : ' + video.channel;
				cell.className = 'scroll';

				cell = row.insertCell();
				cell.innerText = video.views;
				cell.className = 'scroll';

				var cell = row.insertCell();
				cell.className = 'scroll';

				const artistLabel = document.createElement('label');
				artistLabel.className = 'scroll';
				artistLabel.innerText = 'Artiste : ';

				const artistInput = document.createElement('input');
				artistInput.className = 'scroll';
				artistInput.id = 'artistInput-' + i;

				const br = document.createElement('br');
				
				const trackLabel = document.createElement('label');
				trackLabel.className = 'scroll';
				trackLabel.innerText = 'Track : ';

				const trackInput = document.createElement('input');
				trackInput.className = 'scroll';
				trackInput.id = 'trackInput-' + i;

				const downloadButton = document.createElement('button');
				downloadButton.className = 'scroll';
				downloadButton.id = 'downloadButton-' + i;
				downloadButton.onclick = function() {
					download(video.url, artistInput.value, trackInput.value);
				};
				downloadButton.innerText = 'Télécharger';

				cell.appendChild(artistLabel);
				cell.appendChild(artistInput);
				cell.appendChild(br);
				cell.appendChild(trackLabel);
				cell.appendChild(trackInput);
				cell.appendChild(downloadButton);

				image.onclick = function() {
					row.deleteCell(1);

					cell = row.insertCell(1);

					const iframe = document.createElement('iframe');
					iframe.width = 400;
					iframe.height = 250;
					iframe.src = 'https://www.youtube.com/embed/' + video.url.split('v=')[1];

					cell.append(iframe);
				}

				i++;
			}
		});
	});
}

function download(url, artist, track) {
	fetch('/youtube', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			url: url,
			artist: artist,
			track: track
		})
	});
}