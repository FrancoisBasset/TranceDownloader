const dotenv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');
dotenvExpand.expand(dotenv);

require('module-alias/register');

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { exec } = require('child_process');

const wishesPath = process.env.MUSIC_DIR + '/wishes.csv';
if (process.env.MUSIC_DIR && !fs.existsSync(wishesPath)) {
	fs.writeFileSync(wishesPath, '');
}

const app = express();
app.disable('x-powered-by');
app.use(cors());

app.listen(process.env.PORT, () => {
	if (fs.existsSync('./dist')) {
		console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`);
	}
});

app.use('/api', require('./routes'));
if (process.env.MUSIC_DIR) {
	app.use('/audio', express.static(process.env.MUSIC_DIR));
}

if (fs.existsSync('./dist')) {
	app.use(
		express.static('./dist', {
			index: 'index.html'
		})
	);
}