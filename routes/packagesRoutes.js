const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packagesController");

router.get("/", packageController.getPackages);
router.get("/packageList", packageController.getPackageList);

router.get("/:id", packageController.getPackageById);


module.exports = router;