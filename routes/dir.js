const express = require('express');
const fs = require('fs');
const { WebSocket } = require('ws');

const libraryService = require('@/classes/library');

const router = express.Router();

router.get('/', (_, res) => {
	const status = process.env.MUSIC_DIR ? 200 : 404;

	res.status(status).end();
});

router.put('/', (req, res) => {
	if (!process.env.MUSIC_DIR) {
		process.env.MUSIC_DIR = req.body.dir;
	}

	const server = new WebSocket.Server({ port: 8080 });
	server.on('connection', connection => {
		libraryService.writeAllTracks(connection);
		if (req.body.dir) {
			fs.appendFileSync('.env', '\nMUSIC_DIR=' + process.env.MUSIC_DIR);
		}

		connection.close();
	});

	res.end();
});

module.exports = router;
