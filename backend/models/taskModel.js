const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' } // Default to 'To Do'
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
