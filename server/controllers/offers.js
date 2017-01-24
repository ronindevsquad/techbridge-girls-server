var offer = require('../models/offer');

module.exports = {
	getAcceptedOffers: function(req, res) {
		offer.getAcceptedOffers(req, function(err, data) {
			if (err)
				res.status(err.status).json({message: err.message});
			else
				res.json(data);
		});
	},
	index: function(req, res) {
		offer.index(function(err, data) {
			if (err)
				res.status(err.status).json({message: err.message});
			else
				res.json(data);
		});
	},
	create: function(req, res) {
		offer.create(req, function(err, data) {
			if (err)
				res.status(err.status).json({message: err.message});
			else
				res.json(data);
		});
	}
}
