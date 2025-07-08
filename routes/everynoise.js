const express = require('express');
const router = express.Router();

const everyNoiseService = require('@/classes/everynoise');

router.get('/genres', (req, res) => {
	everyNoiseService.getGenres(req.query.name).then(genres => {
		res.json(genres);
	});
});

router.get('/genres/:genre', (req, res) => {
	everyNoiseService.getArtists(req.params.genre).then(artists => {
		res.json(artists);
	});
});

module.exports = router;
