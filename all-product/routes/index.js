var express = require("express");
var router = express.Router();

var list = require("../controller/allProductController");

router.get("/", list);

module.exports = router;
