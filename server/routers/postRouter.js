// import express
const express = require('express');

// import controllers for the logic
const postController = require('../controllers/postController.js')

// import the identifier function
const {identifier } = require('../middlewares/identification.js')

//initialise a router to modularise the application routes
const router = express.Router()

// public pathways
router.get('/all-posts', identifier, postController.getPosts);
router.get('/single-post', identifier, postController.signin);
router.post('/create-post', identifier, postController.signout);

router.put('/update-post', identifier, postController.sendVerificationCode);
router.delete('/delete-post', identifier, postController.verifyVerificationCode);

module.exports = router;