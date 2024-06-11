const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Residential', 'Commercial', 'Industrial'],
        required: true
    },
    taskName: {
        type: String,
        required: true
    }
});

const Work = mongoose.model('Work', workSchema);

module.exports = Work;
