const fs = require('fs');
const NodeId3 = require('node-id3');

const MUSIC_DIR = require('../env.json').MUSIC_DIR + '/';

module.exports = {
	writeAllTracks: function() {
		if (fs.existsSync(__dirname + '/../public/library.json')) {
			return;
		}

		let tracks = fs.readdirSync(MUSIC_DIR).filter(track => track != 'wishes.csv');

		let i = 0;

		tracks = tracks.map(function(track) {
			const tags = NodeId3.read(MUSIC_DIR + `${track}`, {
				noRaw: true,
				include: ['TPE1', 'TIT2', 'TCON']
			});
			tags.url = `/${track}`;

			i++;

			process.stdout.clearLine(0);
			process.stdout.cursorTo(0);
			process.stdout.write(`${i}/${tracks.length}`);
			
			return tags;
		});

		fs.writeFileSync('public/library.json', JSON.stringify(tracks));
		
		console.log();
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

		let tags = NodeId3.update(updateInfo, MUSIC_DIR + `${url}`);

		if (tag === 'artist' || tag === 'title') {
			tags = NodeId3.read(MUSIC_DIR + `${url}`, {
				noRaw: true,
				include: ['TPE1', 'TIT2', 'TCON']
			});

			const newUrl = `/${tags.artist.split(' ').join('_')}_${tags.title.split(' ').join('_')}.mp3`;
			
			fs.renameSync(MUSIC_DIR + `${url}`, MUSIC_DIR + `${newUrl}`);

			url = newUrl;
		}
		
		tags = NodeId3.read(MUSIC_DIR + `${url}`, {
			noRaw: true,
			include: ['TPE1', 'TIT2', 'TCON']
		});
		tags.url = url;

		tracks.push(tags);
		tracks = tracks.sort((track1, track2) => {
			return track1.artist.localeCompare(track2.artist) || track1.title.localeCompare(track2.title);
		});

		fs.writeFileSync(__dirname + '/../public/library.json', JSON.stringify(tracks));

		return tags;
	}
};
