const express = require('express');
const router = express.Router();

router.use('/wishes', require('./wishes'));

module.exports = router;