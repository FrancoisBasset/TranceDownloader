const fs = require('fs');
const path = require('path');
const NodeId3 = require('node-id3');

const MUSIC_DIR = require('../env.json').MUSIC_DIR;

module.exports = {
	writeAllTracks: function() {
		let tracks = fs.readdirSync(MUSIC_DIR + 'TranceDownloader');

		tracks = tracks.map(function(track) {
			const tags = NodeId3.read(MUSIC_DIR + `TranceDownloader/${track}`, {
				noRaw: true
			});
			tags.url = `/${track}`;
			
			return tags;
		});

		fs.writeFileSync('public/library.json', JSON.stringify(tracks));
	},

	addTrack: function(artist, title, genre) {
		let tracks = JSON.parse(fs.readFileSync(__dirname + '/../public/library.json').toString());

		tracks.push({
			url: '/' + artist.split(' ').join('_') + '_' + title.split(' ').join('_') + '.mp3',
			artist: artist,
			title: title,
			genre: genre
		});

		tracks = tracks.sort((track1, track2) => {
			return track1.artist.localeCompare(track2.artist) || track1.title.localeCompare(track2.title);
		});

		fs.writeFileSync(__dirname + '/../public/library.json', JSON.stringify(tracks));
	},

	update: function(url, tag, value) {
		const updateInfo = {};
		updateInfo[tag] = value;

		let tracks = JSON.parse(fs.readFileSync(__dirname + '/../public/library.json').toString());
		tracks = tracks.filter(t => t.url != url);

		let tags = NodeId3.update(updateInfo, MUSIC_DIR + `TranceDownloader${url}`);

		if (tag === 'artist' || tag === 'title') {
			tags = NodeId3.read(MUSIC_DIR + `TranceDownloader${url}`, {
				noRaw: true
			});

			const newUrl = `/${tags.artist.split(' ').join('_')}_${tags.title.split(' ').join('_')}.mp3`;
			
			fs.renameSync(MUSIC_DIR + `TranceDownloader${url}`, MUSIC_DIR + `TranceDownloader${newUrl}`);

			url = newUrl;
		}
		
		tags = NodeId3.read(MUSIC_DIR + `TranceDownloader${url}`, {
			noRaw: true
		});
		tags.url = url;

		tracks.push(tags);
		tracks = tracks.sort((track1, track2) => {
			return track1.artist.localeCompare(track2.artist) || track1.title.localeCompare(track2.title);
		});

		fs.writeFileSync(__dirname + '/../public/library.json', JSON.stringify(tracks));

		return tags;
	},
	
	removeTags: function(url) {
		NodeId3.removeTags(MUSIC_DIR + `TranceDownloader${url}`);
	}
};