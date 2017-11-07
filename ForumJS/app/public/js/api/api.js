import websocket from "websocket";
import siteinfos from "siteinfos";
var wsUrl = "ws://localhost";

function _init(callback)
{
    websocket.connect(wsUrl);
    websocket.onConnect(function () {
        websocket.send("/api/site/infos", {}).then((response) => {
            for (let key in response)
                siteinfos.set(key, response[key]);
            callback();
        });
        
    });
}

function _login(obj)
{
    return websocket.send("/api/users/login", obj);
}

module.exports.login = _login;
module.exports.init = _init;
