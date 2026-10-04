// import express
const express = require('express');

// import controllers for the logic
const authController = require('../controllers/authController.js')

//initialise a router to modularise the application routes
const router = express.Router()

// public pathways
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', authController.signout);

router.patch('/send-verification-code', authController.sendVerificationCode);
router.patch('/verify-verification-code', authController.verifyVerificationCode);

module.exports = router;