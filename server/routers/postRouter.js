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
router.get('/single-post', identifier, postController.singlePost);
router.post('/create-post', identifier, postController.createPost);

router.put('/update-post', identifier, postController.updatePost);
router.delete('/delete-post', identifier, postController.deletePost);

module.exports = router;