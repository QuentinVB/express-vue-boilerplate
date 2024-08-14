const MongoMemoryServer = require("mongodb-memory-server");

module.exports = async function () {
  const instance = global.__MONGOINSTANCE;
  /*if (!(instance instanceof "MongoMemoryServer"))
    throw new Error("instance should be in memory during tests");
*/
  await instance.stop();
};
