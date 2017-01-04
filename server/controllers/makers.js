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
	show: function(req, res) {
		maker.show(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.json(data);
		});
	},
	update: function(req, res) {
		maker.update(req, function(err, data) {
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
		maker.delete(req, function(err) {
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
		maker.changePassword(req, function(err, data){
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
		maker.register(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('evergreen_token', data).end();
		});
	},
	login: function(req, res) {
		maker.login(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('evergreen_token', data).end();
		});
	}
}
