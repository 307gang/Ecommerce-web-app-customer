var express = require("express");
var router = express.Router();

var filter = require("../controller/filterController");

router.get("/", filter);

module.exports = router;