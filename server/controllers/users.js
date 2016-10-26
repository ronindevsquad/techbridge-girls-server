var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var getPayload = require('./GetPayload.js');

var User = mongoose.model('User');
module.exports = {
	index: function(req, res) {
		User.find({}, function(err, data) {
			if (err)
				res.json(err);
			else
				res.json(data);
		});
	},
	create: function(req, res) {
		if (req.body.password != req.body.confirm_password)
			res.json({errors: {password: {message: "Passwords do not match."}}});
		else {
			var user = new User(req.body);

			// Check for unique username:
			User.findOne({username: user.username}, function(err, data) {
				if (err)
					res.json(err);
				else if (data)
					res.json({errors: {username: {message: "Username already registered."}}});
				else {
					// Check for unique email:
					User.findOne({email: user.email}, function(err, data) {
						if (err)
							res.json(err);
						else if (data)
							res.json({errors: {email: {message: "Email already in use."}}});
						else {
							user.save(function(err, data) {
								if (err) 
									res.json(err);
								else {
									var token = jwt.sign({username: data.username}, 'secret_key');
									res.json(token);
								}
							});
						}
					});
				}
			});
		}
	},
	update: function(req, res) {
		var payload = getPayload(req.headers);
		if (payload.username != req.body.username)
			res.send(403)
		else
			User.update({username: req.params.username}, {$set: {
				posts: req.body.posts,
				favorites: req.body.favorites
			}}, function(err, data) {
				if (err) 
					res.json(err);
				else
					res.json(data);
			});
	},
	delete: function(req, res) {
		var payload = getPayload(req.headers);
		if (payload.username != req.body.username)
			res.send(403)
		else
			User.remove({username: req.params.username}, function(err, data) {
				if (err) 
					res.json(err);
				else
					res.json(data);
			});
	},
	show: function(req, res) {
		User.findOne({username: req.params.username})
		.populate('posts')
		.populate('favorites')
		.exec(function(err, data) {
			if (err) 
				res.json(err);
			else
				res.json(data);
		});
	},
	login: function(req, res) {
		// Get user by username:
		User.findOne({username: req.body.username}, function(err, data) {
			if (err) 
				res.json(err);
			else if (!data)
				res.json({errors: {username: {message: "Username does not exist."}}});
			else {
				// Check valid password:
				data.comparePassword(req.body.password, function(err, isMatch) {
					if (err)
						res.json(err);
					else if (!isMatch)
						res.json({errors: {password: {message: "Username/password does not match."}}});
					else {
						var token = jwt.sign({username: data.username}, 'secret_key');
						console.log(token);
						res.json(token);
					}
				});
			}
		});
	}
}