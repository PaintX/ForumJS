var appRoot = require('app-root-path');
var path = require('path');
var messages = require('./messages');
var child_process = require('child_process');
var tests_passed = false;


	/**
	 * Check if the requirements for PHP version is met
	 */
	function check_node_version()
	{
		let result = child_process.execSync('node --version',{encoding:'utf8'});

		if (!result.startsWith('v6.'))
		{
			messages.add_error_message('PHP_VERSION_REQD', 'PHP_VERSION_REQD_EXPLAIN');

			_set_test_passed(false);
			return;
		}

		_set_test_passed(true);
	}
	
	function check_image_size()
	{
		if (!require('image-size'))
		{
			messages.add_error_message('PHP_GETIMAGESIZE_SUPPORT', 'PHP_GETIMAGESIZE_SUPPORT_EXPLAIN');

			_set_test_passed(false);
			return;
		}

		_set_test_passed(true);
	}
	
function _run()
{
	tests_passed = true;
	
	check_node_version();
	check_image_size();
	
	return tests_passed;
}

function _set_test_passed(is_passed)
{
	// If one test failed, tests_passed should be false
	tests_passed = (!tests_passed) ? false : is_passed;
}

function _get_step_count()
{
	return 0;
}

/**
 * {@inheritdoc}
 */
function _get_task_lang_name()
{
	return '';
}
module.exports.run = _run;
module.exports.set_test_passed = _set_test_passed;
module.exports.get_step_count = _get_step_count;
module.exports.get_task_lang_name = _get_task_lang_name;