const bcrypt = require("bcrypt");
const SALTROUND = 10;

/**
 * Generate an hased key
 * @param {string} id 
 * @param {string} userName 
 * @param {string} userEmail 
 */
async function confirmKeyGenerator(id,userName,userEmail) {
    const clearKey = `${id}.${userName}.${userEmail}`
    return await bcrypt.hash(clearKey, SALTROUND);;
}

async function confirmKey(id,userName,userEmail,keyToCheck)
{
    const clearKey = `${id}.${userName}.${userEmail}`
    return await bcrypt.compare(clearKey, keyToCheck);
}
module.exports = {confirmKeyGenerator,confirmKey};