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
				var query = "SELECT HEX(offers.proposal_id) AS 'proposal_id', reports.* FROM proposals LEFT JOIN offers on proposals.id = offers.proposal_id LEFT JOIN reports ON offers.id = reports.offer_id where HEX(proposals.user_id) = ? ORDER BY reports.created_at ASC"
				connection.query(query, payload.id, function(err, data) {
					console.log(err)
					if (err)
						callback({status: 400, message: "Please contact an admin."});
					else {
						callback(false, data);
					}
				});
			}
		});
	}
};
