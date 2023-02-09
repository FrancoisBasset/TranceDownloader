const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

const MUSIC_DIR = require('../env.json').MUSIC_DIR;

router.use(express.static(MUSIC_DIR + 'TranceDownloader'));

router.use('/trancedownloader/wishes', require('./wishes'));
router.use('/trancedownloader/youtube', require('./youtube'));
router.use('/trancedownloader/library', require('./library'));
router.use('/trancedownloader/everynoise', require('./everynoise'));

router.use(express.static('./public', {
	index: 'library.html'
}));

module.exports = router;