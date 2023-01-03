var express = require("express");
var router = express.Router();
var controller = require("../controller/productController");
var cart = require("../controller/addToCartController");
// var comment = require("../controller/commentController");

router.get("/:id", controller);
router.post("/:id", cart);
// router.post("/comment/:id", comment);

module.exports = router;
