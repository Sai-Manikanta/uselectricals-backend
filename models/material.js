const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    typeOrSize: {
        type: [String],
    },
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;
