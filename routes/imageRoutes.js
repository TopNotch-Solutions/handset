const express = require("express");
const router = express.Router();
const multer = require("multer");
const imageController = require("../controllers/imageController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.originalname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/updateProfilePicture/:userId",
  upload.single("profilePhoto"),
  imageController.updateProfilePicture
);

router.get("/:userId/profilePicture", imageController.getProfilePicture);

module.exports = router;
