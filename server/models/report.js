var Promise = require("bluebird");
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
						var query = "SELECT * FROM reports WHERE offer_id IN " +
						"(SELECT id FROM offers WHERE proposal_id IN " +
						"(SELECT id FROM proposals))" //WHERE id = 'proposal.id'
						return connection.execute(query);
					})
					.spread(data => {
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
				else
					using(getConnection(), connection => {
						data = {
							id: 				"UNHEX(REPLACE(UUID(), '-', ''))",
							status: 		1,
							input: 			req.body.input,
							output: 		req.body.output,
							shipping: 	req.body.shipped,
							note: 			req.body.note,
							created_at: "NOW()",
							updated_at: "NOW()",
							user_id: 		`UNHEX('${payload.id}')`,
							offer_id: 	req.body.offer_id
						};
						return connection.query("INSERT INTO reports SET ?", data);
					})
					.then(() => {
						callback(false);
					})
					.catch(err => {
						callback({status: 400, message: "Please contact an admin."});
					});
			});
		}
	}
};