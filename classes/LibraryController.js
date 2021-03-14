const fs = require('fs');
const NodeId3 = require('node-id3');

module.exports.getAllTracks = function(dir = 'D:/Musique', tracks = []) {
	if (dir.endsWith('.mp3')) {
		const tags = NodeId3.read(dir);
		delete tags.raw;
		
		dir = dir.replace('D:/Musique', '');
		tags.url = dir;
		tracks.push(tags);

		return tracks;
	}

	if (fs.lstatSync(dir).isFile()) {
		return tracks;
	}

	const elements = fs.readdirSync(dir);

	for (const element of elements) {
		tracks = this.getAllTracks(dir + '/' + element, tracks);
	}

	return tracks;
};

module.exports.getID3Definitions = function() {
	const ID3Definitions = require("../node_modules/node-id3/src/ID3Definitions").FRAME_IDENTIFIERS.v3;

	return Object.keys(ID3Definitions).sort();
}

module.exports.update = function(url, tag, value) {
	const updateInfo = {};
	updateInfo[tag] = value;

	var tags = NodeId3.update(updateInfo, 'D:/Musique' + url);

	if (tag == 'artist' || tag == 'title') {
		tags = NodeId3.read('D:/Musique' + url);

		const folder = url.split('/')[1];

		const newUrl = folder + '/' + tags.artist.split(' ').join('_') + '_' + tags.title.split(' ').join('_') + '.mp3';
		
		fs.renameSync('D:/Musique/' + url, 'D:/Musique/' + newUrl);

		url = newUrl;
	}
	
	tags = NodeId3.read('D:/Musique/' + url);
	tags.url = url;

	return tags;
}