var connection = require('../config/mysql');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var getPayload = require('./getPayload');

module.exports = {
	index: function(callback) {
		var query = "SELECT * FROM users";
		connection.query(query, function(err, data) {
			if (err)
				callback(err);
			else
				callback(false, data)
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
	create: function(req, callback) {
		// Check for unique username and email:
		var query = "SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1";
		var data = [req.body.username, req.body.email];
		connection.query(query, data, function(err, data) {
			console.log("create user data:", data)
			if (err)
				throw err;
			else
				if (data.length > 0) 
					callback({errors: {username_email: {message: "Username/email already in use."}}});
				else {
					// Validate username:
					if (!/^[a-z0-9]{3,32}$/i.test(req.body.username)) {
						callback({errors: {username : {message: "Username must be alphanumeric and at least four characters long."}}});
						return;							
					}

					// Validate email:
					if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.email)) {
						callback({errors: {email : {message: "Invalid email. Email format should be: email@mailserver.com."}}});
						return;
					}

					// Validate password:
					if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&](?=.{7,})/.test(req.body.password)) {
						callback({errors: {password : {message: "Password must be at least 8 characters long and have a lowercase letter, an uppercase letter, and a number."}}});
						return;
					}

					// Validate confirm_password:
					if (req.body.password != req.body.confirm_password) {
						callback({errors: {confirm_password: {message: "Passwords do not match."}}});
						return;
					}

					// Valid new user, encrypt password and save:
					bcrypt.genSalt(10, function(err, salt) {
						if (err)
							throw err;
						else
							bcrypt.hash(req.body.password, salt, function(err, hash) {
								if (err)
									throw err;
								else {
									var query = "INSERT INTO users SET ?";
									var data = {
										username: req.body.username,
										email: req.body.email,
										password: hash,
										created_at: 'NOW()',
										updated_at: 'NOW()'											
									};
									connection.query(query, data, function(err, data) {
										if (err)
											throw err;
										else {
											var token = jwt.sign({username: req.body.username}, 'secret_key');
											callback(false, token);
										}
									});
								}
							});
					});						
				}
			});
	},
	// update: function(req, callback) {
	// 	var payload = getPayload(req.headers);
	// 	if (payload.username != req.body.username) {
	// 		callback(403);
	// 		return;
	// 	}



	// 	User.update({username: req.params.username}, {$set: {
	// 		posts: req.body.posts,
	// 		favorites: req.body.favorites
	// 	}}, function(err, data) {
	// 		if (err)
	// 			res.json(err);
	// 		else
	// 			res.json(data);
	// 	});
	// },
	delete: function(req, callback) {
		var username = getPayload(req.headers).username;
		if (username != req.body.username) {
			callback(403);
			return;
		}

		var query = "SELECT id FROM users WHERE username = ? LIMIT 1"
		connection.query(query, username, function(err, data) {
			if (err)
				callback(err);
			else {
				var user = data[0];
				var query = "DELETE FROM links WHERE post_id IN \
				(SELECT links.id FROM links LEFT JOIN posts ON post_id = posts.id \
				WHERE user_id = ?)"
				connection.query(query, user.id, function(err) {
					if (err)
						callback(err);
					else {
						var query = "DELETE FROM favorites WHERE user_id = ?"
						connection.query(query, user.id, function(err) {
							if (err)
								callback(err);
							else {
								var query = "DELETE FROM posts WHERE user_id = ?"
								connection.query(query, user.id, function(err) {
									if (err)
										callback(err);
									else {
										var query = "DELETE FROM users WHERE id = ?"
										connection.query(query, user.id, function(err, data) {
											if (err)
												callback(err);
											else
												callback(false, data)
										});
									}
								});
							}			
						});
					}
				});
			}
		});
	},
	show: function(req, callback) {
		var data = {};
		var username = req.params.username;

		// Get posts:
		var query = "SELECT * FROM posts LEFT JOIN users ON user_id = users.id WHERE username = ?";
		connection.query(query, username, function(err, posts) {
			if (err) {
				callback(err);
				return;
			}
			data.posts = posts;
		});

		// Get favorites:
		var query = "SELECT * FROM favorites LEFT JOIN users ON user_id = users.id \
		LEFT JOIN posts ON post_id = posts.id WHERE username = ?";
		connection.query(query, username, function(err, favorites) {
			if (err) {
				callback(err);
				return;
			}
			data.favorites = favorites;
		});

		callback(false, data)
	},
	login: function(req, callback) {
		// Get user by username:
		var username = req.body.username;
		var query = "SELECT * FROM users WHERE username = ? LIMIT 1";
		connection.query(query, username, function(err, data) {
			if (err)
				res.json(err);
			else 
				if (data.length == 0)
					callback({errors: {username: {message: "Username does not exist."}}});
				else {
					// Check valid password:
					bcrypt.compare(req.body.password, data[0].password, function(err, isMatch) {
						if (err)
							callback(err);
						else
							if (!isMatch)
								console.log({errors: {password: {message: "Username/password does not match."}}});
							else {
								var token = jwt.sign({username: data.username}, 'secret_key');
								callback(false, token);								
							}
					});					
				}
		});
	}
};