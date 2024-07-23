const mongoose = require('mongoose');
const Customer = require('./customer');
const User = require('./user');

const workSchema = new mongoose.Schema({
    work: {
        type: String,
        required: true
    },
    workId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Work', 
    },
    completionPercentage: {
        type: Number,
        default: 0
    }
});

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },  
    type: {
        type: String,
        required: true,
    },
    works: {
        type: [workSchema]
    },
    address: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    team: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User', 
    },
    projectStartDate: {
        type: Date,
        default: Date.now
    }
});

projectSchema.pre('save', async function(next) {
    try {
        await Customer.findByIdAndUpdate(this.customer, { $push: { projects: this._id } });

        await User.updateMany(
            { _id: { $in: this.team } },
            { $push: { assignedToProjects: this._id } }
        );

        next();

    } catch (error) {
        console.error('Error:', error);
        next(error); 
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
