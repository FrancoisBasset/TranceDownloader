const express = require('express');
const router = express.Router();

const libraryService = require('@/classes/library');

router.get('/definitions', (_, res) => {
	const definitions = libraryService.getID3Definitions();

	res.json({
		success: true,
		response: definitions
	});
});

router.put('/', (req, res) => {
	const track = libraryService.update(req.body.url, req.body.artist, req.body.title, req.body.genre);

	res.json({
		success: true,
		response: track
	});
});

module.exports = router;
