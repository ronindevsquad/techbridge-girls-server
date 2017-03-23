module.exports = function(jwt_key) {
	var user = require('../models/user')(jwt_key);
	return {
		show: function(req, res) {
			user.show(req, function(err, data) {
				if (err)
					res.status(err.status).json({message: err.message});
				else
					res.json(data);
			});
		},
		notifications: function(req, res) {
			user.notifications(req, function(err, data) {
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
					res.clearCookie('anvyl_token').cookie('anvyl_token', data).end();
			});
		},
		delete: function(req, res) {
			user.delete(req, function(err) {
				if (err)
					res.status(err.status).json({message: err.message});
				else
					res.clearCookie('anvyl_token').end();
			});
		},
		changePassword: function(req, res) {
			user.changePassword(req, function(err, data){
				if (err)
					res.status(err.status).json({message: err.message});
				else
					res.end();
			});
		},
		register: function(req, res) {
			user.register(req, function(err, data) {
				if (err)
					res.status(err.status).json({message: err.message});
				else
					res.cookie('anvyl_token', data).end();
			});
		},
		registerLinkedIn: function(req, res) {
			user.registerLinkedIn(req, function(err, data) {
				if (err)
					res.status(err.status).json({message: err.message});
				else
					res.cookie('anvyl_token', data).end();
			});
		},
		login: function(req, res) {
			user.login(req, function(err, data) {
				if (err)
					res.status(err.status).json({message: err.message});
				else {
					console.log(data)
					res.json(data);
				}
			});
		},
		loginLinkedIn: function(req, res) {
			user.loginLinkedIn(req, function(err, data) {
				if (err) {
					res.status(err.status).json({message: err.message});
				}
				else {
					res.json(data);
				}
			});
		},
		sendTicket: function(req, res) {
			user.sendTicket(req, function(err, data) {
				if (err) {
					res.status(err.status).json({message: err.message});
				}
				else {
					res.cookie('anvyl_token', data).end();
				}
			});
		}
	}
}
