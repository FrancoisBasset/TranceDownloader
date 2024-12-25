const fs = require('fs');
const NodeId3 = require('node-id3');

const MUSIC_DIR = process.env.MUSIC_DIR + '/';

module.exports = {
	writeAllTracks: () => {
		if (fs.existsSync(__dirname + '/../public/library.json')) {
			return;
		}

		let tracks = fs.readdirSync(MUSIC_DIR).filter(track => track !== 'wishes.csv');

		tracks = tracks.map((track, i) => {
			const tags = NodeId3.read(MUSIC_DIR + `${track}`, {
				noRaw: true,
				include: ['TPE1', 'TIT2', 'TCON']
			});
			tags.url = `/${track}`;

			process.stdout.clearLine(0);
			process.stdout.cursorTo(0);
			process.stdout.write(`${i + 1}/${tracks.length}`);

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

		NodeId3.update(tags, MUSIC_DIR + `${url}`);

		tags.url = `${tags.artist.split(' ').join('_')}_${tags.title.split(' ').join('_')}.mp3`;

		if (tags.url !== url) {
			fs.renameSync(MUSIC_DIR + `${url}`, MUSIC_DIR + `${tags.url}`);
		}

		tracks.push(tags);
		tracks = tracks.sort((track1, track2) => {
			return track1.artist.localeCompare(track2.artist) || track1.title.localeCompare(track2.title);
		});

		fs.writeFileSync(__dirname + '/../public/library.json', JSON.stringify(tracks));

		return tags;
	}
};
