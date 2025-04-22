const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    startDate: { type: Date, required: true },
    deadline: { type: Date, required: true },
    assignedTo: {
        name: { type: String, default: '' },
        email: { type: String, required: true }
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reminder: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    progress: { type: Number, default: 0, min: 0, max: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);