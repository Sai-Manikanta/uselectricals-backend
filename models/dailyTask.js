const mongoose = require('mongoose');
const { Schema } = mongoose;

const toolSchema = new Schema({
    tool: { type: mongoose.Schema.Types.ObjectId, ref: 'Tool', required: true },
    tookStatus: { type: Boolean, default: false },
    returnStatus: { type: Boolean, default: false },
    returnImages: [{ type: String }]
});

const materialSchema = new Schema({
    material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
    quantity: { type: Number, required: true },
    tookStatus: { type: Boolean, default: false },
    returnStatus: { type: Boolean, default: false },
    returnImages: [{ type: String }]
});

const workSchema = new Schema({
    work: { type: mongoose.Schema.Types.ObjectId, ref: 'Work', required: true },
    assignedTools: [toolSchema],
    assignedMaterials: [materialSchema]
});

const projectSchema = new Schema({
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    assignedWorks: [workSchema]
});

const dailyTaskSchema = new Schema({
    date: { type: Date, required: true },
    teamMemberName: { type: String, required: true },
    teamMember: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedProjects: [projectSchema]
});

const DailyTask = mongoose.model('DailyTask', dailyTaskSchema);

module.exports = DailyTask;


// const data = {
//     date: 'date',
//     teamMemberName: 'String',
//     teamMember: 'mongoose object _id',
//     assignedProjects: [
//         {
//             project: 'mongoose object _id',
//             assignedWorks: [
//                 {
//                     work: 'mongoose object _id',
//                     assignedTools: [
//                         {
//                            tool: 'mongoose object id',
//                            tookStatus: false,
//                            returnStatus: false,
//                            returnImages: ['string', 'string']
//                         }
//                     ],
//                     assignedMaterials: [
//                         {
//                             material: 'mongoose object id',
//                             quantity: 'number',
//                             tookStatus: false,
//                             returnStatus: false,
//                             returnImages: ['string', 'string']
//                          }
//                     ]
//                 }
//             ]
//         }
//     ],
// }