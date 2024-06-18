const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");
const {tokenAuthMiddleware} = require('../middlewares/authMiddleware');

router.get("/",tokenAuthMiddleware, staffController.getStaff);

// router.post("/", staffController.createStaff);

router.get("/permanentEmployees", staffController.getPermanentStaff);
router.get("/temporaryEmployees", staffController.getTemporaryStaff);
router.get("/inactiveEmployees", staffController.getInactiveStaff);
router.get("/activeEmployees", staffController.getActiveStaff);

router.get("/maleEmployees", staffController.getMaleStaff);
router.get("/femaleEmployees", staffController.getFemaleStaff);

router.get("/postpaidCount", staffController.getPostPaidStaff);
router.get("/prepaidCount", staffController.getPrePaidStaff);
router.get("/admin", staffController.getAdmin);

router.get("/allocation/:id", staffController.getStaffWithAirtimeAllocation);

router.get("/:id", staffController.getStaffById);

module.exports = router;
