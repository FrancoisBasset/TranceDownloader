const express = require('express');
const router = express.Router();

const EveryNoiseController = require('../classes').EveryNoiseController;

router.get('/genres', function(req, res) {
	EveryNoiseController.getGenres().then(function(genres) {
		res.json({
			success: true,
			response: genres
		});
	});	
});

router.get('/genre/:genre', function(req, res) {
	EveryNoiseController.getArtists(req.params.genre).then(function(artists) {
		res.json({
			success: true,
			response: artists
		});
	});
});

module.exports = router;
