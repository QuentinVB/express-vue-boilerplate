const mongoose = require("mongoose");
const UserModel = require("../models/user.model");

const createUser = async function (user) {
  const newUser = new UserModel({ ...user });

  await newUser.save();
};

const getUserById = async function (id) {
  const user = await UserModel.find({ id: id }).exec();
  return user;
};

module.exports = { createUser };
