function _get(req, res, next) {
    var sess = req.session;
    let objRet = { topic: req.originalUrl, token: req.token, data: {} };
    let dataRet = objRet.data;
    switch (req.action) {
        case ('infos'):
        {
            dataRet.SITENAME = "Hello World";
            res.send(JSON.stringify(objRet));
            break;
        }
    }
}

module.exports.get = _get;