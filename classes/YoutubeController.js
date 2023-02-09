const jsdom = require('jsdom').JSDOM;
const CookieJar = require('jsdom').CookieJar;
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const NodeID3 = require('node-id3');
const vm = require('vm');

const LibraryController = require('./LibraryController');

const MUSIC_DIR = require('../env.json').MUSIC_DIR;

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
			
			let contents;

			if (JSON.parse(ytInitialData).contents.sectionListRenderer.contents[1].itemSectionRenderer != undefined) {
				contents = JSON.parse(ytInitialData).contents.sectionListRenderer.contents[1].itemSectionRenderer.contents;
			} else {
				contents = JSON.parse(ytInitialData).contents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
			}

			let videos = [];
			for (const content of contents) {
				if (content.compactVideoRenderer !== undefined) {
					videos.push({
						title: content.compactVideoRenderer.title.runs[0].text,
						image: content.compactVideoRenderer.thumbnail.thumbnails[0].url,
						channel: content.compactVideoRenderer.longBylineText.runs[0].text,
						views: content.compactVideoRenderer.shortViewCountText.runs[0].text,
						url: 'https://www.youtube.com/' + content.compactVideoRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url
					});
				}
			}

			return videos;
		});
	},

	download: function(url, artist, track, genre) {
		const filename = MUSIC_DIR + 'TranceDownloader/' + artist.split(' ').join('_') + '_' + track.split(' ').join('_') + '.mp3';
		const stream = ytdl(url);

		const proc = new ffmpeg({source:stream});
		proc.saveToFile(filename);
		proc.on('end', function() {
			NodeID3.write({
				artist: artist,
				title: track,
				genre: genre
			}, filename);

			LibraryController.addTrack(artist, track, genre);
		});

		return true;
	}
};