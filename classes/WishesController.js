const fs = require('fs');

if (!fs.existsSync('D:/Musique/wishes.csv')) {
	fs.writeFileSync('D:/Musique/wishes.csv', '');
}

function writeWishes(wishes) {
	var text = '';
	for (const wish of wishes) {
		text += `${wish.id};${wish.artist};${wish.track};${wish.done}\r\n`;
	}

	text = text.substring(0, text.length - 2);

	fs.writeFileSync('D:/Musique/wishes.csv', text);
}

module.exports.getWishes = function() {
	const csv = fs.readFileSync('D:/Musique/wishes.csv').toString();
	if (csv == '') {
		return [];
	}

	const lines = csv.split('\r\n');

	var wishes = [];

	for (const line of lines) {
		wishes.push({
			id: line.split(';')[0],
			artist: line.split(';')[1],
			track: line.split(';')[2],
			done: line.split(';')[3] == 'true'
		})
	}

	return wishes;
};

module.exports.addWish = function(artist, track) {
	const wishes = this.getWishes();

	var id = 1;
	if (wishes.length != 0) {
		id = parseInt(wishes[wishes.length - 1].id) + 1;
	}

	var line = `\r\n${id};${artist};${track};false`;
	if (wishes.length == 0) {
		line = line.substring(2);
	}

	fs.appendFileSync('D:/Musique/wishes.csv', line);

	return {
		id: id,
		artist: artist,
		track: track,
		done: false
	};
};

module.exports.doneWish = function(id) {
	const wishes = this.getWishes();

	wishes.filter(w => w.id == id).map(w => w.done = true);

	writeWishes(wishes);

	return wishes.filter(w => w.id == id)[0];
};

module.exports.backWish = function(id) {
	const wishes = this.getWishes();

	wishes.filter(w => w.id == id).map(w => w.done = false);

	writeWishes(wishes);

	return wishes.filter(w => w.id == id)[0];
}

module.exports.updateWish = function(id, artist, track) {
	const wishes = this.getWishes();

	wishes.filter(w => w.id == id).map(function(w) {
		w.artist = artist;
		w.track = track;
	});

	writeWishes(wishes);

	return wishes.filter(w => w.id == id)[0];
}