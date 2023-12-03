const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'], 
    default: 'To Do',
  },
  assignedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
