var i18n = require('../../helpers/i18n');

var errors = [];
var warnings = [];

function _add_error_message(error_title, error_description )
{
	let error = translate_message(error_title, error_description);
	/*if (!is_array($error_title) && strpos($error_title, '<br />') !== false)
	{
		$error_title = strip_tags(htmlspecialchars_decode($error_title));
	}
	$this->errors[] = $this->translate_message($error_title, $error_description);*/
	errors.push(error);
}
	
function _add_warning_message(warning_title, warning_description )
{
	let warning = translate_message(warning_title, warning_description);
	warnings.push(warning);// = $this->translate_message($warning_title, $warning_description);
}
	
	/**
	 * Localize message.
	 *
	 * Note: When an array is passed into the parameters below, it will be
	 * resolved as printf($param[0], $param[1], ...).
	 *
	 * @param array|string		$title			Title of the message
	 * @param array|string|bool	$description	Description of the message
	 *
	 * @return array	Localized message in an array
	 */
	function translate_message(title, description)
	{
		let message_array = {};

		message_array.title = i18n.getLangForInstall(title);

		if (description != undefined )
		{
			message_array.description = i18n.getLangForInstall(description);
		}

		return message_array;
	}
	
	function _get_warning_messages()
		{
			return warnings;
		}
		
	function _get_error_messages()
		{
			return errors;
		}
		
		function _clear_error_messages()
			{
			 errors = [];
		}	
				function _clear_warning_messages()
			{
			 warnings = [];
		}	
module.exports.get_error_messages = _get_error_messages;
module.exports.get_warning_messages = _get_warning_messages;
module.exports.add_error_message = _add_error_message;
module.exports.add_warning_message = _add_warning_message;
module.exports.clear_error_messages = _clear_error_messages;
module.exports.clear_warning_messages = _clear_warning_messages;