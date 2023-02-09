const express = require('express');
const router = express.Router();
const fs = require('fs');

const YoutubeController = require('../classes').YoutubeController;
const MUSIC_DIR = require('../env.json').MUSIC_DIR + '/';

router.get('/', function(req, res) {
	YoutubeController.getResults(req.query.search).then(function(videos) {
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

	YoutubeController.download(req.body.url, req.body.artist, req.body.track, req.body.genre);
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
