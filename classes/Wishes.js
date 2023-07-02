const fs = require('fs');

const MUSIC_DIR = process.env.MUSIC_DIR + '/';

if (!fs.existsSync(MUSIC_DIR + 'wishes.csv')) {
	fs.writeFileSync(MUSIC_DIR + 'wishes.csv', '');
}

function writeWishes(wishes) {
	let text = '';
	for (const wish of wishes) {
		text += `${wish.id};${wish.artist};${wish.track}\r\n`;
	}

	text = text.substring(0, text.length - 2);

	fs.writeFileSync(MUSIC_DIR + 'wishes.csv', text);
}

module.exports.getWishes = function() {
	const csv = fs.readFileSync(MUSIC_DIR + 'wishes.csv').toString();
	if (csv === '') {
		return [];
	}

	const lines = csv.split('\r\n');

	const wishes = [];

	const tracks = JSON.parse(fs.readFileSync(__dirname + '/../public/library.json').toString());

	for (const line of lines) {
		let done = false;
		if (line.split(';')[2] !== '') {
			if (tracks.filter(track => track.artist === line.split(';')[1] && track.title === line.split(';')[2]).length > 0) {
				done = true;
			}
		} else {
			if (tracks.filter(track => track.artist === line.split(';')[1]).length > 0) {
				done = true;
			}
		}
		
		wishes.push({
			id: line.split(';')[0],
			artist: line.split(';')[1],
			track: line.split(';')[2],
			done: done
		});
	}

	return wishes;
};

module.exports.addWish = function(artist, track) {
	const wishes = this.getWishes();

	let id = 1;
	if (wishes.length !== 0) {
		id = parseInt(wishes[wishes.length - 1].id) + 1;
	}

	let line = `\r\n${id};${artist};${track}`;
	if (wishes.length === 0) {
		line = line.substring(2);
	}

	fs.appendFileSync(MUSIC_DIR + 'wishes.csv', line);

	return {
		id: id,
		artist: artist,
		track: track,
		done: false
	};
};

module.exports.deleteWish = function(id) {
	let wishes = this.getWishes();

	wishes = wishes.filter(w => w.id !== id);

	writeWishes(wishes);
};

module.exports.updateWish = function(id, artist, track) {
	const wishes = this.getWishes();

	wishes.filter(w => w.id === id).forEach(function(w) {
		w.artist = artist;
		w.track = track;
		return w;
	});

	writeWishes(wishes);

	return wishes.filter(w => w.id === id)[0];
};

module.exports.initWishes = function() {
	const lines = fs.readFileSync(MUSIC_DIR + 'wishes.csv').toString().split('\r\n');
	let text = lines.reduce(function(acc, line, index) {
		return acc + `${index+1};${line.split(';')[1]};${line.split(';')[2]}\r\n`;
	}, '');
	text = text.substring(0, text.length - 2);

	fs.writeFileSync(MUSIC_DIR + 'wishes.csv', text);
};
