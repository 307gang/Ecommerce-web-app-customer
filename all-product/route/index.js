const controller = require('../controller');
var express = require("express");
var router = express.Router();

router.get('/', controller);

module.exports = router;