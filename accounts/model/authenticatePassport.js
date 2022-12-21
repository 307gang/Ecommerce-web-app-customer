const passport = require("passport");
const LocalStrategy = require("passport-local");
const authenService = require("./authenticateService");

passport.use(
  new LocalStrategy({ emailField: "email" }, async function verify(
    email,
    password,
    done
  ) {
    const user = await authenService.checkUserCredentials(email, password);
    if (!user) return done(null, false);
    return done(null, user);
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.uuid, email: user.email });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = passport;
