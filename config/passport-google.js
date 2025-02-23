const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/User")
require('dotenv').config();

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,        //
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, //
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { googleId: profile.id } });

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
        });
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));
};
