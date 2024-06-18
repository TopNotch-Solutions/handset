const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const {tokenAuthMiddleware} = require('../middlewares/authMiddleware');

authRouter.post("/login", authController.login);
authRouter.get("/logout", tokenAuthMiddleware, authController.logout);

module.exports = authRouter;
