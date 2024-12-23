const dotenv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');
dotenvExpand.expand(dotenv);

require('module-alias/register');

const libraryService = require('@/classes/library');
libraryService.writeAllTracks();

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

const { exec } = require('child_process');

app.disable('x-powered-by');

app.use(cors());

const distExists = fs.existsSync('./dist');

app.listen(process.env.PORT, () => {
	console.log(`Go to http://localhost:${distExists ? process.env.PORT : 5173}`);
});

app.use('/api', require('./routes'));
app.use(express.static(process.env.MUSIC_DIR));

if (distExists) {
	app.use(express.static('./dist', {
		index: 'index.html'
	}));
} else {
	exec('npm run dev');
	exec('npm run buildcss -- --watch');
	console.log('Starting front');
}
