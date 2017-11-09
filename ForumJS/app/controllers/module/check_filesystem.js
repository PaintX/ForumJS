var tests_passed = false;
var files_to_check = [
	{
		'path' : 'cache/',
		'failable' : false,
		'is_file' : false,
	},
];

function check_file(file, failable)
{
	
}

function check_dir(file, failable)
{
	
}

function _run()
{
	tests_passed = true;
	
	files_to_check.map((file)=>{
		if(file.is_file == true)
		{
			check_file(file.path,file.failable);
		}
		else			
		{
			check_dir(file.path,file.failable);
		}
	});
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