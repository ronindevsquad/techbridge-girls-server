var process = require('../models/process');

module.exports = {
	set: function(req, res) {
		process.set(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.json(data);
		});
	}
}