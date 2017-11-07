var socket = io();

var Subscribe = require('subscribe');

var ws = undefined;
var requests = new Map();
var token = 0;
var regexp = new RegExp('[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}');
var connectingState = false;

function _getRandom() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x'
                ? r
                : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function _connect(url)
{

    connectingState = false;

    // On receive message
    socket.on('message', msg => {

        let message = JSON.parse(msg);
        // Parse message
        let data = message.data;

        // Get topic from message
        let topic = message.topic;

        // Check topic
        if (topic !== undefined) {
            var group = message.token.match(regexp);
            if (group) {

                // Get random
                var random = group[0];
                if (random !== undefined) {

                    // Search for resolve function by random
                    if (requests.has(random)) {
                        var resolveFn = requests.get(random).resolveFn;

                        // Get referer
                        var referer = requests.get(random).referer;

                        // Call resolve function
                        let _data = Object.assign({}, data, {
                            referer: referer
                        });
                        resolveFn(_data);
                    }
                } else {
                    // General websocket messages
                }
            }
        }
    });
}

function _close()
{
   /* if (ws == undefined) {
        console.error("Websocket Not Connected");
        return;
    }
    socket.close();
    ws = undefined;*/
}

function _onConnect(callback)
{
    if (socket == undefined)
    {
        console.error("Websocket Not Connected");
        return;
    }
    if (callback != undefined)
    {
        socket.on('connect', function () {
            callback();
        });
    }
    else
    {
        socket.on('connect', function () {
        });
    }
}

function _onClose(callback)
{
   /* if (ws == undefined) {
        console.error("Websocket Not Connected");
        return;
    }
    if (callback != undefined) {
        ws.onclose = () => {
            callback();
        };
    }
    else {
        ws.onclose = () => {
        };
    }*/
}

function _send(subtopic, data, referer)
{
    let random = _getRandom();
    let promise = new Promise((resolve, reject) => {
    let userInfos = sessionStorage.getItem("user");
       let t =
           {
               "token": random,
                "topic": subtopic,
                "data": data,
        };

       if (connectingState == false)
       {               
           t.user = userInfos;
           connectingState = true;
       }
        requests.set(random,
            {
                resolveFn: function (data) {
                    resolve(data);

                    // Purge random map
                    requests.delete(random);
                },
                referer: referer
           });

        socket.emit(subtopic ,JSON.stringify(t));
    });
    return promise;

}

module.exports.ws = ws;
module.exports.connect = _connect;
module.exports.close = _close;
module.exports.onConnect = _onConnect;
module.exports.onClose = _onClose;
module.exports.send = _send;
