var express = require("express");
var router = express.Router();

var sameCategory = require('../controller/getSameCategoryController');

router.get('/:id', sameCategory);

module.exports = router;