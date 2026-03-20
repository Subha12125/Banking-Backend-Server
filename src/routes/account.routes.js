const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware.js');
const accountController = require('../controller/account.controller.js');

const router = express.Router();

/**
 *  - GET/api/accounts/
 *  - Create a new account
 *  - Protected Route
 */

router.post("/", authMiddleware, accountController.createAccount);

module.exports = router;