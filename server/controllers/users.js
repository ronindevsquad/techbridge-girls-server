var user = require('../models/user');

module.exports = {
	show: function(req, res) {
		user.show(req, function(err, data) {
			if (err)
				res.status(err.status).json({message: err.message});
			else
				res.json(data);
		});
	},
	update: function(req, res) {
		user.update(req, function(err, data) {
			if (err)
				res.status(err.status).json({message: err.message});
			else
				res.clearCookie('evergreen_token').cookie('evergreen_token', data).end();
		});
	},
	delete: function(req, res) {
		user.delete(req, function(err) {
			if (err)
				res.status(err.status).json({message: err.message});
			else
				res.clearCookie('evergreen_token').end();
		});
	},
	changePassword: function(req, res) {
		user.changePassword(req, function(err, data){
			if (err)
				res.status(err.status).json({message: err.message});
			else
				res.clearCookie('evergreen_token').cookie('evergreen_token', data).end();
		});
	},
	register: function(req, res) {
		user.register(req, function(err, data) {
			if (err)
				res.status(err.status).json({message: err.message});
			else
				res.cookie('evergreen_token', data).end();
		});
	},
	login: function(req, res) {
		user.login(req, function(err, data) {
			if (err)
				res.status(err.status).json({message: err.message});
			else
				res.cookie('evergreen_token', data).end();
		});
	}
}
