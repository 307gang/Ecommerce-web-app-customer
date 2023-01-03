const express = require("express");
const router = express.Router();

const controller = require("../controller/authController");

router.get("/", controller);

module.exports = router;
