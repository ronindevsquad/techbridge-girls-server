var offer = require('../models/offer');

module.exports = {
	index: function(req, res) {
		offer.index(function(err, data) {
			if (err)
				res.json(err);
			else
				res.json(data);
		});
	},
	// show: function(req, res) {
	// 	user.show(req, function(err, data) {
	// 		if (err)
	// 			res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	// update: function(req, res) {
	// 	user.update(req, function(err, data) {
	// 		if (err)
	// 			if (err.errors.jwt)
	// 				res.clearCookie('evergreen_token').json(err);
	// 			else
	// 				res.json(err);
	// 		else
	// 			res.clearCookie('evergreen_token').cookie('evergreen_token', data).end();
	// 	});
	// },
	// delete: function(req, res) {
	// 	user.delete(req, function(err) {
	// 		if (err)
	// 			if (err.errors.jwt)
	// 				res.clearCookie('evergreen_token').json(err);
	// 			else
	// 				res.json(err);
	// 		else
	// 			res.clearCookie('evergreen_token').end();
	// 	});
	// },
	// changePassword: function(req, res) {
	// 	user.changePassword(req, function(err, data){
	// 		if (err)
	// 			if (err.errors.jwt)
	// 				res.clearCookie('evergreen_token').json(err);
	// 			else
	// 				res.json(err);
	// 		else
	// 			res.clearCookie('evergreen_token').cookie('evergreen_token', data).end();
	// 	});
	// },
	// register: function(req, res) {
	// 	user.register(req, function(err, data) {
	// 		if (err){
	// 			res.json(err);
	// 		}
	// 		else
	// 			res.cookie('evergreen_token', data).end();
	// 	});
	// },
	// login: function(req, res) {
	// 	user.login(req, function(err, data) {
	// 		if (err)
	// 			res.json(err);
	// 		else
	// 			res.cookie('evergreen_token', data).end();
	// 	});
	// }
}
