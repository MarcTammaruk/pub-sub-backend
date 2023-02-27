import express = require("express");
var router = express.Router();
const publish = require("../controllers/publish");

router.post("/", publish.pub);

module.exports = router;
