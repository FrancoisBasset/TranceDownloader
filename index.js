const express = require('express');
const app = express();

app.listen(3000, function() {
	console.log('Start on 3000');
});

app.use(express.static('./public', {
	index: 'scroll1.html'
}));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/', require('./routes'));