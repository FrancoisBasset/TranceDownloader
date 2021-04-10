const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.use(express.static('D:/Musique'));

router.use('/trancedownloader/wishes', require('./wishes'));
router.use('/trancedownloader/youtube', require('./youtube'));
router.use('/trancedownloader/library', require('./library'));

module.exports = router;