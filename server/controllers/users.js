var user = require('../models/user');

module.exports = {
	// index: function(req, res) {
	// 	user.index(function(err, data) {
	// 		if (err)
	// 			res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	create: function(req, res) {
		user.create(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('token', data).end();
		});
	},
	// update: function(req, res) {
	// 	user.update(req, function(err, data) {
	// 		if (err)
	// 			res.clearCookie('token').json(err);
	// 		else
	// 			res.json(data);
	// 	});	
	// },
	delete: function(req, res) {
		user.delete(req, function(err) {
			if (err)
				res.clearCookie('token').json(err);
			else
				res.clearCookie('token').end();
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
	login: function(req, res) {
		user.login(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('token', data).end();
		});	
	},
	fb_login: function(req, res) {
		user.fb_login(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('token', data).end();
		});	
	}	
}
