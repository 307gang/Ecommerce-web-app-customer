var express = require("express");
var router = express.Router();

var all = require('../controller/productsController');  
var byID = require('../controller/productByIdController');


router.get('', all);
router.get('/:id', byID);

module.exports = router;