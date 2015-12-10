var PythonShell = require('python-shell');

module.exports = (function () {
	var exports = {};

	exports.speak = function (message, cb) {
		var options = {
			mode: 'text',
			args: [message]
		};

		PythonShell.run('tts.py', options, function (err, results) {
			if (err) throw err;			
			cb(results);
		});
	}

	return exports;
})();