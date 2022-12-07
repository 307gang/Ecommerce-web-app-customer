var express = require("express");
var router = express.Router();

var all = require('../controller/getBrandController');  


router.get('', all);

module.exports = router;