var report = require('../models/report');

module.exports = {
	index: function(req, res) {
		report.index(req, function(err, data) {
			if (err)
				res.status(err.status).json({message: err.message});
			else
				res.json(data);
		});
	}
}
