var express = require("express");
var router = express.Router();

var landing = require("../controller/indexController");

router.get("/", landing);

module.exports = router;