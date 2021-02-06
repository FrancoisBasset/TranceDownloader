const express = require('express');
const app = express();

app.listen(3000, function() {
	console.log('Start on 3000');
});

app.use(express.static('./public', {
	index: 'scroll1.html'
}));
app.use(express.static('D:/Musique'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/', require('./routes'));