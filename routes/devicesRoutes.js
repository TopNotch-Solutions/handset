const express = require("express");
const router = express.Router();
const devicesController = require("../controllers/devicesController");

router.get("/", devicesController.getDevices);
router.get("/handsets", devicesController.getHandsets);
router.get("/handsets/:employeeCode", devicesController.getHandsetsByStaff);

module.exports = router;