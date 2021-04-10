const express = require('express');
const router = express.Router();

router.use(express.static('D:/Musique'));

router.use('/trancedownloader/wishes', require('./wishes'));
router.use('/trancedownloader/youtube', require('./youtube'));
router.use('/trancedownloader/library', require('./library'));

module.exports = router;