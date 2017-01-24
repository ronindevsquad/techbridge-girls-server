var proposal = require('../models/proposal');

module.exports = {
	index: function(req, res) {
		proposal.index(req, function(err, data) {
			if (err)
				res.status(err.status).json({message: err.message});
			else
				res.json(data);
		});
	},
	show: function(req, res) {
		proposal.show(req, function(err, data) {
			if (err)
				res.status(err.status).json({message: err.message});
			else
				res.json(data);
		});
	},
	create: function(req, res) {
		proposal.create(req, function(err, data) {
			if (err)
				res.status(err.status).json({message: err.message});
			else
				res.json(data);
		});
	}
}
