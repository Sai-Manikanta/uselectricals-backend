const express = require('express');
const router = express.Router();

const {  createWork, getWorks, deleteWork } = require('../controllers/work.js');

router.post('/', createWork);
router.get('/', getWorks);
router.delete('/:id', deleteWork)

module.exports = router;
