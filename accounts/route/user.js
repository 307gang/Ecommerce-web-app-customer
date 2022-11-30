var express = require("express");
var router = express.Router();

var login = require('../controller/loginController');
var register = require('../controller/registerController');
var aboutus = require('../controller/aboutUsController');

router.get("/login", login);

router.get("/signup", register);

router.get("/aboutus", aboutus);

module.exports = router;
