const mongoose = require('mongoose');
const Customer = require('./customer');
const User = require('./user');

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

// projectSchema.post('save', async function(doc, next) {
//     try {
//         console.log('Project saved with ID:', doc._id);

//         // Update the customer with the project ID
//         await Customer.findByIdAndUpdate(doc.customer, { $push: { projects: doc._id } });

//         // Update each user in the team array with the project ID
//         const result = await User.updateMany(
//             { _id: { $in: doc.team } },
//             { $push: { projects: doc._id } }
//         );

//         console.log('Users updated:', result);

//         next();
//     } catch (error) {
//         console.error('Error:', error);
//         next(error); 
//     }
// });


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
