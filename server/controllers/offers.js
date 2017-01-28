module.exports = function(jwt_key) {
	var offer = require('../models/offer')(jwt_key);
	return {
		getAcceptedOffers: function(req, res) {
			offer.getAcceptedOffers(req, function(err, data) {
				if (err)
					res.status(err.status).json({message: err.message});
				else
					res.json(data);
			});
		},
		index: function(req, res) {
			offer.index(req, function(err, data) {
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
		},
		send: function(req, res) {
			offer.send(req, function(err, data) {
				if (err)
					res.status(err.status).json({message: err.message});
				else
					res.json(data);
			});
		},
		accept: function(req, res) {
			offer.accept(req, function(err, data) {
				if (err)
					res.status(err.status).json({message: err.message});
				else
					res.json(data);
			});
		}
	}
}
