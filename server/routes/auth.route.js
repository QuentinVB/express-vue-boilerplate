const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const authController = require("../api/controllers/auth.controller")

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', auth, authController.login);

module.exports = router;
