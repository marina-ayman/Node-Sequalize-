const passport = require("passport");
const HeaderAPIKeyStrategy = require("passport-headerapikey").HeaderAPIKeyStrategy;
const User = require("../models/User");

passport.use(
  new HeaderAPIKeyStrategy(
    { header: "Authorization", prefix: "Api-Key " }, 
    // prefix -> must start with Api-Key 
    false, // req api-key only
    async (apikey, done) => {
      try {
        const user = await User.findOne({ where: { apikey: apikey } });
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
