const express = require('express');
const router = express.Router();

router.use('/wishes', require('./wishes'));
router.use('/youtube', require('./youtube'));
router.use('/library', require('./library'));

module.exports = router;