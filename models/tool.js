const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Machine', 'Hand Tool'],
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const Tool = mongoose.model('Tool', toolSchema);

module.exports = Tool;
