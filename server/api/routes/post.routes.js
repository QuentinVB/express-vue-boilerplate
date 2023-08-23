const express = require('express');
const router = express.Router();
const postController = require("../controllers/post.controller");
const auth = require("../../middleware/auth");


//POST Create new post
router.post('/',auth, postController.createPost);

//GET All
router.get('/',auth, postController.getAllPosts);

//GET by id
router.get('/:id',auth, postController.getPostById);

//PUT post instead
router.put('/:id',auth, postController.putPost);

//DELETE
router.delete('/:id',auth, postController.deletePost);


module.exports = router;
