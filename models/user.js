const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'teamMember'],
    default: 'teamMember',
    required: true
  },
  assignedToProjects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Project', 
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
