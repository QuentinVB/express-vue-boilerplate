require("dotenv").config();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { sendEmailConfirm } = require("../../services/emailer.js");
const { confirmKeyGenerator } = require("../../helpers/confirmKey.js");
const SALTROUND = 10;

const UserModel = require("../models/user.model");

//TODO : split controller and user service/DAL (3 concern here : request deconstruction, response building and DB access)
//TODO : remove un-necessary data to front
//CREATE
const createUser = asyncHandler(async (req, res, next) => {
  const { password, ...user } = req.body;

  userInDB = await UserModel.findOne({ userName: user.userName });
  if (userInDB) {
    return res.status(401).json({ error: "Utilisateur déja existant !" });
  }

  const hash = await bcrypt.hash(password, SALTROUND);
  user.passwordHash = hash;

  let newUser = new UserModel({ ...user });
  newUser = await newUser.save();

  newUserObject = newUser.toObject();
  delete newUserObject.passwordHash;

  //FIXME: coupling and to many responsibilities
  if (process.env.NODE_ENV !== "test") {
    const key = await confirmKeyGenerator(
      newUser.id,
      newUser.userName,
      newUser.userEmail
    );
    await sendEmailConfirm(newUser.userEmail, newUser.id, key);
  }
  res.status(201).json(newUserObject);
});

//READ
const getAllUsers = asyncHandler(async (req, res, next) => {
  let users = await UserModel.find({}).exec();

  users = users.map((u) => {
    let user = u.toObject();
    delete user.passwordHash;
    return user;
  });

  res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let user;

  try {
    user = await UserModel.findById(id);
  } catch (error) {
    //FIXME : filter error
    res.status(404).json({ error: "user not found", id });
    return;
    throw error;
  }

  user = user.toObject();
  delete user.passwordHash;

  res.status(200).json(user);
});
//get by name ?

//UPDATE
const putUser = asyncHandler(async (req, res, next) => {
  //const { password, ...user } = req.body.User;
  const id = req.params.id;
  /*
  if (password) {
    const hash = await bcrypt.hash(password, 10);
    user.passwordHash = hash;
  }*/

  let updatedUser;
  try {
    updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { 
        profilePictureFilename: req.file.filename ?? ""
      },
      {
        new: true,
      }
    );
  } catch (error) {
    res.status(404).json({ error: "user not found", id });
    return;
  }
  updatedUser = updatedUser.toObject();
  delete updatedUser.passwordHash;

  res.status(200).json(updatedUser);
});
//patch

//DELETE
const deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  await UserModel.findByIdAndRemove(id);
  res.status(200).json();
});

module.exports = { createUser, getAllUsers, getUserById, putUser, deleteUser };
