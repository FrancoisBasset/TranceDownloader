const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.use('/wishes', require('./wishes'));
router.use('/youtube', require('./youtube'));
router.use('/library', require('./library'));
router.use('/everynoise', require('./everynoise'));

const fs = require('fs');
const { WebSocket } = require('ws');

const libraryService = require('@/classes/library');

router.get('/dir', (_, res) => {
	const status = process.env.MUSIC_DIR ? 200 : 404;

	res.status(status).end();
});

router.put('/dir', (req, res) => {
	let dir = req.body.dir;

	if (dir.endsWith('/')) {
		dir = dir.slice(0, -1);
	}

	process.env.MUSIC_DIR = dir;

	const server = new WebSocket.Server({ port: 8080 });
	server.on('connection', connection => {
		if (fs.existsSync(__dirname + '/../public/library.json')) {
			fs.unlinkSync(__dirname + '/../public/library.json');
		}
		
		libraryService.writeAllTracks(connection);
		fs.appendFileSync(__dirname + '/../.env', '\nMUSIC_DIR=' + dir);

		connection.close();
	});

	res.end();
});

module.exports = router;
