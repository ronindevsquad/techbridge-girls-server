var Promise = require("bluebird");
var fs = require('fs');
var using = Promise.using;
var getConnection = require("../config/mysql");
var jwt = require('jsonwebtoken');

module.exports = function(jwt_key) {
	return {
		// index: function(req, callback) {
		// 	jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
		// 		if (err)
		// 			callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
		// 		else
		// 			using(getConnection(), connection => {
		// 				var query;
		// 				if (payload.type == 0)
		// 					query = "";
		// 				else if (payload.type == 1)
		// 					query = ""
		// 				return connection.query(query, [_data]);
		// 			})
		// 			.spread(data => {
		// 				callback(false, data);
		// 			})
		// 			.catch(err => {
		// 				callback({status: 400, message: "Please contact an admin."});
		// 			});
		// 	});
		// },
		show: function(req, callback) {
			jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
				if (err)
					callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
				else
					using(getConnection(), connection => {
						var query = "SELECT *, HEX(user_id) AS user_id FROM messages WHERE proposal_id = " +
						"(SELECT proposal_id FROM offers LEFT JOIN proposals ON proposal_id = id WHERE " +
						"proposal_id = UNHEX(?) AND (proposals.user_id = UNHEX(?) OR offers.user_id = UNHEX(?)) " +
						"AND offers.status > 1 AND proposals.status > 1 LIMIT 1) ORDER BY created_at";
						return connection.execute(query, [req.params.id, payload.id]);
					})
					.spread(data => {
						if (data.length < 1)
							throw {status: 400, message: "No conversation found."};
						callback(false, data);
					})
					.catch(err => {
						callback({status: 400, message: "Please contact an admin."});
					});
			});
		},
		create: function(req, callback) {
			jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
				if (err)
					callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
				else if (!req.body.message)
					callback({status: 400, message: "A message cannot be empty."});
				else if (!req.body.proposal_id)
					callback({status: 400, message: "No proposal provided."});
				else
					using(getConnection(), connection => {
						var query = "INSERT INTO messages SET id = UNHEX(REPLACE(UUID(), '-', '')), message = ?, " +
						"status = 0, created_at = NOW(), updated_at = NOW(), proposal_id = UNHEX(?), " +
						"user_id = UNHEX(?)";
						return connection.execute(query, [req.body.message, req.body.proposal_id, payload.id]);
					})
					.spread(data => {
						callback(false, data);
					})
					.catch(err => {
						callback({status: 400, message: "Please contact an admin."});
					});
			});
		}
	}
};
