var express = require("express");
var router = express.Router();

var controller = require('../controller/brandController')


router.get('', controller.getAllBrand);

module.exports = router;