var crypto = require('crypto');

function generateSalt()
{
    return crypto.randomBytes(Math.ceil(32/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,32);   /** return required number of characters */
}

function hashPassword( password , salt )
{
    var hash = crypto.createHash('sha256');
    hash.update(password);
    hash.update(salt);
    return hash.digest('hex');
}

module.exports.generateSalt = generateSalt;
module.exports.hashPassword = hashPassword;