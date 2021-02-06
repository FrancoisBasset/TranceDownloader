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