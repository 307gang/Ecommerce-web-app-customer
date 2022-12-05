var express = require("express");
var router = express.Router();

var aboutus = require('../../information/controller/aboutUsController');

router.get("/aboutus", aboutus);

module.exports = router;
