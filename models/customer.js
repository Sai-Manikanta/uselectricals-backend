const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number, 
        required: true,
        min: 1000000000, // Minimum value (10-digit number)
        max: 9999999999  // Maximum value (10-digit number)
    },
    projects: {
        type: [String]
    }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
