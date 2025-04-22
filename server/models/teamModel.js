const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Member name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Member email is required'],
        trim: true,
        lowercase: true
    }
}, { timestamps: true });

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Team name is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    members: [teamMemberSchema],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);