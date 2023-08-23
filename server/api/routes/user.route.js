const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");



//POST Create new user
router.post('/', userController.createUser);

//GET All
router.get('/', userController.getAllUsers);

//GET by id
router.get('/:id', userController.getUserById);

//PUT user instead
router.put('/:id', userController.putUser);

//DELETE
router.delete('/:id', userController.deleteUser);


module.exports = router;
