var connection = require('../config/mysql');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var jwt_key = fs.readFileSync('keys/jwt', 'utf8');

module.exports = {
	index: function(req, callback) {
		jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				// var query = "SELECT * FROM proposals LEFT JOIN reports ON proposals.id = \
				// proposal_id ORDER BY "


				var query = "SELECT *, HEX(id) AS id FROM proposals"
				connection.query(query, data.id, function(err, data) {
					console.log("HERERE")
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else {
						var _data = []
						for (var i = 0; i < data.length; i++)
							_data.push(data[i].process);

						var query = "SELECT *, GROUP_CONCAT(process_process SEPARATOR ', ') AS processes, HEX(proposals.id) \
						AS id, proposals.created_at AS created_at FROM proposals LEFT JOIN processes_has_proposals \
						ON proposals.id = proposal_id WHERE proposals.status = 0 AND (audience = 0 OR process_process IN \
						(?)) GROUP BY proposals.id ORDER BY proposals.created_at DESC";
						connection.query(query, [_data], function(err, data) {
							console.log(err)
							if (err)
								callback({errors: {database: {message: "Please contact an admin."}}});
							else
								callback(false, data)
						});
					}
				});
			}
		});
	},
	show: function(req, callback) {
		jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				var query = "SELECT *, HEX(id) AS id FROM proposals WHERE HEX(id) = ? AND status = 0 LIMIT 1";
				connection.query(query, req.params.id, function(err, data) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}})
					else if (data.length == 0)
						callback({errors: {data: {message: `Not able to fetch valid proposal.`}}});
					else
						callback(false, data[0]);
				});
			}
		});
	},
	create: function(req, callback) {
		jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else if (!req.body.processes || !req.body.sga || !req.body.quantity || !req.body.completion ||
			!req.body.zip || req.body.audience === null)
				callback({errors: {form: {message: "All form fields are required."}}});
			else if (req.body.quantity < 1)
				callback({errors: {quantity: {message: "You must specify a quantity of at least 1."}}});
			else if (req.body.audience != 0 && req.body.audience != 1)
				callback({errors: {quantity: {message: "Invalid target suppliers provided."}}});
			else {
				connection.query("SET @temp = UNHEX(REPLACE(UUID(), '-', ''))", function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else {
						var _data = {
							status: 0,
							sga: req.body.sga,
							quantity: req.body.quantity,
							completion: req.body.completion,
							zip: req.body.zip,
							audience: req.body.audience,
							info: req.body.info,
							created_at: "NOW()",
							updated_at: "NOW()",
							user_id: `UNHEX('${data.id}')`
						}
						connection.query("INSERT INTO proposals SET ?, id = @temp", _data, function(err) {
							if (err)
								callback({errors: {database: {message: "Please contact an admin."}}})
							else {
								connection.query("SELECT HEX(@temp) AS id", function(err, proposal) {
									if (err)
										callback({errors: {database: {message: "Please contact an admin."}}});
									else {
										var data = [];
										for (var i = 0; i < req.body.processes.length; i++)
												data.push([req.body.processes[i], `UNHEX('${proposal[0].id}')`, "NOW()", "NOW()"]);

										var query = "INSERT INTO processes_has_proposals (process_process, proposal_id, created_at, updated_at) VALUES ?";
										connection.query(query, [data], function(err) {
											if (err)
												callback({errors: {database: {message: "Please contact an admin."}}});
											else
												callback(false);
										});
									}
								});
							}
						})
					}
				});
			}
		});
	},
	// update: function(req, callback) {
	// 	jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, data) {
	// 		if (err)
	// 			callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
	// 		else {
	// 			var _data = {
	// 				amount: req.body.amount,
	// 				completion_date: req.body.completion_date,
	// 				description: req.body.description,
	// 				pickup_only: req.body.pickup_only,
	// 				address: req.body.address,
	// 				city: req.body.city,
	// 				zip: req.body.zip
	// 			}
	// 			var query = "UPDATE proposals SET ?, updated_at = NOW() WHERE HEX(id) = ? AND HEX(contractor_id) = ? LIMIT 1";
	// 			connection.query(query, [_data, req.params.id, data.id], function(err, data) {
	// 				if (err)
	// callback({errors: {database: {message: "Please contact an admin."}}})
	// 				else
	// 					callback(false);
	// 			});
	// 		}
	// 	});
	// },
	// delete: function(req, callback) {
	// 	jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, data) {
	// 		if (err)
	// 			callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
	// 		else
	// 			var query = "DELETE FROM proposals WHERE HEX(id) = ? AND HEX(contractor_id) = ? LIMIT 1";
	// 			connection.query(query, [req.params.id, data.id], function(err) {
	// 				if (err)
	// callback({errors: {database: {message: "Please contact an admin."}}})
	// 				else
	// 					callback(false);
	// 			});
	// 	});
	// }
};
