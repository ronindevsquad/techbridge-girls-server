var connection = require('../config/mysql');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var jwt_key = fs.readFileSync('keys/jwt', 'utf8');

module.exports = {
	set: function(req, callback) {
		jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, data) {
			if (err)
				callback({errors: {jwt: {message: "Invalid token. Your session is ending, please login again."}}});
			else {
				var _data = [];
				for (var key in req.body)
					if (req.body.hasOwnProperty(key) && req.body[key])
						_data.push([key, `UNHEX('${data.id}')`, "NOW()", "NOW()"]);

				var query = "INSERT INTO processes_has_users (process_process, user_id, created_at, updated_at) VALUES ?";
				connection.query(query, [_data], function(err) {
					if (err)
						callback({errors: {database: {message: "Please contact an admin."}}});
					else
						callback(false);
				});
			}
		});
	}
};