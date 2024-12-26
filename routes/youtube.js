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
		console.log('Failed : ' + req.body.artist + ' ' + req.body.title);
	});

	youtubeService.download(req.body.id, req.body.url, req.body.artist, req.body.title, req.body.genre, () => {
		res.status(201).end();
	});
});

module.exports = router;
