const express = require('express');
const router = express.Router();

const LibraryController = require('../classes').LibraryController;

router.get('/', function(req, res) {
	const tracks = LibraryController.getAllTracks();

	res.json({
		success: true,
		response: tracks
	});
});

module.exports = router;