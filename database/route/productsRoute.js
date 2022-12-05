var express = require("express");
var router = express.Router();

var byID = require('../controller/productByIdController');
var all = require('../controller/productsController');

router.get('', all);
router.get('/:id', byID);

module.exports = router;