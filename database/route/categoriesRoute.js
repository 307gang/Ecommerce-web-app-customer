var express = require("express");
var router = express.Router();

var all = require('../controller/getCategoryController');  


router.get('', all);

module.exports = router;