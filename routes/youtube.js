const express = require('express');
const router = express.Router();
const fs = require('fs');

const Youtube = require('../classes').Youtube;
const MUSIC_DIR = process.env.MUSIC_DIR + '/';

router.get('/', function(req, res) {
	Youtube.getResults(req.query.search).then(function(videos) {
		res.json({
			success: true,
			response: videos
		});
	});
});

router.post('/', async function(req, res) {
	process.on('uncaughtException', (e) => {
		console.log(e);
		console.log('Failed : ' + req.body.artist + ' ' + req.body.track);
	});

	Youtube.download(req.body.url, req.body.artist, req.body.track, req.body.genre);
	await new Promise(resolve => setTimeout(resolve, 1000));
	const filename = MUSIC_DIR + '/' + req.body.artist.split(' ').join('_') + '_' + req.body.track.split(' ').join('_') + '.mp3';
	if (fs.existsSync(filename)) {
		res.json({
			success: true
		});
	} else {
		res.json({
			success: false
		});
	}
});

module.exports = router;
