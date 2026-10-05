// import express
const express = require('express');

// import controllers for the logic
const authController = require('../controllers/authController.js')

// import the identifier function
const {identifier } = require('../middlewares/identification.js')

//initialise a router to modularise the application routes
const router = express.Router()

// public pathways
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', identifier, authController.signout);

router.patch('/send-verification-code', identifier, authController.sendVerificationCode);
router.patch('/verify-verification-code', identifier, authController.verifyVerificationCode);

router.patch('/change-password', identifier, authController.changePassword);
router.patch('/send-forgot-password-code', authController.sendForgotPasswordCode);
router.patch('/verify-forgot-password-code', authController.verifyForgotPasswordCode);

module.exports = router;