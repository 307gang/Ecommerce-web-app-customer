var express = require("express");
var router = express.Router();

var productController = require('../controller/productController');

router.get('/products', productController.totalProduct);

module.exports = router;