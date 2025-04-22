require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const path = require('path');

const app = express();
const port = process.env.PORT || 3003;

// Middleware
app.use(cors({
    origin: 'http://localhost:3003', // Frontend URL
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || '4052d61d4f249f67d2fe4469958aaab3',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

// Passport setup
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/teams', require('./routes/teamroutes')); // New teams routes

// Auth endpoint to get user info
app.get('/api/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({ 
            success: true, 
            user: {
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role || 'User'
            }
        });
    }
    return res.status(401).json({ success: false, message: 'Not authenticated' });
});

// Logout endpoint
app.get('/api/auth/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return res.status(500).json({ success: false, message: 'Logout failed' }); }
        return res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
});

// Protect ALL dashboard routes
app.get('/dashboard*', (req, res, next) => {
    if (req.isAuthenticated()) {
        // Allow access to authenticated users
        if (req.path === '/dashboard.html' || req.path.endsWith('.css') || req.path.endsWith('.js')) {
            return next();
        }
        res.redirect('/dashboard.html');
    } else {
        res.redirect('/');
    }
});

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Static files are served by express.static. The frontend should handle route protection and redirects after login.

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});