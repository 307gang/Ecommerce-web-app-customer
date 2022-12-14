var express = require("express");
var router = express.Router();

var login = require("../controller/loginController");
var register = require("../controller/registerController");
var passport = require("../model/authenticatePassport");
var profile = require("../controller/profilesController");

router.get("/register", register.registerStep);
router.post("/register", register.register);

router.get("/login", login.loginStep);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/account/login",
  })
);

router.get("/logout", register.logout);

router.get("/info", profile.profileStep);

module.exports = router;
