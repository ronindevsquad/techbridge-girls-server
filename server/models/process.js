var connection = require('../config/mysql');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var jwt_key = fs.readFileSync('keys/jwt', 'utf8');

module.exports = {
	set: function(req, callback) {
		jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
			if (err)
				callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
			else {
				var data = [];
				for (var key in req.body)
					if (req.body.hasOwnProperty(key) && req.body[key])
						data.push([key, `UNHEX('${payload.id}')`, "NOW()", "NOW()"]);

				var query = "INSERT INTO user_processes (process, user_id, created_at, updated_at) VALUES ?";
				connection.query(query, [data], function(err) {
					if (err)
						callback({status: 400, message: "Please contact an admin."});
					else
						callback(false);
				});
			}
		});
	}
};