const express = require('express');
const router = express.Router();

const jsdom = require('jsdom').JSDOM;
const fs =require('fs');

router.get('/', function(req, res) {
	const url = 'https://www.youtube.com/results?search_query=' + req.query.search.split(' ').join('+');
	console.log(url);
	
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
	
});

module.exports = router;