var offer = require('../models/offer');

module.exports = {
	index: function(req, res) {
		offer.index(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('evergreen_token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});
	},
	// show: function(req, res) {
	// 	offer.show(req, function(err, data) {
	// 		if (err)
	// 			if (err.errors.jwt)
	// 				res.clearCookie('evergreen_token').json(err);
	// 			else
	// 				res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	create: function(req, res) {
		offer.create(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('evergreen_token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});
	},
	// update: function(req, res) {
	// 	offer.update(req, function(err, data) {
	// 		if (err)
	// 			if (err.errors.jwt)
	// 				res.clearCookie('evergreen_token').json(err);
	// 			else
	// 				res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	// delete: function(req, res) {
	// 	offer.delete(req, function(err) {
	// 		if (err)
	// 			if (err.errors.jwt)
	// 				res.clearCookie('evergreen_token').json(err);
	// 			else
	// 				res.json(err);
	// 		else
	// 			res.end();
	// 	});
	// }
}
