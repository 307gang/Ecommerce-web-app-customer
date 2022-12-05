var express = require("express");
var router = express.Router();

var productRoute = require('./productsRoute');

router.get('/products', productRoute);

module.exports = router;