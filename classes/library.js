const fs = require('fs');
const { promisify } = require('util');
const NodeId3 = require('node-id3');

const readTags = promisify(NodeId3.read);
const updateTags = promisify(NodeId3.update);

module.exports = {
	async writeAllTracks(connection) {
		const files = await fs.promises.readdir(process.env.MUSIC_DIR).then(list => list.filter(f => f.endsWith('.mp3')));

		const tracks = await Promise.all(
			files.map(async (track, i) => {
				const tags = await readTags(process.env.MUSIC_DIR + `/${track}`, {
					noRaw: true,
					include: ['TPE1', 'TIT2', 'TCON']
				});
				tags.url = `/${track}`;

				connection.send(`${i + 1}/${files.length}`);

				return tags;
			})
		);

		await fs.promises.writeFile('public/library.json', JSON.stringify(tracks));
	},

	async addTrack(artist, title, genre) {
		const tracks = JSON.parse(await fs.promises.readFile('public/library.json', 'utf8'));

		tracks.push({
			url: '/' + artist.split(' ').join('_') + '_' + title.split(' ').join('_') + '.mp3',
			artist,
			title,
			genre
		});

		tracks.sort((a, b) => a.artist.localeCompare(b.artist) || a.title.localeCompare(b.title));

		await fs.promises.writeFile('public/library.json', JSON.stringify(tracks));
	},

	async update(url, artist, title, genre) {
		const tags = {
			artist,
			title,
			genre
		};

		let tracks = JSON.parse(await fs.promises.readFile('public/library.json', 'utf8'));
		tracks = tracks.filter(t => t.url !== url);

		await updateTags(tags, process.env.MUSIC_DIR + `/${url}`);

		tags.url = `${tags.artist.split(' ').join('_')}_${tags.title.split(' ').join('_')}.mp3`;

		if (tags.url !== url) {
			await fs.promises.rename(process.env.MUSIC_DIR + `/${url}`, process.env.MUSIC_DIR + `/${tags.url}`);
		}

		tracks.push(tags);
		tracks.sort((a, b) => a.artist.localeCompare(b.artist) || a.title.localeCompare(b.title));

		await fs.promises.writeFile('public/library.json', JSON.stringify(tracks));

		return tags;
	}
};
