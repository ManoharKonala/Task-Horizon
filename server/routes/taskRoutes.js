const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');
const { ensureAuthenticated } = require('../middleware/auth');

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', ensureAuthenticated, async (req, res) => {
    const { name, priority, startDate, deadline, assignedTo } = req.body;

    try {
        // Validate required fields
        if (!name || !startDate || !deadline) {
            return res.status(400).json({ success: false, message: 'Missing required fields: name, startDate, or deadline' });
        }

        const task = new Task({
            name,
            priority: priority || 'Medium', // Default to 'Medium' if not provided
            startDate: new Date(startDate),
            deadline: new Date(deadline),
            completed: false,
            assignedTo: assignedTo ? {
                name: assignedTo.name || '',
                email: assignedTo.email || ''
            } : {
                name: req.user.name || '',
                email: req.user.email
            },
            owner: req.user._id
        });

        const savedTask = await task.save();
        res.status(201).json({ success: true, data: savedTask });
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ success: false, message: `Server error while creating task: ${err.message}` });
    }
});

// @route   GET /api/tasks
// @desc    Get all tasks for authenticated user
// @access  Private
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        // Get all tasks the user owns OR is assigned to
        const tasks = await Task.find({
            $or: [
                { owner: req.user._id },
                { 'assignedTo.email': req.user.email }
            ]
        });
        res.status(200).json({ success: true, data: tasks });
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ success: false, message: `Server error while fetching tasks: ${err.message}` });
    }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', ensureAuthenticated, async (req, res) => {
    const { name, priority, startDate, deadline, assignedTo } = req.body;
    const updateData = {};
    
    // Only update fields that are provided
    if (name) updateData.name = name;
    if (priority) updateData.priority = priority;
    if (startDate) updateData.startDate = new Date(startDate);
    if (deadline) updateData.deadline = new Date(deadline);
    if (assignedTo) {
        updateData.assignedTo = {
            name: assignedTo.name || '',
            email: assignedTo.email || ''
        };
    }

    try {
        // Allow updating if user owns the task
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id },
            updateData,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found or unauthorized.' });
        }

        res.status(200).json({ success: true, data: task });
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ success: false, message: `Server error while updating task: ${err.message}` });
    }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found or unauthorized.' });
        }

        res.status(200).json({ success: true, message: 'Task deleted successfully.' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ success: false, message: `Server error while deleting task: ${err.message}` });
    }
});

// @route   PUT /api/tasks/:id/toggle-completion
// @desc    Toggle task completion status
// @access  Private
router.put('/:id/toggle-completion', ensureAuthenticated, async (req, res) => {
    const { completed } = req.body;
    
    try {
        // Find the task - allow toggling if user owns OR is assigned to the task
        const task = await Task.findOne({
            _id: req.params.id,
            $or: [
                { owner: req.user._id },
                { 'assignedTo.email': req.user.email }
            ]
        });
        
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found or unauthorized.' });
        }
        
        // Update completion status
        task.completed = completed !== undefined ? completed : !task.completed;
        await task.save();
        
        res.status(200).json({ success: true, data: task });
    } catch (err) {
        console.error('Error toggling task completion:', err);
        res.status(500).json({ success: false, message: `Server error while updating task: ${err.message}` });
    }
});

module.exports = router;