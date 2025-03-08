const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const User = require("../models/User");
const passport = require("passport");

// ExtractJwt -> generate token
// JwtStrategy -> verify token
module.exports = function (passport) {
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};
// jwtFromRequest -> how & when extract token
  passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {  // error

    try {   
      const user = await User.findByPk(jwt_payload.user.id);
      if (user) {
        return done(null, jwt_payload.user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
)
}
