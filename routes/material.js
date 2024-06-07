const express = require('express');
const router = express.Router();

const { createMaterial, deleteMaterial, getAllMaterials } = require('../controllers/material');

router.post('/', createMaterial)
router.get('/', getAllMaterials)
router.delete('/:id', deleteMaterial)

module.exports = router;
