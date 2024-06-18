const express = require("express");
const router = express.Router();
const contractsController = require("../controllers/contractsController");

router.get("/", contractsController.getContracts);
router.get("/staffContracts", contractsController.getStaffContracts);

router.get("/:id", contractsController.getStaffContractById);



module.exports = router;
