const fs = require('fs');
const jsdom = require('jsdom').JSDOM;

const wishesService = require('@/classes/wishes');

module.exports.getGenres = name => {
	const genres = [];

	return jsdom.fromURL('https://everynoise.com/').then(response => {
		const items = response.window.document.querySelectorAll('[id*=item]');

		items.forEach(item => {
			genres.push(item.textContent.replace('» ', ''));
		});

		return genres.filter(g => g.includes(name)).sort();
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
			let title = text.split(' "')[1];
			if (title === undefined) {
				return;
			}

			title = title.substring(0, title.length - 1);

			const haveInWishes = wishes.some(wish => wish.artist === artist && wish.title === title);
			const haveInTracks = tracks.some(t => t.artist === artist);

			if (!haveInWishes && !haveInTracks) {
				artists.push({
					artist: artist,
					title: title,
					preview_url: item.getAttribute('preview_url')
				});
			}
		});

		artists.sort((a, b) => {
			return a.artist.localeCompare(b.artist);
		});

		return artists;
	});
};
