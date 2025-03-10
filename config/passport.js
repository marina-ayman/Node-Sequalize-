const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const User = require("../models/User");
// const passport = require("passport");

// ExtractJwt -> generate token
// JwtStrategy -> verify token
module.exports = function (passport) {
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};
// jwtFromRequest -> how & when extract token
  passport.use('UserJwt',
  new JwtStrategy(opts, async (jwt_payload, done) => {  // error

    try {   
      const userExists = await User.findByPk(jwt_payload.user.id);
      const user = {
        id: userExists.id,
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        email: userExists.email,
        age: userExists.age,
        isAdmin: userExists.isAdmin,
        role_id: userExists.role_id,
        permissions: jwt_payload.user.permissions,
      }
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
)
}
