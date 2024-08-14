require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

module.exports = async function () {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  global.__MONGOINSTANCE = instance;
  process.env.MONGODB_URI = uri.slice(0, uri.lastIndexOf("/"));

  const conn = await mongoose.connect(
    `${process.env.MONGODB_URI}/${process.env.MONGODB_DB}`
  );
  await conn.connection.db.dropDatabase();
  await mongoose.disconnect();
}
