var process = require('../models/process');

module.exports = {
	set: function(req, res) {
		process.set(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('evergreen_token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});
	}
}