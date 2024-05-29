const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();
const authController = require("../controller/auth.controller");

router.post("/", userController.createUser);
router.post("/login", userController.loginWithEmail);
router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;
