const express = require('express');
const router = express.Router();
const fs = require('fs');

const youtubeService = require('@/classes/youtube');
const MUSIC_DIR = process.env.MUSIC_DIR + '/';

router.get('/', (req, res) => {
	youtubeService.getResults(req.query.search).then(videos => {
		res.json({
			success: true,
			response: videos
		});
	});
});

router.post('/', async (req, res) => {
	process.on('uncaughtException', e => {
		console.log(e);
		console.log('Failed : ' + req.body.artist + ' ' + req.body.track);
	});

	youtubeService.download(req.body.url, req.body.artist, req.body.track, req.body.genre);
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
