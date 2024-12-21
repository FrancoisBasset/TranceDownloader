const express = require('express');
const router = express.Router();

const EveryNoise = require('../classes').EveryNoise;

router.get('/genres', (_, res) => {
	EveryNoise.getGenres().then(genres => {
		res.json({
			success: true,
			response: genres
		});
	});	
});

router.get('/genre/:genre', (req, res) => {
	EveryNoise.getArtists(req.params.genre).then(artists => {
		res.json({
			success: true,
			response: artists
		});
	});
});

module.exports = router;
