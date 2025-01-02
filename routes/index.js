const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.use('/wishes', require('./wishes'));
router.use('/youtube', require('./youtube'));
router.use('/library', require('./library'));
router.use('/everynoise', require('./everynoise'));

const fs = require('fs');

router.get('/dir', (_, res) => {
	const status = process.env.MUSIC_DIR ? 200 : 404;

	res.status(status).end();
});

router.put('/dir', (req, res) => {
	let dir = req.body.dir;

	if (dir[dir.length - 1] === '/') {
		dir = dir.substring(0, dir.length - 1);
	}

	process.env.MUSIC_DIR = dir;

	fs.appendFileSync(__dirname + '/../.env', '\nMUSIC_DIR=' + dir);

	res.end();
});

module.exports = router;
