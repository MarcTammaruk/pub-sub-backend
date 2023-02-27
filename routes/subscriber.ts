import express = require("express");
var router = express.Router();
const subscriber = require("../controllers/subscriber");

router.post("/", subscriber.sub);

module.exports = router;
