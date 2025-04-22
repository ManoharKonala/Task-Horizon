const ensureAuthenticated = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({ success: false, message: 'Unauthorized' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Authentication error', error: err.message });
    }
};

module.exports = { ensureAuthenticated };