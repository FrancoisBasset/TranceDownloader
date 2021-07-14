const fs = require('fs');

const csv = fs.readFileSync('D:/Musique/wishes.csv').toString();
const lines = csv.split('\r\n');

var text = '';
var id = 1;

for (const line of lines) {
	const artist = line.split(';')[1];
	const track = line.split(';')[2];
	const done = line.split(';')[3] == 'true';

	text += `${id};${artist};${track};${done}\r\n`;

	id++;
}

text = text.substring(0, text.length - 2);

fs.writeFileSync('D:/Musique/wishes.csv', text);