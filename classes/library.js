const fs = require('fs');
const NodeId3 = require('node-id3');

module.exports = {
	writeAllTracks: connection => {
		if (fs.existsSync(__dirname + '/../public/library.json')) {
			return;
		}

		let tracks = fs.readdirSync(process.env.MUSIC_DIR).filter(track => track.endsWith('.mp3'));

		tracks = tracks.map((track, i) => {
			const tags = NodeId3.read(process.env.MUSIC_DIR + `/${track}`, {
				noRaw: true,
				include: ['TPE1', 'TIT2', 'TCON']
			});
			tags.url = `/${track}`;

			connection.send(`${i + 1}/${tracks.length}`);

			return tags;
		});

		fs.writeFileSync('public/library.json', JSON.stringify(tracks));

		console.log();
	},

	addTrack: (artist, title, genre) => {
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

	update: (url, artist, title, genre) => {
		const tags = {
			artist: artist,
			title: title,
			genre: genre
		};

		let tracks = JSON.parse(fs.readFileSync(__dirname + '/../public/library.json').toString());
		tracks = tracks.filter(t => t.url !== url);

		NodeId3.update(tags, process.env.MUSIC_DIR + `/${url}`);

		tags.url = `${tags.artist.split(' ').join('_')}_${tags.title.split(' ').join('_')}.mp3`;

		if (tags.url !== url) {
			fs.renameSync(process.env.MUSIC_DIR + `/${url}`, process.env.MUSIC_DIR + `/${tags.url}`);
		}

		tracks.push(tags);
		tracks = tracks.sort((track1, track2) => {
			return track1.artist.localeCompare(track2.artist) || track1.title.localeCompare(track2.title);
		});

		fs.writeFileSync(__dirname + '/../public/library.json', JSON.stringify(tracks));

		return tags;
	}
};
