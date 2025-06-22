const dotenv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');
dotenvExpand.expand(dotenv);

require('module-alias/register');

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { exec } = require('child_process');

const wishesPath = process.env.MUSIC_DIR + '/wishes.csv'
if (process.env.MUSIC_DIR && !fs.existsSync(wishesPath)) {
	fs.writeFileSync(wishesPath, '');
}

const app = express();
app.disable('x-powered-by');
app.use(cors());

const distExists = fs.existsSync('./dist');

app.listen(process.env.PORT, () => {
	console.log(`Go to http://localhost:${distExists ? process.env.PORT : 5173}`);
});

app.use('/api', require('./routes'));
if (process.env.MUSIC_DIR) {
	app.use(express.static(process.env.MUSIC_DIR));
}

if (distExists) {
	app.use(
		express.static('./dist', {
			index: 'index.html'
		})
	);
} else {
	exec('npm run dev');
	exec('npm run buildcss -- --watch');
	console.log('Starting front');
}
