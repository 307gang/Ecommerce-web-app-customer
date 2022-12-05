var express = require("express");
var router = express.Router();

var aboutus = require('../../information/controller/infoController');

router.get("/aboutus", aboutus);

module.exports = router;
