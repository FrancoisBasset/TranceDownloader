const express = require('express');
const router = express.Router();

const libraryService = require('@/classes/library');

router.put('/', async (req, res) => {
	const track = await libraryService.update(req.body.url, req.body.artist, req.body.title, req.body.genre);

	res.json({
		success: true,
		response: track
	});
});

module.exports = router;
