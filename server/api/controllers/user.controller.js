const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const UserModel = require("../models/user.model");

//TODO : split controller and user service/DAL (3 concern here : request deconstruction, response building and DB access)
//TODO : remove un-necessary data to front
//CREATE
const createUser = asyncHandler(async (req, res, next) => {
  const { password, ...user } = req.body.user;

  const hash = await bcrypt.hash(password, 10);
  user.passwordHash = hash;

  let newUser = new UserModel({ ...user });
  newUser = await newUser.save();

  newUser = newUser.toObject();
  delete newUser.passwordHash;

  res.status(201).json(newUser);
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
  let user = await UserModel.findById(id);

  user = user.toObject();
  delete user.passwordHash;

  res.status(200).json(user);
});
//get by name ?

//UPDATE
const putUser = asyncHandler(async (req, res, next) => {
  const { password, ...user } = req.body.user;
  const id = req.params.id;

  const hash = await bcrypt.hash(password, 10);
  user.passwordHash = hash;

  let updatedUser = await UserModel.findByIdAndUpdate(id, user, {});

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
