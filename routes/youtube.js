const express = require('express');
const router = express.Router();

const YoutubeController = require('../classes').YoutubeController;

router.get('/', function(req, res) {
	YoutubeController.getResults(req.query.search).then(function(videos) {
		res.json({
			success: true,
			response: videos
		});
	});
});

router.post('/', function(req, res) {
	YoutubeController.download(req.body.url, req.body.artist, req.body.track, req.body.genre);
	
	res.json({
		success: true
	});
});

module.exports = router;