const passport = require("passport");
const LocalStrategy = require("passport-local");
const authenService = require("./authenticateService");

passport.use(
  new LocalStrategy({ usernameField: "username" }, async function verify(
    username,
    password,
    cb
  ) {
    const user = await authenService.checkUserCredentials(username, password);
    console.log(user);
    if (user) return cb(null, user);
    return cb(null, false); 
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.uuid, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = passport;
