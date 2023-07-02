const express = require('express');
const router = express.Router();

const EveryNoise = require('../classes').EveryNoise;

router.get('/genres', function(req, res) {
	EveryNoise.getGenres().then(function(genres) {
		res.json({
			success: true,
			response: genres
		});
	});	
});

router.get('/genre/:genre', function(req, res) {
	EveryNoise.getArtists(req.params.genre).then(function(artists) {
		res.json({
			success: true,
			response: artists
		});
	});
});

module.exports = router;
