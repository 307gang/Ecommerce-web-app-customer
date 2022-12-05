var express = require("express");
var router = express.Router();
var controller = require('../controller/productController');

router.get("/detail", controller);

module.exports = router;
