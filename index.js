require('./bootstrap');

const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use('/api', require('./routes'));

if (process.env.MUSIC_DIR) {
	fs.appendFileSync(process.env.MUSIC_DIR + '/wishes.csv', '');
	app.use('/audio', express.static(process.env.MUSIC_DIR));
}

app.listen(process.env.PORT, () => {
	if (fs.existsSync('./dist')) {
		console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`);

		app.use(
			express.static('./dist', {
				index: 'index.html'
			})
		);
	}
});
