const express = require('express');
const router = express.Router();

const libraryService = require('@/classes/library');

router.put('/', (req, res) => {
	const track = libraryService.update(req.body.url, req.body.artist, req.body.title, req.body.genre);

	res.json(track);
});

module.exports = router;
