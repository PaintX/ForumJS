var util = require('handlebars-utils');

function _helper(val, options) {
    return util.value(!val, this, options);
};

module.exports.helper = _helper;