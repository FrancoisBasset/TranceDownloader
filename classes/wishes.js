const fs = require('fs');

const wishesPath = process.env.MUSIC_DIR + '/wishes.csv';

function writeWishes(wishes) {
	let text = '';
	for (const wish of wishes) {
		text += `${wish.id};${wish.artist};${wish.title};${wish.genre};${wish.url}\r\n`;
	}

	text = text.substring(0, text.length - 2);

	fs.writeFileSync(wishesPath, text);
}

module.exports.getWishes = () => {
	const csv = fs.readFileSync(wishesPath).toString();
	if (csv === '') {
		return [];
	}

	const lines = csv.split('\r\n');

	const tracks = JSON.parse(fs.readFileSync('public/library.json').toString());

	return lines.reduce((wishes, line) => {
		const done = tracks.find(track => track.artist === line.split(';')[1] && track.title === line.split(';')[2]) !== undefined;

		if (!done) {
			wishes.push({
				id: line.split(';')[0],
				artist: line.split(';')[1],
				title: line.split(';')[2],
				genre: line.split(';')[3],
				url: line.split(';')[4]
			});
		}

		return wishes;
	}, []);
};

module.exports.addWish = (artist, title, genre, url) => {
	const wishes = this.getWishes();

	let id = 1;
	if (wishes.length !== 0) {
		id = parseInt(wishes[wishes.length - 1].id) + 1;
	}

	let line = `\r\n${id};${artist};${title};${genre};${url}`;
	if (wishes.length === 0) {
		line = line.substring(2);
	}

	fs.appendFileSync(wishesPath, line);

	return {
		id: id,
		artist: artist,
		title: title,
		genre: genre,
		url: url
	};
};

module.exports.deleteWish = id => {
	let wishes = this.getWishes();

	wishes = wishes.filter(w => w.id !== id);

	writeWishes(wishes);
};

module.exports.updateWish = (id, artist, title, genre, url) => {
	const wishes = this.getWishes();

	const wish = wishes.find(w => w.id === id);
	wish.artist = artist;
	wish.title = title;
	wish.genre = genre;
	wish.url = url;

	writeWishes(wishes);

	return wish;
};

module.exports.initWishes = () => {
	const lines = fs.readFileSync(wishesPath).toString().split('\r\n');
	let text = lines.reduce((acc, line, index) => {
		return acc + `${index + 1};${line.split(';')[1]};${line.split(';')[2]}\r\n`;
	}, '');
	text = text.substring(0, text.length - 2);

	fs.writeFileSync(wishesPath, text);
};
