const express = require('express');
const router = express.Router();

const { assignTask } = require('../controllers/dailyTask.js');

router.post('/', assignTask)

module.exports = router;