const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../../middleware/auth");
const multer = require("../../middleware/multerInMemory");
const sharp = require("../../middleware/resizeSavePictures");

//POST Create new user
router.post('/',auth, userController.createUser);

//GET All
router.get('/',auth, userController.getAllUsers);

//GET by id
router.get('/:id',auth, userController.getUserById);

//PUT user instead
router.put('/:id',auth,multer,sharp, userController.putUser);

//DELETE
router.delete('/:id',auth, userController.deleteUser);


module.exports = router;
