const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");
const WebUser = require("../models/WebUser")

// ExtractJwt -> generate token
// JwtStrategy -> verify token
module.exports = function (passport)  {
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {

    try {
      const user = await WebUser.findByPk(jwt_payload.user.id);
      if (user) {
        console.log("User found:", user);
        return done(null, user);
      }
      console.log("User not found");
      return done(null, false);
    } catch (err) {
      console.error("Error in JWT strategy:", err);
      return done(err, false);
    }
  })
);
}