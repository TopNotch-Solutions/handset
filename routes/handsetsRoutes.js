const express = require("express");
const router = express.Router();
const handsetsController = require("../controllers/handsetsController");

router.get("/", handsetsController.getHandsets);

module.exports = router;