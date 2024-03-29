const jsdom = require('jsdom').JSDOM;
const CookieJar = require('jsdom').CookieJar;
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const NodeID3 = require('node-id3');
const vm = require('vm');

const Library = require('./Library');

const MUSIC_DIR = process.env.MUSIC_DIR + '/';

module.exports = {
	getResults: function(search) {
		const url = 'https://www.youtube.com/results?search_query=' + search.split(' ').join('+');

		const c = new CookieJar();
		c.setCookie('CONSENT=YES+yt.375803756.fr+FX+948', 'https://www.youtube.com');

		return jsdom.fromURL(url, {cookieJar: c}).then(function(response) {
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
					videos.push({
						title: content.videoWithContextRenderer.headline.runs[0].text,
						image: content.videoWithContextRenderer.thumbnail.thumbnails[0].url,
						channel: content.videoWithContextRenderer.shortBylineText.runs[0].text,
						views: content.videoWithContextRenderer.shortViewCountText.runs[0].text,
						url: 'https://www.youtube.com' + content.videoWithContextRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url
					});
				}
			}

			return videos;
		});
	},

	download: function(url, artist, track, genre) {
		const filename = MUSIC_DIR + '/' + artist.split(' ').join('_') + '_' + track.split(' ').join('_') + '.mp3';
		const stream = ytdl(url, { filter: 'audioonly' });
		const proc = new ffmpeg({source:stream});
		proc.saveToFile(filename);
		proc.on('end', function() {
			NodeID3.write({
				artist: artist,
				title: track,
				genre: genre
			}, filename);

			Library.addTrack(artist, track, genre);
		});

		return true;
	}
};
