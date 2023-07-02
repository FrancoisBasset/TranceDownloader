const fs = require('fs');
const jsdom = require('jsdom').JSDOM;

const Wishes = require('./Wishes');

module.exports.getGenres = function() {
	const genres = [];

	return jsdom.fromURL('https://everynoise.com/').then(function(response) {
		const items = response.window.document.querySelectorAll('[id*=item]');
	
		items.forEach(function(item) {
			genres.push(item.textContent.replace('» ', ''));
		});
	
		genres.sort();
	
		return genres;
	});
};

module.exports.getArtists = function(genre) {
	genre = genre.split(' ').join('');

	const artists = [];

	const wishes = Wishes.getWishes();
	const tracks = JSON.parse(fs.readFileSync('public/library.json'));

	return jsdom.fromURL('https://everynoise.com/engenremap-' + genre + '.html').then(function(response) {
		const items = response.window.document.querySelectorAll('[id*=item]');
	
		items.forEach(function(item) {
			const text = item.title.replace('e.g. ', '');
			const artist = text.split(' "')[0];
			let track = text.split(' "')[1];
			if (track === undefined) {
				return;
			}

			track = track.substring(0, track.length - 1);

			let have = 0;
			if (wishes.filter(wish => wish.artist === artist && !wish.done).length > 0) {
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
	
		artists.sort(function(a, b) {
			return a.artist.localeCompare(b.artist);
		});
	
		return artists;
	});
};
