const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
require('dotenv').config();

module.exports = (passport) => {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,             // 
    clientSecret: process.env.FACEBOOK_APP_SECRET,     // 
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name'] 
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { facebookId: profile.id } });

      if (!user) {
        user = await User.create({
          facebookId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails ? profile.emails[0].value : null,
        });
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));
};
