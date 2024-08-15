require("dotenv").config();
const createFixtures = require("./fixtures");
const {
  dbConnect,
  dbDisconnect,
  dbClear
} = require('../utils/dbHandler.utils');

console.info("CONFIGURE BEFORE/AFTER EACH FILE");
beforeEach(async () => {
  await dbClear();
  await createFixtures();
});
beforeAll(async () => {
  await dbConnect()
});

afterAll(async () => {
  await dbClear();
  await dbDisconnect();
});

afterEach(async () => {
  await dbClear();
});
