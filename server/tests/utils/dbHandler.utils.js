require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let DB_INSTANCE;

exports.dbSetup = async function () {
  DB_INSTANCE = await MongoMemoryServer.create();
  const uri = DB_INSTANCE.getUri();
  global.__MONGOINSTANCE = DB_INSTANCE;
  process.env.MONGODB_URI = uri.slice(0, uri.lastIndexOf("/"));

  const conn = await mongoose.connect(
    `${process.env.MONGODB_URI}/${process.env.MONGODB_DB}`
  );
  await conn.connection.db.dropDatabase();
  await mongoose.disconnect();
};

exports.dbTeardown = async function () {
  await DB_INSTANCE.stop();
};

exports.dbClear = async () => {
  await mongoose.connection.dropDatabase();
};

exports.dbConnect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

exports.dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
};
