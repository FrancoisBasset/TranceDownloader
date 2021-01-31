const express = require('express');
const router = express.Router();

const jsdom = require('jsdom').JSDOM;
const fs =require('fs');

const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const NodeID3 = require('node-id3');

router.get('/', function(req, res) {
	const url = 'https://www.youtube.com/results?search_query=' + req.query.search.split(' ').join('+');
	
	jsdom.fromURL(url).then(function(response) {
		const scripts = response.window.document.getElementsByTagName('script');

		for (const script of scripts) {
			if (script.innerHTML.includes('var ytInitialData')) {
				eval(script.innerHTML);

				break;
			}
		}

		const contents = ytInitialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;

		var videos = [];
		for (const content of contents) {
			if (content.videoRenderer != undefined) {
				videos.push({
					title: content.videoRenderer.title.runs[0].text,
					image: content.videoRenderer.thumbnail.thumbnails[0].url,
					channel: content.videoRenderer.ownerText.runs[0].text,
					views: content.videoRenderer.viewCountText.simpleText,
					url: content.videoRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url
				});
			}
		}

		res.json({
			success: true,
			response: videos
		});
	})
});

router.post('/', function(req, res) {
	const filename = req.body.artist.split(' ').join('_') + '_' + req.body.track.split(' ').join('_') + '.mp3';
	const stream = ytdl(req.body.url);

	const proc = new ffmpeg({source:stream})
	proc.setFfmpegPath('D:/Dev/TranceDownloader/ffmpeg/ffmpeg.exe')
	proc.saveToFile(filename);
	proc.on('end', function() {
		NodeID3.write({
			artist: req.body.artist,
			title: req.body.track,
			genre: 'Trance'
		}, filename);

		res.json({
			success: true
		});
	});
});

module.exports = router;