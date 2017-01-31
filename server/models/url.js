var Promise = require("bluebird");
var using = Promise.using;
var getConnection = require("../config/mysql");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

module.exports = function(jwt_key) {
	return {
		create: function(req, callback) {
			jwt.verify(req.cookies.evergreen_token, jwt_key, function(err, payload) {
				if (err)
					callback({status: 401, message: "Invalid token. Your session is ending, please login again."});
				else if (req.body.homepage === undefined || req.body.facebook === undefined ||
				req.body.instagram === undefined || req.body.linkedin === undefined || req.body.twitter === undefined)
					callback({status: 400, message: "Some URLS are missing from the request."})
				else
					using(getConnection(), connection => {
						// The first query determines whether or not the user has a URL record associated with their account yet.
						var query = "SELECT * FROM urls WHERE user_id = UNHEX(?) LIMIT 1";
						return connection.execute(query, [payload.id]);
					})
					.spread(data => {
						return using(getConnection(), connection => {
							var _data = [req.body.homepage, req.body.facebook, req.body.instagram,
							req.body.linkedin, req.body.twitter, payload.id];
							if (data.length == 0) {
								query = "INSERT INTO urls SET homepage = ?, facebook = ?, instagram = ?, " +
								"linkedin = ?, twitter = ?, created_at = NOW(), updated_at = NOW(), user_id = UNHEX(?)"
								return connection.execute(query, _data);
							}
							else {
								query = "UPDATE urls SET homepage = ?, facebook = ?, instagram = ?, " +
								"linkedin = ?, twitter = ?, updated_at = NOW() WHERE user_id = UNHEX(?)"
								return connection.execute(query, _data);
							}
						});
					})
					.spread(data => {
						if (data.affectedRows == 0)
							callback({status: 400, message: "Unable to save URLs."});
						else
							callback(false);
					})
					.catch(err => {
						callback({status: 400, message: "Please contact an admin."});
					});
			});
		}
	}
};
