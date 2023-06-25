const express = require('express');
const router = express.Router();

const LibraryController = require('../classes').LibraryController;

LibraryController.writeAllTracks();

router.get('/definitions', function(req, res) {
	const definitions = LibraryController.getID3Definitions();

	res.json({
		success: true,
		response: definitions
	});
});

router.put('/', function(req, res) {
	const track = LibraryController.update(req.body.url, req.body.tag, req.body.value);

	res.json({
		success: true,
		response: track
	});
});

module.exports = router;
