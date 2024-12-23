const express = require('express');
const router = express.Router();

const everyNoiseService = require('@/classes/everynoise');

router.get('/genres', (_, res) => {
	everyNoiseService.getGenres().then(genres => {
		res.json({
			success: true,
			response: genres
		});
	});
});

router.get('/genre/:genre', (req, res) => {
	everyNoiseService.getArtists(req.params.genre).then(artists => {
		res.json({
			success: true,
			response: artists
		});
	});
});

module.exports = router;
