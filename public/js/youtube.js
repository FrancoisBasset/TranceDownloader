var searchInput = document.getElementById('searchInput');
var artistInput = document.getElementById('artistInput');
var trackInput = document.getElementById('trackInput');
var genreSelect = document.getElementById('genreSelect');
var videosTable = new VideosTable();

var searchValue = decodeURI(window.location.href.split('search=')[1]);
if (searchValue != 'undefined') {
	searchInput.value = searchValue;
	search();
}

document.addEventListener('keydown', function(e) {
	if (document.activeElement != artistInput && document.activeElement != trackInput && e.key != 'Control' && e.key != 'Alt' && e.key != 'Shift') {
		if (e.key == 'Backspace') {
			searchInput.value = searchInput.value.substring(0, searchInput.value.length - 1);
		} else if (e.key == 'Enter') {
			search();
		} else {
			searchInput.value += e.key;
		}
	}
});

function search() {
	fetch('/trancedownloader/youtube?search=' + searchInput.value).then(function(response) {
		response.json().then(function(json) {
			videosTable.clear();

			for (const video of json.response) {
				videosTable.addVideo(video.title, video.image, video.channel, video.views, video.url);
			}
		});
	});
}

function download() {
	const url = videosTable.getSelectedUrl();
	const artist = artistInput.value;
	const track = trackInput.value;
	const genre = genreSelect.value;

	if (url == undefined || artist == '' || track == '') {
		return;
	}

	fetch('/trancedownloader/youtube', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			url: url,
			artist: artist,
			track: track,
			genre: genre
		})
	});
}