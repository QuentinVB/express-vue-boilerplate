const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const authController = require("../api/controllers/auth.controller")

router.post('/register', authController.register);
router.get('/confirm', authController.confirm);
router.post('/login', authController.login);
router.get('/logout', auth, authController.logout);
router.post('/requestpasswordreset', authController.passwordResetRequest);
router.get('/resetpassword', authController.passwordReset);
router.post('/changepassword', authController.changePassword);

module.exports = router;
