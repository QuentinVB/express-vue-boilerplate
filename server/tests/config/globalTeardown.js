const {dbTeardown} = require("../utils/dbHandler.utils")

module.exports = async function () {
  await dbTeardown();
}

