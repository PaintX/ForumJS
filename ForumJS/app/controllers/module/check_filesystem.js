var appRoot = require('app-root-path');
var path = require('path');
var messages = require('./messages');
var fs = require('fs');

var tests_passed = false;

var files_to_check = [
	{
		'path' : 'cache/',
		'failable' : false,
		'is_file' : false,
	},	
	{
		'path' : 'store/',
		'failable' : false,
		'is_file' : false,
	},
	{
		'path' : 'files/',
		'failable' : false,
		'is_file' : false,
	},
	{
		'path' : 'images/avatars/upload/',
		'failable' : true,
		'is_file' : false,
	},
];

function check_file(file, failable)
{
	console.log(appRoot);
	
}

function check_dir(dir, failable)
{
	let directory = path.join(appRoot.path , dir );
	let exists = false;
	let writable = false;
	
	// Try to create the directory if it does not exist
	if ( !fs.existsSync(directory) )
	{
		console.log("Not Existing : " + directory);
		try 
		{
			fs.mkdirSync(directory,'777');
			fs.chmodSync(directory, '777');			
			exists = true;
		} catch(err)
		{
			console.log("error creating folder => " + err);
		}
	}
	
	// Now really check
	if (fs.existsSync(directory) && fs.lstatSync(directory).isDirectory())
	{
		try
		{
			exists = true;
			fs.chmodSync(directory, '777');
		}
		catch(err)
		{
			console.log("error creating folder => " + err);
		}
	}

	if (fs.lstatSync(directory).mode == 16895)
	{
		writable = true;
	}
	
	_set_test_passed((exists && writable) || failable);
	
	if (!(exists && writable))
	{
		let title = (exists) ? 'DIRECTORY_NOT_WRITABLE' : 'DIRECTORY_NOT_EXISTS';
		let lang_suffix = '_EXPLAIN';
		lang_suffix += (failable) ? '_OPTIONAL' : '';
		let description = [title + lang_suffix, dir];

		if (failable)
		{
			messages.add_warning_message(title, description);
			//$this->response->add_warning_message($title, $description);
			console.log("warning : " + title);
		}
		else
		{
			messages.add_error_message(title, description);
			//$this->response->add_error_message($title, $description);
			console.log("error : " + title);
		}
	}
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