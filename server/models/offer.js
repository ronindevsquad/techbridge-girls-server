var Promise = require("bluebird");
var using = Promise.using;
var getConnection = require("../config/mysql");
var jwt = require('jsonwebtoken');

module.exports = function(jwt_key) {
	return {
		getAcceptedOffers: function(req, callback) {
			jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
				if (err)
					callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
				else
					using(getConnection(), connection => {
						var query = "SELECT *, HEX(proposal_id) AS proposal_id FROM offers LEFT JOIN proposals ON \
						offers.proposal_id = proposals.id WHERE (HEX(offers.user_id) = ? OR HEX(proposals.user_id) = ?) \
						AND offers.status > 0";
						return connection.execute(query, [payload.id, payload.id]);
					})
					.spread(data => {
						callback(false, data);
					})
					.catch(err => {
						callback({status: 400, message: "Please contact an admin."});
					});
			});
		},
		index: function(req, callback) {
			jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, data) {
				using(getConnection(), connection => {
					var query = "SELECT o.*, u.company FROM offers o JOIN users u ON o.user_id = u.id WHERE HEX(proposal_id) = ?";
					return connection.execute(query, [req.params.proposal_id]);
				})
				.spread(data => {
					callback(false, data);
				})
				.catch(err => {
					callback({status: 400, message: "Please contact an admin."})
				});
			});
		},
		// show: function(req, callback) {
		// 	jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, data) {
		// 		if (err)
		// 			callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
		// 		else {
		// 			var query = "SELECT *, HEX(id) AS id FROM proposals WHERE HEX(id) = ? AND status = 0 LIMIT 1";
		// 			connection.query(query, req.params.id, function(err, data) {
		// 				if (err)
		// 					callback({status: 400, message: "Please contact an admin."});
		// 				else if (data.length == 0)
		// 					callback({status: 400, message: `Not able to fetch valid proposal.`});
		// 				else
		// 					callback(false, data[0]);
		// 			});
		// 		}
		// 	});
		// },
		create: function(req, callback) {
			jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
				if (err)
					return callback({status: 401, message: "Invalid token. Your session is ending, please login again."});

				// Validate materials:
				for (var i = 0; i < req.body.materials.length; i++) {
					var material = req.body.materials[i];
					if (!material.material || material.weight === undefined || material.cost === undefined ||
						material.weight < 0 || material.cost < 0)
						return callback({status: 400, message: "Invalid field(s) for materials provided."});
				}

				// Validate machines:
				for (var i = 0; i < req.body.machines.length; i++) {
					var machine = req.body.machines[i];
					if (!machine.labor || machine.time === undefined || machine.rate === undefined ||
						machine.yield === undefined || machine.count === undefined || machine.time < 1 ||
						machine.rate < 0.01 || machine.yield < 0.01 || machine.count < 1)
						return callback({status: 400, message: "Invalid field(s) for machines provided."});
				}

				// Validate manuals:
				for (var i = 0; i < req.body.manuals.length; i++) {
					var manual = req.body.manuals[i];
					if (!manual.labor || manual.time === undefined || manual.rate === undefined ||
						manual.yield === undefined || manual.count === undefined || manual.time < 1 ||
						manual.rate < 0.01 || manual.yield < 0.01 || manual.count < 1)
						return callback({status: 400, message: "Invalid field(s) for machines provided."});
				}

				if (!req.body.proposal_id || req.body.sga === undefined || req.body.profit === undefined ||
				req.body.overhead === undefined || req.body.total === undefined || req.body.sga < 0 ||
				req.body.profit < 0 || req.body.overhead < 0 || req.body.total < 0)
					return callback({status: 400, message: "All form fields are required."});
				else {
					console.log("validation done.")
					// new Promise(function(resolve, reject) {
					// 	var data = {
					// 		status: 0,
					// 		sga: req.body.sga,
					// 		profit: req.body.profit,
					// 		overhead: req.body.overhead,
					// 		total: req.body.total,
					// 		created_at: "NOW()",
					// 		updated_at: "NOW()",
					// 		proposal_id: `UNHEX('${req.body.proposal_id}')`,
					// 		user_id: `UNHEX('${payload.id}')`
					// 	}
					// 	connection.query("INSERT INTO offers SET ?", data, function(err) {
					// 		if (err)
					// 			return reject(err);
					// 		return resolve();
					// 	});
					// }).then()
				}
				// 	connection.query("INSERT INTO offers SET ?", data, function(err) {
				// 		if (err)
				// 			callback({status: 400, message: "Please contact an admin."});
				// 		else {
				// 			var data = {
				// 				id: "UNHEX(REPLACE(UUID(), '-', ''))",
				// 				material: req.body.material,
				// 				material_cost: req.body.material_cost,
				// 				unit_cost: req.body.unit_cost,
				// 				created_at: "NOW()",
				// 				updated_at: "NOW()",
				// 				proposal_id: `UNHEX('${req.body.proposal_id}')`,
				// 				user_id: `UNHEX('${payload.id}')`
				// 			}
				// 			connection.query("INSERT INTO materials SET ?", data, function(err) {
				// 				if (err)
				// 					callback({status: 400, message: "Please contact an admin."});
				// 				else {
				// 					var data = {
				// 						id: "UNHEX(REPLACE(UUID(), '-', ''))",
				// 						machine: req.body.machine,
				// 						cycle_time: req.body.cycle_time,
				// 						yield: req.body.yield,
				// 						rate: req.body.rate,
				// 						laborers: req.body.laborers,
				// 						created_at: "NOW()",
				// 						updated_at: "NOW()",
				// 						proposal_id: `UNHEX('${req.body.proposal_id}')`,
				// 						user_id: `UNHEX('${payload.id}')`
				// 					}
				// 					connection.query("INSERT INTO machines SET ?", data, function(err) {
				// 						if (err)
				// 							callback({status: 400, message: "Please contact an admin."});
				// 						else {
				// 							callback(false);
				// 						}
				// 					});
				// 				}
				// 			});
				// 		}
				// 	})
				// }
			});
		}
	}
};
