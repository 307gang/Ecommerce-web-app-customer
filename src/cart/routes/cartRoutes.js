var express = require("express");
var router = express.Router();

var cart = require("../../cart/controller/cartController");

router.get("", cart);

module.exports = router;
