const express = require('express');
const router = express.Router();

// getAllCUstomers, deleteCustomer, editCustomer
const { createCustomer, getAllCUstomers, deleteCustomer, editCustomer } = require('../controllers/customer.js');

router.post('/', createCustomer)
router.get('/', getAllCUstomers)
router.delete('/:id', deleteCustomer)
router.patch('/:id', editCustomer)

module.exports = router;
