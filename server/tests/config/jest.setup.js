require("dotenv").config();
const mongoose = require("mongoose");

// setup.js
module.exports = async () => {
  console.log("I'll be called first before any test cases run");
  
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
};
