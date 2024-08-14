require("dotenv").config();
const mongoose = require("mongoose");
const clearDatabase = require("./clearDatabase");

console.log("CONFIG AFTER EACH FILE");
afterAll(async () => {
  await clearDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await clearDatabase();
});
