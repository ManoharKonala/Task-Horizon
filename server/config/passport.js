const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Local Strategy for email and password
passport.use(new LocalStrategy(
  { usernameField: 'email' }, // use email instead of username
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serialize user ID into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session using ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
