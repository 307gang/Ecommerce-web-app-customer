var express = require("express");
var router = express.Router();

var login = require('../controller/loginController');
var register = require('../controller/registerController');

router.get("/login", login);

router.get("/register", register.registerStep);
router.post("/register", register.register);

module.exports = router;
