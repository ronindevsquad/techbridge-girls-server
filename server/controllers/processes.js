const getConnection = require("../config/mysql");
const jwt = require('jsonwebtoken');
const jwtKey = require("../../keys").jwtKey;
const Promise = require("bluebird");

const using = Promise.using;

module.exports = {
	set: function (req, res) {
		jwt.verify(req.cookies.anvyl_token, jwtKey, function (err, payload) {
			if (err)
				res.status(401).json({ message: "Invalid token. Your session is ending, please login again." });
			else if (payload.type != 1)
				res.status(400).json({ message: "Only Suppliers may set processes." });
			else
				using(getConnection(), connection => {
					const data = [];
					for (let key in req.body)
						if (req.body.hasOwnProperty(key) && req.body[key])
							data.push([key, `UNHEX('${payload.id}')`, "NOW()", "NOW()"]);

					const query = "INSERT INTO user_processes (process, user_id, created_at, updated_at) VALUES ?";
					return connection.query(query, [data]);
				})
					.then(() => {
						res.end();
					})
					.catch(err => {
						res.status(400).json({ message: "Please contact an admin." });
					});
		});
	}
}