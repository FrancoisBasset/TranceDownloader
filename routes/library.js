const express = require('express');
const router = express.Router();

const Library = require('../classes').Library;

router.get('/definitions', function(req, res) {
	const definitions = Library.getID3Definitions();

	res.json({
		success: true,
		response: definitions
	});
});

router.put('/', function(req, res) {
	const track = Library.update(req.body.url, req.body.tag, req.body.value);

	res.json({
		success: true,
		response: track
	});
});

module.exports = router;
