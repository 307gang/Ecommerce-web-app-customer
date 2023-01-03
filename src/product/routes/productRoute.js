var express = require("express");
var router = express.Router();
var controller = require("../controller/productController");
var cart = require("../controller/addToCartController");

router.get("/:id", controller);
router.post("/:id", cart);

module.exports = router;
