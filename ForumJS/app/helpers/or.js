var util = require('handlebars-utils');

function _helper(/* any, any, ..., options */) {
  var len = arguments.length - 1;
  var options = arguments[len];
  var val = false;

  for (var i = 0; i < len; i++) {
    if (arguments[i]) {
      val = true;
      break;
    }
  }
  return util.value(val, this, options);
};

module.exports.helper = _helper;