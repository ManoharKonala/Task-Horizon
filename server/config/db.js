const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB Atlas');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
