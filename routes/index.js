const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

const MUSIC_DIR = process.env.MUSIC_DIR + '/';

router.use(express.static(MUSIC_DIR));

router.use('/trancedownloader/wishes', require('./wishes'));
router.use('/trancedownloader/youtube', require('./youtube'));
router.use('/trancedownloader/library', require('./library'));
router.use('/trancedownloader/everynoise', require('./everynoise'));

module.exports = router;
