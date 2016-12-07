var maker = require('../models/maker');

module.exports = {
	// index: function(req, res) {
	// 	maker.index(function(err, data) {
	// 		if (err)
	// 			res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	// show: function(req, res) {
	// 	maker.show(req, function(err, data) {
	// 		if (err)
	// 			res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	update: function(req, res) {
		maker.update(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('token').json(err);
				else
					res.json(err);
			else
				res.clearCookie('token').cookie('token', data).end();
		});	
	},
	delete: function(req, res) {
		maker.delete(req, function(err) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('token').json(err);
				else
					res.json(err);
			else
				res.clearCookie('token').end();
		});	
	},
	register: function(req, res) {
		maker.register(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('token', data).end();
		});
	},
	login: function(req, res) {
		maker.login(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('token', data).end();
		});	
	},
	fb_register: function(req, res) {
		maker.fb_register(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('token', data).end();
		});
	},	
	fb_login: function(req, res) {
		maker.fb_login(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('token', data).end();
		});	
	}	
}
