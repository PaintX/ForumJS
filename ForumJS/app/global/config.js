
var config = {};

function _set (key, val)
{
    config[key] = val;
}

function _get(key)
{
    return config[key];
}

module.exports.set = _set;
module.exports.get = _get;