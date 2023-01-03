var express = require("express");
var router = express.Router();
var comment = require("../controller/addCommentController");

router.post("/:id", comment);

module.exports = router;
