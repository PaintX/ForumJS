var util = require('handlebars-utils');

function _helper() {
    var len = arguments.length - 1;
    var options = arguments[len];
    var val = true;

    for (var i = 0; i < len; i++) {
        if (!arguments[i]) {
            val = false;
            break;
        }
    }

    return util.value(val, this, options);
};

module.exports.helper = _helper;