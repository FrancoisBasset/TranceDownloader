const express = require('express');
const app = express();

app.disable('x-powered-by');

app.listen(3000, function() {
	console.log('Start on 3000');
});

app.use(express.static('./public', {
	index: 'library.html'
}));

app.use('/', require('./routes'));