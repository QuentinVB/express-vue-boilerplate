require("dotenv").config();
const mongoose = require("mongoose");
const createFixtures = require("./fixtures");
const clearDatabase = require("./clearDatabase");

console.log("CONFIGURE BEFORE EACH FILE");
beforeEach(async () => {
  await clearDatabase();
  await createFixtures();
});
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});
