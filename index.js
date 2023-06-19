const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.disable('x-powered-by');

app.use(cors());

app.listen(3000, function() {
	console.log('Start on 3000 http://localhost:3000');
});

app.use('/', require('./routes'));

if (fs.existsSync('./dist')) {
	app.use(express.static('./dist', {
		index: 'index.html'
	}));
} else {
	app.use(express.static('./public', {
		index: 'library.html'
	}));
}
