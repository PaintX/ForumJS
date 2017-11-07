var socket = require('websocket');

var componentList = [];

function _add(component) {
    componentList.push(component);
}

function _publish(data)
{
    componentList.map((_this) => {

        _this.messageEvent(data, _this);

    });
}

function _remove(component) {
    for (var i = 0; i < componentList.length; i++) {
        if (componentList[i].constructor.name === component.constructor.name) {
            componentList.splice(i, 1);
            break;
        }
    }
}

module.exports.add = _add;
module.exports.remove = _remove;
module.exports.publish = _publish;