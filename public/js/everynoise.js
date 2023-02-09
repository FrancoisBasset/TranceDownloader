const genreInput = document.getElementById('genreInput');
const searchButton = document.getElementById('searchButton');
searchButton.onclick = function() {
	showGenres(genreInput.value);
};

showGenres();

function clearTable() {
	const table = document.getElementById('everynoiseTable');

	const length = table.rows.length;
	
	for (let i = 2; i < length; i++) {
		table.deleteRow(2);
	}
}

function showArtists(genre) {
	if (genre.includes('-')) {
		genre = genre.split('-').join('');
	}

	clearTable();

	if (localStorage.getItem('everynoise-' + genre) !== null) {
		showArtistsJson(JSON.parse(localStorage.getItem('everynoise-' + genre)));
		fetch('/trancedownloader/everynoise/genre/' + genre).then(function(response) {
			response.json().then(function(json) {
				localStorage.setItem('everynoise-' + genre, JSON.stringify(json.response));
	
				clearTable();
				showArtistsJson(json.response);
			});
		});
		return;
	}

	fetch('/trancedownloader/everynoise/genre/' + genre).then(function(response) {
		response.json().then(function(json) {
			localStorage.setItem('everynoise-' + genre, JSON.stringify(json.response));

			showArtistsJson(json.response);
		});
	});
}

function showArtistsJson(artists) {
	const table = document.getElementById('everynoiseTable');
	let row = table.insertRow();

	let i = 0;

	for (const artist of artists) {
		i++;

		const cell = row.insertCell();
		cell.innerText = artist.artist;
		cell.style.backgroundColor = getRandomColor();
		if (artist.have === 1) {
			cell.style.color = 'orange';
			cell.style.border = '5px solid orange';
			cell.className = 'blinking';
		} else if (artist.have === 2) {
			cell.style.color = 'green';
			cell.style.border = '5px solid green';
			cell.className = 'blinking';
		}

		cell.onclick = function() {
			if (artist.have === 1 || artist.have === 2) {
				return;
			}

			fetch('/trancedownloader/wishes', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					artist: artist.artist,
					track: artist.track
				})
			});

			fetch('/trancedownloader/wishes', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					artist: artist.artist,
					track: ''
				})
			});

			this.style.color = 'orange';
			this.style.border = '5px solid orange';
			this.className = 'blinking';
		};
		
		if (i % 10 === 0) {
			row = table.insertRow();
		}
	}
}

function showGenres(search = '') {
	clearTable();

	if (localStorage.getItem('everynoise') !== null && search === '') {
		showGenresJson(JSON.parse(localStorage.getItem('everynoise')), search);
		return;
	}

	fetch('/trancedownloader/everynoise/genres').then(function(response) {	
		response.json().then(function(json) {
			localStorage.setItem('everynoise', JSON.stringify(json.response));

			showGenresJson(json.response, search);
		});
	});
}

function showGenresJson(genres, search) {
	const table = document.getElementById('everynoiseTable');
	let row = table.insertRow();

	let i = 0;

	for (const genre of genres) {
		if (!genre.includes(search)) {
			continue;
		}
		
		i++;
	
		let cell = row.insertCell();
		cell.innerText = genre;
		cell.style.backgroundColor = getRandomColor();
		cell.onclick = function() {
			showArtists(genre);
		};
	
		if (i % 10 === 0) {
			row = table.insertRow();
		}
	}
}

function getRandomColor() {
	const r = Math.floor(crypto.getRandomValues(new Uint32Array(1)) / 10000000000 * 105) + 80;
	const g = Math.floor(crypto.getRandomValues(new Uint32Array(1)) / 10000000000 * 105) + 80;
	const b = Math.floor(crypto.getRandomValues(new Uint32Array(1)) / 10000000000 * 105) + 80;

	return `rgb(${r}, ${g}, ${b})`;
}