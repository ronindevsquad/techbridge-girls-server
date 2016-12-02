var connection = require('../config/mysql');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var jwt_key = fs.readFileSync('keys/jwt', 'utf8');
var cookie_key = fs.readFileSync('keys/cookie', 'utf8');

module.exports = {
	// index: function(callback) {
	// 	connection.query("SELECT *, HEX(id) as id FROM users", function(err, data) {
	// 		if (err)
	// 			callback({errors: {database: {message: `Database error: ${err.code}.`}}})
	// 		else
	// 			callback(false, data)
	// 	});
	// },
	create: function(req, callback) {
		if (!req.body.first_name | !req.body.last_name | !req.body.email | !req.body.password | !req.body.confirm_password) 
			callback({errors: {form : {message: "All form fields are required."}}});
		else {
			// Check for unique username and email:
			var query = "SELECT email FROM users WHERE email = ? LIMIT 1";
			connection.query(query, req.body.email, function(err, data) {
				if (err)
					callback({errors: {database: {message: `Database error: ${err.code}.`}}})
				// If user already exists:
				else if (data.length > 0) 
					callback({errors: {email: {message: "Email already in use, please log in."}}});
				// Validate first_name:
				else if (!/^[a-z]{2,32}$/i.test(req.body.first_name)) 
					callback({errors: {first_name : {message: "First name must contain only letters."}}});
				// Validate last_name:
				else if (!/^[a-z]{2,32}$/i.test(req.body.last_name)) 
					callback({errors: {last_name : {message: "Last name must contain only letters."}}});
				// Validate email:
				else if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.email))
					callback({errors: {email : {message: "Invalid email. Email format should be: email@mailserver.com."}}});
				// Validate password:
				else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&](?=.{7,})/.test(req.body.password))
					callback({errors: {password : {message: "Password must be at least 8 characters long and have a lowercase letter, an uppercase letter, and a number."}}});
				// Validate confirm_password:
				else if (req.body.password != req.body.confirm_password)
					callback({errors: {confirm_password: {message: "Passwords do not match."}}});
				// Else valid new user:
				else
					// Encrypt password and save:
					bcrypt.genSalt(10, function(err, salt) {
						if (err)
							callback({errors: {salt: {message: "Salt error."}}})
						else
							bcrypt.hash(req.body.password, salt, function(err, hash) {
								if (err)
									callback({errors: {hash: {message: "Hash error."}}})
								else {
									var data = {
										first_name: req.body.first_name,
										last_name: req.body.last_name,
										email: req.body.email,
										password: hash										
									};
									connection.query("INSERT INTO users SET ?", data, function(err) {
										if (err)
											callback({errors: {database: {message: `Database error: ${err.code}.`}}})
										else {
											// Retrieve new user:
											var query = "SELECT *, HEX(id) as id FROM users WHERE email = ? LIMIT 1";
											connection.query(query, req.body.email, function(err, data) {
												if (err)
													callback({errors: {database: {message: `Database error: ${err.code}.`}}})
												else {
													var token = jwt.sign({
														id: data[0].id,
														email: data[0].email,
														first_name: data[0].first_name,
														last_name: data[0].last_name
													}, jwt_key);
													callback(false, token);												
												}
											});
										}
									});
								}
							});
					});						
			});
		}
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
		jwt.verify(req.signedCookies.token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else
				connection.query("DELETE FROM users WHERE email = ? LIMIT 1", data.email, function(err) {
					if (err)
						callback({errors: {database: {message: `Database error: ${err.code}.`}}});
					else
						callback(false);
				});
		});
	},
	// show: function(req, callback) {
	// 	var data = {};
	// 	var username = req.params.username;

	// 	// Get posts:
	// 	var query = "SELECT * FROM posts LEFT JOIN users ON user_id = users.id WHERE username = ?";
	// 	connection.query(query, username, function(err, posts) {
	// 		if (err) {
	// 			callback(err);
	// 			return;
	// 		}
	// 		data.posts = posts;
	// 	});

	// 	// Get favorites:
	// 	var query = "SELECT * FROM favorites LEFT JOIN users ON user_id = users.id \
	// 	LEFT JOIN posts ON post_id = posts.id WHERE username = ?";
	// 	connection.query(query, username, function(err, favorites) {
	// 		if (err) {
	// 			callback(err);
	// 			return;
	// 		}
	// 		data.favorites = favorites;
	// 	});

	// 	callback(false, data)
	// },
	login: function(req, callback) {
		// Validate login data:
		if (!req.body.email | !req.body.password)
			callback({errors: {login: {message: "All form fields are required."}}});
		else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&](?=.{7,})/.test(req.body.password))
			callback({errors: {password: {message: "Invalid password."}}});		
		else {
			// Get user by email:
			var query = "SELECT *, HEX(id) as id FROM users WHERE email = ? LIMIT 1";
			connection.query(query, req.body.email, function(err, data) {
				if (err)
					callback({errors: {database: {message: `Database error: ${err.code}.`}}});
				else if (data.length == 0)
					callback({errors: {email: {message: "Email does not exist."}}});
				else
					// Check valid password:
					bcrypt.compare(req.body.password, data[0].password, function(err, isMatch) {
						if (err)
							callback({errors: {bcrypt: {message: "Invalid email/password, try facebook login."}}});
						else if (!isMatch)
							callback({errors: {password: {message: "Email/password does not match."}}});
						else {
							var token = jwt.sign({
								id: data[0].id,
								email: data[0].email,
								first_name: data[0].first_name,
								last_name: data[0].last_name
							}, jwt_key);
							jwt.verify(token, jwt_key, function(err, decoded) {
								console.log(err)
								console.log("decoded: ",decoded)
							})
							callback(false, token);								
						}
					});					
			});
		}
	},
	fb_login: function(req, callback) {
		// Validate facebook login data:
		if (!req.body.first_name | !req.body.last_name | !req.body.email)
			callback({errors: {facebook : {message: "Invalid facebook information, please logout and try again."}}});
		else {
			// Get user by email:
			var query = "SELECT *, HEX(id) as id FROM users WHERE email = ? LIMIT 1";
			connection.query(query, req.body.email, function(err, data) {
				if (err)
					callback({errors: {database: {message: `Database error: ${err.code}.`}}});
				else if (data.length == 0) {
					// Add user to database:
					var data = {
						first_name: req.body.first_name,
						last_name: req.body.last_name,
						email: req.body.email
					};
					connection.query("INSERT INTO users SET ?", data, function(err) {
						if (err) 
							callback({errors: {database: {message: `Database error: ${err.code}.`}}});
						else {
							// Retrieve new user:
							var query = "SELECT *, HEX(id) as id FROM users WHERE email = ? LIMIT 1";
							connection.query(query, req.body.email, function(err, data) {
								if (err)
									callback({errors: {database: {message: `Database error: ${err.code}.`}}})
								else {
									var token = jwt.sign({
										id: data[0].id,
										email: data[0].email,
										first_name: data[0].first_name,
										last_name: data[0].last_name
									}, jwt_key);
									callback(false, token);												
								}
							});
						}
					});
				}
				else {
					var token = jwt.sign({
						id: data[0].id,
						email: data[0].email,
						first_name: data[0].first_name,
						last_name: data[0].last_name
					}, jwt_key);
					callback(false, token);								
				}
			});
		}
	}
};