const express = require('express');
const router = express.Router();
const Team = require('../models/teamModel'); 
const { ensureAuthenticated } = require('../middleware/auth');

// @route   POST /api/teams
// @desc    Create a new team
// @access  Private
router.post('/', ensureAuthenticated, async (req, res) => {
    const { name, description } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ success: false, message: 'Team name is required' });
        }

        const team = new Team({
            name,
            description: description || '',
            createdBy: req.user._id,
            members: [] // Start with no members
        });

        const savedTeam = await team.save();
        res.status(201).json({ success: true, data: savedTeam });
    } catch (err) {
        console.error('Error creating team:', err);
        res.status(500).json({ success: false, message: `Server error while creating team: ${err.message}` });
    }
});

// @route   GET /api/teams
// @desc    Get all teams created by user
// @access  Private
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const teams = await Team.find({ createdBy: req.user._id });
        res.status(200).json({ success: true, data: teams });
    } catch (err) {
        console.error('Error fetching teams:', err);
        res.status(500).json({ success: false, message: `Server error while fetching teams: ${err.message}` });
    }
});

// @route   PUT /api/teams/:id
// @desc    Update a team
// @access  Private
router.put('/:id', ensureAuthenticated, async (req, res) => {
    const { name, description } = req.body;
    const updateData = {};
    
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    try {
        const team = await Team.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            updateData,
            { new: true, runValidators: true }
        );

        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found or unauthorized.' });
        }

        res.status(200).json({ success: true, data: team });
    } catch (err) {
        console.error('Error updating team:', err);
        res.status(500).json({ success: false, message: `Server error while updating team: ${err.message}` });
    }
});

// @route   DELETE /api/teams/:id
// @desc    Delete a team
// @access  Private
router.delete('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const team = await Team.findOneAndDelete({ 
            _id: req.params.id, 
            createdBy: req.user._id 
        });

        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found or unauthorized.' });
        }

        res.status(200).json({ success: true, message: 'Team deleted successfully.' });
    } catch (err) {
        console.error('Error deleting team:', err);
        res.status(500).json({ success: false, message: `Server error while deleting team: ${err.message}` });
    }
});

// @route   GET /api/teams/:id/members
// @desc    Get members of a team
// @access  Private
router.get('/:id/members', ensureAuthenticated, async (req, res) => {
    try {
        const team = await Team.findOne({ 
            _id: req.params.id, 
            createdBy: req.user._id 
        });

        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found or unauthorized.' });
        }

        res.status(200).json({ success: true, data: team.members });
    } catch (err) {
        console.error('Error fetching team members:', err);
        res.status(500).json({ success: false, message: `Server error while fetching team members: ${err.message}` });
    }
});

// @route   POST /api/teams/:id/members
// @desc    Add a member to a team
// @access  Private
router.post('/:id/members', ensureAuthenticated, async (req, res) => {
    const { name, email } = req.body;

    try {
        if (!name || !email) {
            return res.status(400).json({ success: false, message: 'Name and email are required' });
        }

        const team = await Team.findOne({ 
            _id: req.params.id, 
            createdBy: req.user._id 
        });

        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found or unauthorized.' });
        }

        // Check if member with this email already exists
        if (team.members.some(member => member.email === email)) {
            return res.status(400).json({ success: false, message: 'Member with this email already exists in the team' });
        }

        // Add new member
        team.members.push({
            name,
            email
        });

        await team.save();
        res.status(201).json({ success: true, data: team.members });
    } catch (err) {
        console.error('Error adding team member:', err);
        res.status(500).json({ success: false, message: `Server error while adding team member: ${err.message}` });
    }
});

// @route   DELETE /api/teams/:id/members/:memberId
// @desc    Remove a member from a team
// @access  Private
router.delete('/:id/members/:memberId', ensureAuthenticated, async (req, res) => {
    try {
        const team = await Team.findOne({ 
            _id: req.params.id, 
            createdBy: req.user._id 
        });

        if (!team) {
            return res.status(404).json({ success: false, message: 'Team not found or unauthorized.' });
        }

        // Remove member
        team.members = team.members.filter(member => member._id.toString() !== req.params.memberId);
        await team.save();

        res.status(200).json({ success: true, message: 'Member removed successfully.', data: team.members });
    } catch (err) {
        console.error('Error removing team member:', err);
        res.status(500).json({ success: false, message: `Server error while removing team member: ${err.message}` });
    }
});

module.exports = router;