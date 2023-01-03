var express = require("express");
var router = express.Router();

var cart = require("../controller/cartController");
var checkout = require("../controller/checkoutController");
var order = require("../controller/orderController");

router.get("", cart);
router.post("", order);
router.get("/checkout", checkout);

module.exports = router;
