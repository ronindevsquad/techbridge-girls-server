var Promise = require("bluebird");
var fs = require('fs');
var using = Promise.using;
var getConnection = require("../config/mysql");
var jwt = require('jsonwebtoken');

module.exports = function(jwt_key) {
	return {
		index: function(req, callback) {
			jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
				if (err)
					callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
				else
					using(getConnection(), connection => {
						var query;
						if (payload.type == 0)
							query = "";
						else if (payload.type == 1)
							query = ""
						return connection.query(query, [_data]);
					})
					.spread(data => {
						callback(false, data);
					})
					.catch(err => {
						callback({status: 400, message: "Please contact an admin."});
					});
			});
		},
		// show: function(req, callback) {
		// 	jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
		// 		if (err)
		// 			callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
		// 		else
		// 			using(getConnection(), connection => {
		// 				var query = "SELECT *, HEX(id) AS id, HEX(user_id) AS user_id FROM proposals WHERE HEX(id) = ? \
		// 				AND status = 0 LIMIT 1";
		// 				return connection.execute(query, [req.params.id]);
		// 			})
		// 			.spread(data => {
		// 				if (data.length != 1 || data[0].user_id != payload.id && payload.type != 1)
		// 					throw {status: 400, message: "Not able to fetch valid proposal."};
		// 				else
		// 					callback(false, data[0]);
		// 			})
		// 			.catch(err => {
		// 				if (err.status)
		// 					callback(err);
		// 				else
		// 					callback({status: 400, message: "Please contact an admin."});
		// 			});
		// 	});
		// },
		// create: function(req, callback) {
		// 	console.log(req.body);
		// 	jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
		// 		if (err)
		// 			callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
		// 		else if (payload.type != 0)
		// 			callback({status: 400, message: "Only Makers may create proposals."});
		// 		else if (!req.body.processes || !req.body.product || !req.body.quantity || !req.body.completion ||
		// 		!req.body.zip || req.body.audience === null)
		// 			callback({status: 400, message: "All form fields are required."});
		// 		else if (req.body.quantity < 1)
		// 			callback({status: 400, message: "You must specify a quantity of at least 1."});
		// 		else if (req.body.audience != 0 && req.body.audience != 1)
		// 			callback({status: 400, message: "Invalid target suppliers provided."});
		// 		else
		// 			using(getConnection(), connection => {
		// 				return connection.execute("SET @temp = UNHEX(REPLACE(UUID(), '-', ''))");
		// 			})
		// 			.then(() => {
		// 				return using(getConnection(), connection => {
		// 					var data = [0, req.body.product, req.body.quantity, req.body.completion, req.body.zip,
		// 					req.body.audience, req.body.info, payload.id];
		// 					var query = "INSERT INTO proposals SET id = @temp, status = ?, product = ?, quantity = ?, \
		// 					completion = ?, zip = ?, audience = ?, info = ?, created_at = NOW(), updated_at = NOW(), \
		// 					user_id = UNHEX(?)";
		// 					return connection.execute(query, data);
		// 				});
		// 			})
		// 			.then(() => {
		// 				return Promise.join(using(getConnection(), connection => {
		// 					var data = [];
		// 					for (var i = 0; i < req.body.processes.length; i++)
		// 						data.push([req.body.processes[i], "@temp", "NOW()", "NOW()"]);
		// 					var query = "INSERT INTO proposal_processes (process, proposal_id, created_at, updated_at) VALUES ?";
		// 					return connection.query(query, [data]);
		// 				}), using(getConnection(), connection => {
		// 					var data = [];
		// 					for (var i = 0; i < req.body.filesarray.uploadedfiles.length; i++) {
		// 						var file = req.body.filesarray.uploadedfiles[i];
		// 						console.log(file);
		// 						data.push([file.filename, file.type, "NOW()", "NOW()", "@temp"]);
		// 					}
		// 					var query = "INSERT INTO files (filename, type, created_at, updated_at, proposal_id) VALUES ?";
		// 					return connection.query(query, [data]);
		// 				}), () => {
		// 					callback(false);
		// 				});
		// 			})
		// 			.catch(err => {
		// 				console.log(err);
		// 				callback({status: 400, message: "Please contact an admin."});
		// 			});
		// 	});
		// }
	}
};
