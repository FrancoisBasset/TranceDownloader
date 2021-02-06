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

module.exports.update = function(track) {
	NodeId3.update(track, 'D:/Musique' + track.url);
}