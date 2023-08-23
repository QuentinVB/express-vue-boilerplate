const mongoose = require("mongoose");
const UserModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");

//TODO : split controller and user service/DAL (3 concern here : request deconstruction, response building and DB access)
//TODO : remove un-necessary data to front
//CREATE
const createUser = asyncHandler(async (req, res, next) => {
  const user = req.body.user;
  console.log(user)
  let newUser = new UserModel({...user});

  newUser = await newUser.save();

  res
  .status(201)
  .contentType('json')
  .send(newUser.toJSON()); 
});

//READ
const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await UserModel.find({}).exec();
  res
  .status(200)
  .contentType('json')
  .send(JSON.stringify(users)); 
});

const getUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);
  res
  .status(200)
  .contentType('json')
  .send(JSON.stringify(user)); 
});
//get by name ?

//UPDATE
const putUser = asyncHandler(async (req, res, next) => {
  const user = req.body.user;
  const id = req.params.id;

  const updatedUser = await UserModel.findByIdAndUpdate(id,user,{});
  res
  .status(200)
  .contentType('json')
  .send(JSON.stringify(updatedUser)); 
  
});
//patch

//DELETE
const deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  await UserModel.findByIdAndRemove(id)
  res
  .status(200)
  .contentType('json')
  .end(); 
});

module.exports = { createUser, getAllUsers, getUserById, putUser, deleteUser };
