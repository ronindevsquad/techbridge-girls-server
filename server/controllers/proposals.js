module.exports = function(jwt_key) {
	var proposal = require('../models/proposal')(jwt_key);
	return {
		getMyProposals: function(req, res) {
			proposal.getMyProposals(req, function(err, data) {
				if (err)
					res.status(err.status).json({message: err.message});
				else
					res.json(data);
			});
		},
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
}
