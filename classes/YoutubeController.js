const jsdom = require('jsdom').JSDOM;

module.exports.getResults = function(search) {
	const url = 'https://www.youtube.com/results?search_query=' + search.split(' ').join('+');
	
	return jsdom.fromURL(url).then(function(response) {
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

		return videos;
	});
}