var io = require('socket.io');

var socketList = {};

function _listen( server , callback )
{
    io = io.listen(server);

    io.on('connection', function (skt)
    {
        if (callback != undefined)
        {
            callback(skt);
        }
    });
}

function _add(skt, token)
{
    if (socketList[token] == undefined)
        socketList[token] = {};

    socketList[token][skt.id] = skt;
}

function _get(token)
{
    return socketList[token];
}

function _use(obj)
{
    io.use(obj);
}

function _delete(userId , sktId)
{
    delete socketList[userId][sktId];
}

module.exports.listen = _listen;
module.exports.use = _use;
module.exports.add = _add;
module.exports.get = _get;
module.exports.delete = _delete;