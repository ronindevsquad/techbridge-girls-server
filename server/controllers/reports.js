var report = require('../models/report');

module.exports = {
	index: function(req, res) {
		report.index(req, function(err, data) {
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
	// 	proposal.show(req, function(err, data) {
	// 		if (err)
	// 			if (err.errors.jwt)
	// 				res.clearCookie('evergreen_token').json(err);
	// 			else
	// 				res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	// create: function(req, res) {
	// 	proposal.create(req, function(err, data) {
	// 		if (err)
	// 			if (err.errors.jwt)
	// 				res.clearCookie('evergreen_token').json(err);
	// 			else
	// 				res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	// update: function(req, res) {
	// 	proposal.update(req, function(err, data) {
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
	// 	proposal.delete(req, function(err) {
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
