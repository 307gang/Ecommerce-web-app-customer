var express = require("express");
var router = express.Router();

var controller = require('../controller/productController');


router.get('', controller.getAllProduct);
router.get('/:id', controller.getProductById);

module.exports = router;