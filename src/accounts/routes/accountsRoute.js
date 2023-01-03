var express = require("express");
var router = express.Router();

var login = require("../controller/loginController");
var register = require("../controller/registerController");
var passport = require("../model/authenticatePassport");
var profile = require("../controller/profilesController");

router.get("/register", register.registerStep);
router.post("/register", register.register);

router.get("/verify-email/:email", register.verifyEmail);

router.get("/login", login.loginStep);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/account/login?error=1",
  })
);

router.get("/logout", register.logout);

router.get("/info", profile.profileStep);
router.post("/info", profile.profileUpdate);

router.get("/updatePassword", profile.passwordStep);
router.post("/updatePassword", profile.passwordUpdate);

module.exports = router;
