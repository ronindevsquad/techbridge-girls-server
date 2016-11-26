// var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');
// var getPayload = require('./getPayload');

// var User = mongoose.model('User');
// var Post = mongoose.model('Post');

var user = require('../models/user');
var post = require('../models/post');

module.exports = {
	index: function(req, res) {
		user.index(function(err, data) {
			if (err)
				res.json(err);
			else
				res.json(data);
		});
	},
	// toggleFavorite : function(req, res) {
	// 	var payload = getPayload(req.body.headers);
	// 	var newFavorites = [];  

	// 	if (!payload.username) { //if the user is not signed in they can't favorite
	// 		res.send(403)		
	// 	}
	// 	else {
	// 		User.findOne({username: payload.username}, function(err, user){
	// 			if (err)
	// 				res.json(err);
	// 			else {
	// 				for(var i = 0; i < user.favorites.length; i++) {
	// 					if(user.favorites[i] != req.params.id){
	// 						newFavorites.push(user.favorites[i]);
	// 					}
	// 				}
	// 				if (newFavorites.length != user.favorites.length){
	// 					user.favorites = newFavorites;
	// 				}
	// 				else {
	// 					user.favorites.push(req.params.id);
	// 				}

	// 				user.save(function(err, data){
	// 					if(err){
	// 						res.json(err);
	// 					}
	// 					else
	// 						res.json(data);
	// 				});
	// 			}
	// 		});
	// 	} 
	// },
	create: function(req, res) {
		user.create(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.json(data);
		});

		// if (req.body.password != req.body.confirm_password)
		// 	res.json({errors: {password: {message: "Passwords do not match."}}});
		// else {
		// 	var user = new User(req.body);

		// 	// Check for unique username:
		// 	User.findOne({username: user.username}, function(err, data) {
		// 		if (err)
		// 			res.json(err);
		// 		else if (data)
		// 			res.json({errors: {username: {message: "Username already registered."}}});
		// 		else {
		// 			// Check for unique email:
		// 			User.findOne({email: user.email}, function(err, data) {
		// 				if (err)
		// 					res.json(err);
		// 				else if (data)
		// 					res.json({errors: {email: {message: "Email already in use."}}});
		// 				else {
		// 					user.save(function(err, data) {
		// 						if (err)
		// 							res.json(err);
		// 						else {
		// 							var token = jwt.sign({username: data.username}, 'secret_key');
		// 							res.json(token);
		// 						}
		// 					});
		// 				}
		// 			});
		// 		}
		// 	});
		// }
	},
	update: function(req, res) {
		user.update(req, function(err, data) {
			if (typeof err == "number")
				res.status(err).end();
			else if (err)
				res.json(err);
			else
				res.json(data);
		});	
	},
	delete: function(req, res) {
		user.delete(req, function(err, data) {
			if (typeof err == "number")
				res.status(err).end();
			else if (err)
				res.json(err);
			else
				res.json(data);
		});	
	},
	show: function(req, res) {
		user.show(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.json(data);
		});
	},
	login: function(req, res) {
		user.login(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.json(data);
		});	
	}
}
