require("dotenv").config();
const mongoose = require('mongoose');

exports.dbConnect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

exports.dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};