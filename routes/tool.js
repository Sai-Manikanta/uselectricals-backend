const express = require('express');
const router = express.Router();

const {  createTool, deleteTool, getAllTools } = require('../controllers/tool.js');

router.post('/', createTool)
router.get('/', getAllTools)
router.delete('/:id', deleteTool)

module.exports = router;
