
var variableInfoSite = {};

function _set(key, val)
{
    variableInfoSite[key] = val;
}

function _get(key)
{
    return variableInfoSite[key];
}

function _getAll() {
    return variableInfoSite;
}

module.exports.set = _set;
module.exports.get = _get;
module.exports.getAll = _getAll;
