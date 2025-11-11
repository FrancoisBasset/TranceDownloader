const fs = require('fs');
const { JSDOM } = require('jsdom');

const wishesService = require('@/classes/wishes');

module.exports.getGenres = search => {
	return JSDOM.fromURL('https://everynoise.com/').then(response => {
		const items = Array.from(response.window.document.querySelectorAll('[id*=item]'));

		return items
			.reduce((genres, item) => {
				const name = item.textContent.replace('» ', '');

				if (name.includes(search)) {
					genres.push(name);
				}

				return genres;
			}, [])
			.sort();
	});
};

/**
 * @param {string} genre
 */
module.exports.getArtists = genre => {
	genre = genre.replace(/[\s-]+/g, '');

	const wishes = wishesService.getWishes();
	const tracks = JSON.parse(fs.readFileSync('public/library.json'));

	return JSDOM.fromURL('https://everynoise.com/engenremap-' + genre + '.html').then(response => {
		const items = Array.from(response.window.document.querySelectorAll('[id*=item]'));

		const artists = items.reduce((artists, item) => {
			const text = item.title.replace('e.g. ', '');

			/** @type [string, string] */
			let [artist, title] = text.split(' "');

			if (title === undefined) {
				return artists;
			}

			title = title.slice(0, -1);

			const haveInWishes = wishes.some(wish => wish.artist === artist && wish.title === title);
			const haveInTracks = tracks.some(t => t.artist === artist);

			if (!haveInWishes && !haveInTracks) {
				artists.push({
					artist: artist,
					title: title,
					preview_url: item.getAttribute('preview_url')
				});
			}

			return artists;
		}, []);

		artists.sort((a, b) => {
			return a.artist.localeCompare(b.artist);
		});

		return artists;
	});
};
