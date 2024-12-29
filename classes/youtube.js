const jsdom = require('jsdom').JSDOM;
const CookieJar = require('jsdom').CookieJar;
const ytdl = require('@distube/ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const NodeID3 = require('node-id3');
const vm = require('vm');

const libraryService = require('@/classes/library');
const wishesService = require('@/classes/wishes');

const MUSIC_DIR = process.env.MUSIC_DIR + '/';

module.exports = {
	getResults: search => {
		const url = 'https://www.youtube.com/results?search_query=' + search.split(' ').join('+');

		const c = new CookieJar();
		c.setCookie('CONSENT=YES+yt.375803756.fr+FX+948', 'https://www.youtube.com');

		return jsdom.fromURL(url, { cookieJar: c }).then(response => {
			const scripts = response.window.document.getElementsByTagName('script');

			for (const script of scripts) {
				if (script.innerHTML.includes('var ytInitialData')) {
					vm.runInThisContext(script.innerHTML);

					break;
				}
			}

			let contents = [];
			let contents2 = [];

			if (JSON.parse(ytInitialData).contents.sectionListRenderer.contents[0].itemSectionRenderer !== undefined) {
				contents = JSON.parse(ytInitialData).contents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
			}
			if (JSON.parse(ytInitialData).contents.sectionListRenderer.contents[2] !== undefined) {
				contents2 = JSON.parse(ytInitialData).contents.sectionListRenderer.contents[2].itemSectionRenderer.contents;
			}
			contents = contents.concat(contents2);

			let videos = [];
			for (const content of contents) {
				if (content.videoWithContextRenderer !== undefined) {
					const url = content.videoWithContextRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url.split('&pp')[0];

					if (url.startsWith('/shorts/')) {
						continue;
					}

					videos.push({
						title: content.videoWithContextRenderer.headline.runs[0].text,
						image: content.videoWithContextRenderer.thumbnail.thumbnails[0].url,
						channel: content.videoWithContextRenderer.shortBylineText.runs[0].text,
						views: content.videoWithContextRenderer.shortViewCountText.runs[0].text.split(' ')[0],
						url: 'https://www.youtube.com' + url
					});
				}
			}

			return videos;
		});
	},

	download: (id, url, artist, title, genre, callback) => {
		const filename = MUSIC_DIR + '/' + artist.split(' ').join('_') + '_' + title.split(' ').join('_') + '.mp3';

		const stream = ytdl(url, {
			filter: 'audioandvideo'
		});

		ffmpeg(stream)
			.noVideo()
			.saveToFile(filename)
			.on('end', () => {
				NodeID3.write({
					artist: artist,
					title: title,
					genre: genre
				}, filename);

				libraryService.addTrack(artist, title, genre);
				wishesService.deleteWish(id);

				callback();
			});
	}
};
