require("dotenv").config();
const createFixtures = require("./fixtures");
const clearDatabase = require("./clearDatabase");
const {
  dbConnect,
  dbDisconnect,
} = require('../utils/dbHandler.utils');

console.log("CONFIGURE BEFORE/AFTER EACH FILE");
beforeEach(async () => {
  await clearDatabase();
  await createFixtures();
});
beforeAll(async () => {
  await dbConnect()
  //await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await clearDatabase();
  await dbDisconnect();
  //await mongoose.connection.close();
});

afterEach(async () => {
  await clearDatabase();
});
