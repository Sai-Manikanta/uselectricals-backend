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
    }
});

const Tool = mongoose.model('Tool', toolSchema);

module.exports = Tool;
