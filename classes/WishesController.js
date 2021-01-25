const fs = require('fs');

function writeWishes(wishes) {
	var text = '';
	for (const wish of wishes) {
		text += `${wish.id};${wish.artist};${wish.track};${wish.done}\r\n`;
	}

	text = text.substring(0, text.length - 2);

	fs.writeFileSync('D:/Musique/wishes.csv', text);
}

module.exports.getWishes = function(withDone) {
	const csv = fs.readFileSync('D:/Musique/wishes.csv').toString();
	const lines = csv.split('\r\n');

	var wishes = [];

	for (const line of lines) {
		const done = line.split(';')[3] == 'true';

		if (withDone == false && done) {
			continue;
		}

		wishes.push({
			id: line.split(';')[0],
			artist: line.split(';')[1],
			track: line.split(';')[2],
			done: done
		})
	}

	return wishes;
};

module.exports.addWish = function(artist, track) {
	const wishes = this.getWishes();

	const id = parseInt(wishes[wishes.length - 1].id) + 1;

	fs.appendFileSync('D:/Musique/wishes.csv', `\r\n${id};${artist};${track};false`);

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

	return wishes.filter(w => w.id == id);
};

module.exports.backWish = function(id) {
	const wishes = this.getWishes();

	wishes.filter(w => w.id == id).map(w => w.done = false);

	writeWishes(wishes);

	return wishes.filter(w => w.id == id);
}

module.exports.updateWish = function(id, artist, track) {
	const wishes = this.getWishes();

	wishes.filter(w => w.id == id).map(function(w) {
		w.artist = artist;
		w.track = track;
	});

	writeWishes(wishes);

	return wishes.filter(w => w.id == id);
}