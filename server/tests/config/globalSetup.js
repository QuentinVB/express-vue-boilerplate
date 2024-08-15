require("dotenv").config();
const {dbSetup} = require("../utils/dbHandler.utils")

module.exports = async function () {
  await dbSetup();
}
