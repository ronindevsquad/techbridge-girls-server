var trucker = require('../models/trucker');

module.exports = {
	// index: function(req, res) {
	// 	trucker.index(function(err, data) {
	// 		if (err)
	// 			res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	// show: function(req, res) {
	// 	trucker.show(req, function(err, data) {
	// 		if (err)
	// 			res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	update: function(req, res) {
		trucker.update(req, function(err, data) {
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
		trucker.delete(req, function(err) {
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
		trucker.register(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('token', data).end();
		});
	},
	login: function(req, res) {
		trucker.login(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('token', data).end();
		});	
	},
	fb_register: function(req, res) {
		trucker.fb_register(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.cookie('token', data).cookie('fb', true).end();
		});
	},
	fb_login: function(req, res) {
		trucker.fb_login(req, function(err, data) {
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
