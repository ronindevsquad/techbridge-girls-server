var connection = require('../config/mysql');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var jwt_key = fs.readFileSync('keys/jwt', 'utf8');

module.exports = {
	index: function(req, callback) {
		jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
			if (err)
				callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
			else {
				// var query = "SELECT HEX(offers.proposal_id) AS 'proposal_id', reports.* FROM proposals LEFT JOIN offers on proposals.id = offers.proposal_id LEFT JOIN reports ON offers.id = reports.offer_id where HEX(proposals.user_id) = ? ORDER BY reports.created_at ASC"
				var query = "SELECT * FROM reports WHERE offer_id IN " +
					"(SELECT id FROM offers WHERE proposal_id IN " +
					"(SELECT id FROM proposals))" //WHERE id = 'proposal.id'
				connection.query(query, payload.id, function(err, data) {
					if (err)
						callback({status: 400, message: "Please contact an admin."});
					else {
						callback(false, data);
					}
				});
			}
		});
	},

	create: function(req, callback) {
		jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
			if (err)
				callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
			else {
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
				connection.query("INSERT INTO reports SET ?", data, function(err, data){
					if (err)
						callback({status: 400, message: "Please contact an admin."});
					else {
						callback(false);
					}
				});
			}
		});
	},
};
