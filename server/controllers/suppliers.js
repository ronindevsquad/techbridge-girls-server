var supplier = require('../models/supplier');

module.exports = {
	// index: function(req, res) {
	// 	supplier.index(function(err, data) {
	// 		if (err)
	// 			res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	// show: function(req, res) {
	// 	supplier.show(req, function(err, data) {
	// 		if (err)
	// 			res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	update: function(req, res) {
		supplier.update(req, function(err, data) {
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
		supplier.delete(req, function(err) {
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
		supplier.register(req, function(err, data) {
			if (err){
				console.log(err);
				res.json(err);
			}
			else
				res.cookie('token', data).end();
		});
	},
	login: function(req, res) {
		supplier.login(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('token', data).end();
		});
	},
	fb_register: function(req, res) {
		supplier.fb_register(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('token', data).cookie('fb', true).end();
		});
	},
	fb_login: function(req, res) {
		supplier.fb_login(req, function(err, data) {
			if (err)
				res.json(err);
			else {
				var c1 = res.cookie.serialize('token', data);
				var c2 = res.cookie.serialize('fb', true);
				res.append('Set-Cookie', c1).append('Set-Cookie', c2);
				// res.cookie('token', data).cookie('fb', true).end();
			}
		});
	}
}
