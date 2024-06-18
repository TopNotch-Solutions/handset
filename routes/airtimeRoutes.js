const express = require("express");
const router = express.Router();
const airtimeController = require("../controllers/airtimeController");

router.get("/", airtimeController.getAirtime);
router.get("/:id", airtimeController.getAirtimeByStaffId);

// router.post("/", airtimeController.createAirtime);
// router.put("/:id", airtimeController.updateAirtime);
// router.delete("/:id", airtimeController.deleteAirtime);

module.exports = router;
