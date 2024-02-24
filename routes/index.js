const express = require('express');
const authRoute = require('./auth');
const taskRoute = require('./task');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/task', taskRoute);

module.exports = router;