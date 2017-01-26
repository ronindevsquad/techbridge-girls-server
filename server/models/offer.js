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

				// Validation done, insert into offers:
				else
					using(getConnection(), connection => {
						var data = [req.body.sga, req.body.profit, req.body.overhead, req.body.total,
						req.body.proposal_id, payload.id];
						var query = "INSERT INTO offers set status = 0, sga = ?, profit = ?, overhead = ?, \
						total = ?, created_at = NOW(), updated_at = NOW(), proposal_id = UNHEX(?), \
						user_id = UNHEX(?)"
						return connection.execute(query, data);
					})
					.then(() => {
						// Insert materials:
						return Promise.join(using(getConnection(), connection => {
							var data = [];
							for (var i = 0; i < req.body.materials.length; i++) {
								var material = req.body.materials[i];
								data.push(["UNHEX(REPLACE(UUID(), '-', ''))", material.material, material.weight,
									material.cost, "NOW()", "NOW()", req.body.proposal_id, payload.id]);
							}
							var query = "INSERT INTO materials (id, material, weight, cost, created_at, \
							updated_at, proposal_id, user_id) VALUES ?";
							return connection.query(query, data);
						// Insert machines:
						}), using(getConnection(), connection => {
							var data = [];
							for (var i = 0; i < req.body.machines.length; i++) {
								var machine = req.body.machines[i];
								data.push(["UNHEX(REPLACE(UUID(), '-', ''))", 0, machine.labor, machine.time,
									machine.yield, machine.rate, machine.count, "NOW()", "NOW()",
									req.body.proposal_id, payload.id]);
							}
							var query = "INSERT INTO labors (id, type, labor, time, yield, rate, \
							count, created_at, updated_at, proposal_id, user_id) VALUES ?"
							return connection.query(query, data);
						// Insert manuals:
						}), using(getConnection(), connection => {
							var data = [];
							for (var i = 0; i < req.body.manuals.length; i++) {
								var manual = req.body.manuals[i];
								data.push(["UNHEX(REPLACE(UUID(), '-', ''))", 0, manual.labor, manual.time,
									manual.yield, manual.rate, manual.count, "NOW()", "NOW()",
									req.body.proposal_id, payload.id]);
							}
							var query = "INSERT INTO labors (id, type, labor, time, yield, rate, \
							count, created_at, updated_at, proposal_id, user_id) VALUES ?"
							return connection.query(query, data);
						}), () => {
							callback(false);
						});
					})
					.catch(err => {
						callback({status: 400, message: "Please contact an admin."});
					});
			});
		}
	}
};
