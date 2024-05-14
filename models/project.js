const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },  
    address: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    team: {
        type: [String]
    },
    projectStartDate: {
        type: Date,
        default: Date.now
    }
});

// yourSchema.pre('save', function (next) {
//     if (!this.projectStartDate) {
//         this.projectStartDate = new Date();
//     }
//     next();
// });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
