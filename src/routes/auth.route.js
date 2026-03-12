const express = require("express");
const { userRegisterController } = require("../controller/auth.controller");
const { userLoginController } = require("../controller/auth.controller");

const router = express.Router();


/* @route POST /api/auth/register */
router.post("/register", userRegisterController);


/* @route POST /api/auth/login */
router.post("/login", userLoginController);

module.exports = router;