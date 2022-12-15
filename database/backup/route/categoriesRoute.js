var express = require("express");
var router = express.Router();

var all = require('../controller/getCategoryController');  
var sameCategory = require('../controller/getSameCategoryController');

router.get('', all);
router.get('/:id',  sameCategory);

module.exports = router;