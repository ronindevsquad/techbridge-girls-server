const getConnection = require("../config/mysql");
const jwt = require("jsonwebtoken");
const jwtKey = require("../../keys").jwtKey;
const mailgun = require('mailgun-js')({
	apiKey: require('../../keys').mailgunKey,
	// Replace with evergreenmake.com, have to verify first?
	domain: 'sandboxc2f9638ced9f445683d40e1b91c7a19a.mailgun.org'
});
const Promise = require("bluebird");
const uuid = require("uuid/v1");

const bcrypt = Promise.promisifyAll(require("bcrypt"));
const using = Promise.using;

module.exports = {
	show: function (req, res) {
		jwt.verify(req.headers.authorization.split('Bearer ')[1], jwtKey, function (err, payload) {
			if (err)
				res.status(401).json({ message: "Invalid token. Your session is ending, please login again." });
			else {
				using(getConnection(), connection => {
					const query = "SELECT company, contact, email, picture, homepage, facebook, instagram, " +
						"linkedin, twitter FROM users LEFT JOIN urls ON users.id = user_id WHERE id = UNHEX(?) LIMIT 1";
					return connection.execute(query, [req.params.id]);
				})
					.spread(data => {
						if (data.length != 1)
							res.status(400).json({ message: "Could not find user." });
						else
							res.json(data[0]);
					})
					.catch(error => {
						res.status(400).json({ message: "Please contact an admin." });
					})
			}
		})
	},
	notifications: function (req, res) {
		jwt.verify(req.headers.authorization.split('Bearer ')[1], jwtKey, function (err, payload) {
			if (err)
				res.status(401).json({ message: "Invalid token. Your session is ending, please login again." });
			else {
				Promise.join(using(getConnection(), connection => {
					let query;
					if (payload.type == 0) // maker query
						// query = "select u.id , COUNT(p.id) as proposals from users u " +
						// "LEFT OUTER JOIN proposals p on u.id = p.user_id " +
						// "WHERE u.id = UNHEX(?) GROUP BY u.id";
						query = "SELECT u.id , p.proposals AS proposals, j.jobs AS jobs FROM users u " +
							"LEFT OUTER JOIN (SELECT user_id, COUNT(id) AS proposals FROM proposals WHERE status = 0 GROUP BY user_id) p " +
							"ON u.id = p.user_id " +
							"LEFT OUTER JOIN (SELECT user_id, COUNT(id) AS jobs FROM proposals WHERE status = 2 GROUP BY user_id) j " +
							"ON j.user_id = u.id " +
							"WHERE u.id = UNHEX(?) GROUP BY u.id";
					else //supplier query
						// query = "select u.id , COUNT(o.user_id) as proposals from users u " +
						// "LEFT OUTER JOIN offers o on o.user_id = u.id " +
						// "WHERE u.id = UNHEX(?) GROUP BY u.id"
						query = "SELECT u.id , o.proposals AS proposals, j.jobs AS jobs FROM users u " +
							"LEFT OUTER JOIN (SELECT user_id, COUNT(proposal_id) AS proposals FROM offers WHERE status > 0 GROUP BY user_id) o " +
							"ON o.user_id = u.id " +
							"LEFT OUTER JOIN (SELECT user_id, COUNT(proposal_id) AS jobs FROM offers WHERE status = 2 GROUP BY user_id) j " +
							"ON j.user_id = u.id " +
							"WHERE u.id = UNHEX(?) GROUP BY u.id"
					return connection.execute(query, [req.params.id]);
				}), using(getConnection(), connection => {
					let query;
					if (payload.type == 0) //maker query
						query = "SELECT COUNT(*) as unread FROM messages WHERE proposal_id in " +
							"(SELECT id FROM proposals WHERE user_id = UNHEX(?)) " +
							"AND status = 0 AND user_id != UNHEX(?)";
					else // supplier query
						query = "SELECT COUNT(*) AS unread FROM messages WHERE proposal_id in " +
							"(SELECT proposal_id FROM offers WHERE user_id = UNHEX(?)) " +
							"AND status = 0 AND user_id != UNHEX(?)";
					return connection.execute(query, [req.params.id, req.params.id]);
				}), (proposals, messages) => {
					let data = {};
					if (proposals[0].length == 0) {
						res.status(400).json({ message: "Could not find user." });
					} else {
						data.proposals = proposals[0][0].proposals;
						data.jobs = proposals[0][0].jobs;
						data.messages = messages[0][0].unread;

						res.json(data);
					}
				})
					.catch(err => {
						res.status(400).json({ message: "Please contact an admin." });
					});
			}
		});
	},
	update: function (req, res) {
		jwt.verify(req.headers.authorization.split('Bearer ')[1], jwtKey, function (err, payload) {
			if (err)
				res.status(401).json({ message: "Invalid token. Your session is ending, please login again." });
			else {
				using(getConnection(), connection => {
					let query = "UPDATE users SET ?, updated_at = NOW() WHERE id = UNHEX(?) LIMIT 1";
					return connection.execute(query, [req.body, payload.id]);
				})
					.spread(data => {
						if (data.changedRows == 0)
							throw { status: 400, message: "Failed to save changes." };
						else
							return using(getConnection(), connection => {
								let query = "SELECT *, HEX(id) AS id FROM users WHERE id = UNHEX(?) LIMIT 1";
								return connection.execute(query, [payload.id]);
							});
					})
					.spread(data => {
						let anvyl_token = jwt.sign({
							id: data[0].id,
							type: data[0].type,
							company: data[0].company,
							contact: data[0].contact,
							created_at: data[0].created_at
						}, jwtKey, { expiresIn: "5d" });
						res.json(anvyl_token);
					})
					.catch(err => {
						res.status(400).json({ message: "Please contact an admin." });
					});
			}
		});
	},
	delete: function (req, res) {
		jwt.verify(req.headers.authorization.split('Bearer ')[1], jwtKey, function (err, payload) {
			if (err)
				res.status(401).json({ message: "Invalid token. Your session is ending, please login again." });
			else
				using(getConnection(), connection => {
					return connection.execute("DELETE FROM users WHERE id = UNHEX(?) LIMIT 1", [payload.id]);
				})
					.spread(data => {
						if (data.affectedRows == 0)
							res.status(400).json({ message: "Failed to delete your account." });
						else
							res.end();
					})
					.catch(err => {
						res.status(400).json({ message: "Please contact an admin." });
					});
		});
	},
	changePassword: function (req, res) {
		jwt.verify(req.headers.authorization.split('Bearer ')[1], jwtKey, function (err, payload) {
			// GEROGE/ELLIOT: this needs to be refined. AKA check that user knows their current password.
			if (err)
				res.status(401).json({ message: "Invalid token. Your session is ending, please login again." });
			else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&](?=.{7,})/.test(req.body.new))
				res.status(400).json({ message: "Password must be at least 8 characters long and have a lowercase letter, an uppercase letter, and a number." });
			else {
				bcrypt.genSaltAsync(10)
					.then(salt => {
						return bcrypt.hash(req.body.new, salt)
					})
					.then(hash => {
						return using(getConnection(), connection => {
							const query = "UPDATE users SET password = ?, updated_at = NOW() WHERE id = UNHEX(?) LIMIT 1";
							return connection.execute(query, [hash, payload.id]);
						})
					})
					.spread(data => {
						if (data.changedRows == 0)
							throw { status: 400, message: "Unable to change password." };
						else
							res.end();
					})
					.catch(err => {
						if (err.status)
							res.status(err.status).json(err.message);
						else
							res.status(400).json({ message: "Please contact an admin." });
					});
			}
		});
	},
	register: function (req, res) {
		if (req.body.type === undefined || !req.body.company || !req.body.contact || !req.body.email
			|| !req.body.password || !req.body.confirm_password)
			res.status(400).json({ message: "All form fields are required." });
		// Validate company:
		else if (!req.body.company)
			res.status(400).json({ message: "Company name cannot be blank." });
		// Validate contact:
		else if (!/^[a-z ]{2,32}$/i.test(req.body.contact))
			res.status(400).json({ message: "Invalid contact name." });
		// Validate email:
		else if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.email))
			res.status(400).json({ message: "Invalid email. Email format should be: email@mailserver.com." });
		// Validate password:
		else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&](?=.{7,})/.test(req.body.password))
			res.status(400).json({ message: "Password must be at least 8 characters long and have a lowercase letter, an uppercase letter, and a number." });
		// Validate confirm_password:
		else if (req.body.password != req.body.confirm_password)
			res.status(400).json({ message: "Passwords do not match." });
		// Else valid new user:
		else {
			// Encrypt password and save:
			bcrypt.genSaltAsync(10)
				.then(salt => {
					return bcrypt.hash(req.body.password, salt)
				})
				.then(hash => {
					const mail = {
						from: 'Evergreen HQ hello@evergreenmake.com',
						to: `${req.body.email}`,
						subject: 'Welcome to Evergreen!',
						// text: `Greetings from Evergreen HQ,\n\nThe Evergreen team would like to welcome you to the platform. If you need anything, feel free to contact us at 1-800-416-0426\n\nThank You,\nEvergreen`
						html: '<html><img src="https://s3-us-west-1.amazonaws.com/ronintestbucket/public_assets/Welcome_banner.png" width="70%" height="auto">' +
						'<p>Greetings from Evergreen HQ,</p> ' +
						'<p>Welcome to the Evergreen community. As a supplier you can connect with consumer goods companies in the US that need high quality suppliers like yourself.</p>' +
						'<p>Get started by browsing the open proposals section and viewing some of the available RFPs. Makers around the globe are actively submitting bids to create better products.</p>' +
						'<img src="https://s3-us-west-1.amazonaws.com/ronintestbucket/public_assets/Welcome_demo.png" width="70%" height="auto">' +
						'<p>We are looking for feedback to improve the site. If you have any questions, shoot over an email to <a href="mailto:support@evergreenmake.com">support@evergreenmake.com</a> or call our leadership team directly at 1-800-416-0419.</p></html>'
					};

					return new Promise((resolve, reject) => {
						mailgun.messages().send(mail, function (err, body) {
							if (err) {
								reject({ status: 400, message: "Email does not exist." });
							} else {
								resolve();
							}
						});
					});
				})
				.then(() => {
					return using(getConnection(), connection => {
						const data = [uuid().replace(/\-/g, ""), req.body.type, req.body.company,
						req.body.contact, req.body.email, hash];
						const query = "INSERT INTO users SET id = UNHEX(?), type = ?, company = ?, " +
							"contact = ?, email = ?, password = ?, created_at = NOW(), updated_at = NOW()";
						return connection.execute(query, data);
					})
				})
				.then(() => {
					return using(getConnection(), connection => {
						const query = "SELECT *, HEX(id) AS id FROM users WHERE email = ? LIMIT 1";
						return connection.execute(query, [req.body.email]);
					});
				})
				.spread(data => {
					const anvyl_token = jwt.sign({
						id: data[0].id,
						type: data[0].type,
						company: data[0].company,
						contact: data[0].contact,
						created_at: data[0].created_at
					}, jwtKey, { expiresIn: "5d" });
					res.json(anvyl_token);
				})
				.catch(err => {
					if (err["code"] == "ER_DUP_ENTRY")
						res.status(400).json({ message: "Email already in use, please log in." });
					else if (err.status)
						res.status(err.status).json(err.message);
					else
						res.status(400).json({ message: "Please contact an admin." });
				});
		}
	},
	registerLinkedIn: function (req, res) {
		if (req.body.type === undefined || !req.body.company || !req.body.contact || !req.body.email)
			res.status(400).json({ message: "All form fields are required." });
		// Validate company:
		else if (!req.body.company)
			res.status(400).json({ message: "Company name cannot be blank." });
		// Validate contact:
		else if (!/^[a-z ]{2,32}$/i.test(req.body.contact))
			res.status(400).json({ message: "Invalid contact name." });
		// Validate email:
		else if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(req.body.email))
			res.status(400).json({ message: "Invalid email. Email format should be: email@mailserver.com." });
		// Else valid new user:
		else {
			// Encrypt password and save:
			bcrypt.genSaltAsync(10)
				.then(salt => {
					return bcrypt.hash(uuid().replace(/\-/g, ""), salt);
				})
				.then(hash => {
					const mail = {
						from: 'Evergreen HQ hello@evergreenmake.com',
						to: `${req.body.email}`,
						subject: 'Welcome to Evergreen!',
						// text: `Greetings from Evergreen HQ,\n\nThe Evergreen team would like to welcome you to the platform. If you need anything, feel free to contact us at 1-800-416-0426\n\nThank You,\nEvergreen`
						html: '<html><img src="https://s3-us-west-1.amazonaws.com/ronintestbucket/public_assets/Welcome_banner.png" width="70%" height="auto">' +
						'<p>Greetings from Evergreen HQ,</p> ' +
						'<p>Welcome to the Evergreen community. As a supplier you can connect with consumer goods companies in the US that need high quality suppliers like yourself.</p>' +
						'<p>Get started by browsing the open proposals section and viewing some of the available RFPs. Makers around the globe are actively submitting bids to create better products.</p>' +
						'<img src="https://s3-us-west-1.amazonaws.com/ronintestbucket/public_assets/Welcome_demo.png" width="70%" height="auto">' +
						'<p>We are looking for feedback to improve the site. If you have any questions, shoot over an email to <a href="mailto:support@evergreenmake.com">support@evergreenmake.com</a> or call our leadership team directly at 1-800-416-0419.</p></html>'
					};

					return new Promise((resolve, reject) => {
						mailgun.messages().send(mail, function (err, body) {
							if (err) {
								reject({ status: 400, message: "Email does not exist." });
							} else {
								resolve();
							}
						});
					});
				})
				.then(() => {
					return using(getConnection(), connection => {
						const data = [uuid().replace(/\-/g, ""), req.body.type, req.body.company, req.body.contact,
						req.body.email, hash];
						const query = "INSERT INTO users SET id = UNHEX(?), type = ?, company = ?, contact = ?, " +
							"email = ?, password = ?, created_at = NOW(), updated_at = NOW()";
						return connection.execute(query, data);
					})
				})
				.then(() => {
					return using(getConnection(), connection => {
						const query = "SELECT *, HEX(id) AS id FROM users WHERE email = ? LIMIT 1";
						return connection.execute(query, [req.body.email]);
					});
				})
				.spread(data => {
					const anvyl_token = jwt.sign({
						id: data[0].id,
						type: data[0].type,
						company: data[0].company,
						contact: data[0].contact,
						created_at: data[0].created_at
					}, jwtKey, { expiresIn: "5d" });
					res.json(anvyl_token);
				})
				.catch(err => {
					if (err["code"] == "ER_DUP_ENTRY")
						res.status(400).json({ message: "Email already in use, please log in." });
					else if (err.status)
						res.status(err.status).json(err.message);
					else
						res.status(400).json({ message: "Please contact an admin." });
				});
		}
	},
	login: function (req, res) {
		// Validate login data:
		if (!req.body.email || !req.body.password)
			res.status(400).json({ message: "All form fields are required." });
		else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&](?=.{7,})/.test(req.body.password))
			res.status(400).json({ message: "Invalid password." });
		else {
			using(getConnection(), connection => {
				// Get user by email:
				const query = "SELECT *, HEX(id) AS id FROM users WHERE email = ? LIMIT 1";
				return connection.execute(query, [req.body.email]);
			})
				.spread(data => {
					if (data.length == 0)
						throw { status: 400, message: "Email does not exist, please register." };
					else
						// Check valid password:
						return [bcrypt.compareAsync(req.body.password, data[0].password), data];
				})
				.spread((isMatch, data) => {
					if (!isMatch)
						throw { status: 400, message: "Email/password does not match." };
					else {
						const anvyl_token = jwt.sign({
							id: data[0].id,
							type: data[0].type,
							company: data[0].company,
							contact: data[0].contact,
							created_at: data[0].created_at,
							picture: data[0].picture,
						}, jwtKey, { expiresIn: "5d" });
						res.json(anvyl_token);
					}
				})
				.catch(err => {
					console.log(err)
					if (err.status)
						res.status(err.status).json(err.message);
					else
						res.status(400).json({ message: "Please contact an admin." });
				});
		}
	},
	loginLinkedIn: function (req, res) {
		// Validate login data:
		if (!req.body.email)
			res.status(400).json({ message: "LinkedIn login was unsuccessful" });
		else {
			using(getConnection(), connection => {
				// Get user by email:
				const query = "SELECT *, HEX(id) AS id FROM users WHERE email = ? LIMIT 1";
				return connection.execute(query, [req.body.email]);
			})
				.spread(data => {
					if (data.length == 0)
						throw { status: 400, message: "Email does not exist, please register." };
					// GEORGE: was the password checked here?
					else {
						// Check valid password:
						const anvyl_token = jwt.sign({
							id: data[0].id,
							type: data[0].type,
							company: data[0].company,
							contact: data[0].contact,
							created_at: data[0].created_at
						}, jwtKey, { expiresIn: "5d" });
						res.json(anvyl_token);
					}
				})
				.catch(err => {
					if (err.status)
						res.status(err.status).json(err.message);
					else
						res.status(400).json({ message: "Please contact an admin." });
				});
		}
	},
	sendTicket: function (req, res) {
		jwt.verify(req.headers.authorization.split('Bearer ')[1], jwtKey, function (err, payload) {
			if (err)
				res.status(401).json({ message: "Invalid token. Your session is ending, please login again." });
			else {
				using(getConnection(), connection => {
					const query = "SELECT * FROM users WHERE id = UNHEX(?) LIMIT 1";
					return connection.execute(query, [payload.id]);
				})
					.spread(data => {
						const mail = {
							from: 'Evergreen Admin hello@evergreenmake.com',
							to: 'hello@evergreenmake.com',  // Recipient Here (need to verify in mailgun free account)
							subject: `Ticket issued from user ${data[0].contact} at ${data[0].company}`,
							text: `${req.body.text}\n\nReach out to ${data[0].email} for support.`
						};

						mailgun.messages().send(mail, function (err, body) {
							if (err)
								throw err;
							else
								res.json("A ticket has been sent.");
						});
					})
					.catch(err => {
						if (err.status)
							res.status(err.status).json(err.message);
						else
							res.status(400).json({ message: "Please contact an admin." });
					});
			}
		});
	}
}