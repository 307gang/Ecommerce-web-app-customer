var express = require("express");
var router = express.Router();

var controller = require('../controller/categoryController');

router.get('', controller.getAllCategory);

module.exports = router;