const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.use('/dir', require('./dir'));
router.use('/wishes', require('./wishes'));
router.use('/youtube', require('./youtube'));
router.use('/library', require('./library'));
router.use('/everynoise', require('./everynoise'));

module.exports = router;
