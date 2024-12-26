const fs = require('fs');
const jsdom = require('jsdom').JSDOM;

const wishesService = require('@/classes/wishes');

module.exports.getGenres = () => {
	const genres = [];

	return jsdom.fromURL('https://everynoise.com/').then(response => {
		const items = response.window.document.querySelectorAll('[id*=item]');

		items.forEach(item => {
			genres.push(item.textContent.replace('» ', ''));
		});

		genres.sort();

		return genres;
	});
};

module.exports.getArtists = genre => {
	genre = genre.split(' ').join('');

	const artists = [];

	const wishes = wishesService.getWishes();
	const tracks = JSON.parse(fs.readFileSync('public/library.json'));

	return jsdom.fromURL('https://everynoise.com/engenremap-' + genre + '.html').then(response => {
		const items = response.window.document.querySelectorAll('[id*=item]');

		items.forEach(item => {
			const text = item.title.replace('e.g. ', '');
			const artist = text.split(' "')[0];
			let track = text.split(' "')[1];
			if (track === undefined) {
				return;
			}

			track = track.substring(0, track.length - 1);

			let have = 0;
			if (wishes.filter(wish => wish.artist === artist).length > 0) {
				have = 1;
			}
			if (tracks.filter(t => t.artist === artist).length > 0) {
				have = 2;
			}

			artists.push({
				artist: artist,
				track: track,
				have: have
			});
		});

		artists.sort((a, b) => {
			return a.artist.localeCompare(b.artist);
		});

		return artists;
	});
};
