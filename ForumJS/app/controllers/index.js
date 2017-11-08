function _get (req, res, next)
{
    return { S_VIEWTOPIC: false, S_VIEWFORUM : true };
}

function _post (req, res, next)
{
  return {};
}

module.exports.post = _post;
module.exports.get = _get;
