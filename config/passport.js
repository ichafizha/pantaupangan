var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var User = require('../models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Sign in with Email and Password
passport.use(new LocalStrategy({
  usernameField: 'email'
}, function(email, password, done) {
  User.findOne({
    email: email
  }, function(err, user) {
    if (!user) {
      return done(null, false, {
        msg: 'The email address ' + email + ' is not associated with any account. ' +
          'Double-check your email address and try again.'
      });
    }
    user.comparePassword(password, function(err, isMatch) {
      if (!isMatch) {
        return done(null, false, {
          msg: 'Invalid email or password'
        });
      }
      return done(null, user);
    });
  });
}));