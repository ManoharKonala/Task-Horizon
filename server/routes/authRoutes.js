const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel');

// Signup route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ success: true, message: 'User created' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error creating user', error: err.message });
    }
});

// Signin route (custom callback)
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(400).json({ success: false, message: info.message });
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
            res.json({
                success: true,
                message: 'Signed in successfully',
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name
                },
            });
        });
    })(req, res, next);
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ success: false, message: 'Logout error', error: err.message });
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Get current logged-in user
router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({
            success: true,
            user: {
                _id: req.user._id,
                email: req.user.email,
                name: req.user.name
            },
        });
    }
    res.status(401).json({ success: false, message: 'Not authenticated' });
});

module.exports = router;
