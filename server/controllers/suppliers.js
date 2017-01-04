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
	show: function(req, res) {
		supplier.show(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.json(data);
		});
	},
	update: function(req, res) {
		supplier.update(req, function(err, data) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('evergreen_token').json(err);
				else
					res.json(err);
			else
				res.clearCookie('evergreen_token').cookie('evergreen_token', data).end();
		});
	},
	delete: function(req, res) {
		supplier.delete(req, function(err) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('evergreen_token').json(err);
				else
					res.json(err);
			else
				res.clearCookie('evergreen_token').end();
		});
	},
	changePassword: function(req, res) {
		supplier.changePassword(req, function(err, data){
			if (err)
				if (err.errors.jwt)
					res.clearCookie('evergreen_token').json(err);
				else
					res.json(err);
			else
				res.clearCookie('evergreen_token').cookie('evergreen_token', data).end();
		});
	},
	register: function(req, res) {
		supplier.register(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('evergreen_token', data).end();
		});
	},
	login: function(req, res) {
		supplier.login(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('evergreen_token', data).end();
		});
	}
}
