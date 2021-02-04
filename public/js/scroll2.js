var searchInput = document.getElementById('searchInput');
var videosTable = new VideosTable();

function search() {
	fetch('/youtube?search=' + searchInput.value).then(function(response) {
		response.json().then(function(json) {
			videosTable.clear();

			for (const video of json.response) {
				videosTable.addVideo(video.title, video.image, video.channel, video.views, video.url);
			}
		});
	});
}

function download(url, artist, track) {
	fetch('/youtube', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			url: url,
			artist: artist,
			track: track
		})
	});
}