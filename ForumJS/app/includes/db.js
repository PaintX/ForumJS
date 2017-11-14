var sqlite = require('./driver/sqlite');

function init()
{
    sqlite.init();
}

module.exports.init = init;