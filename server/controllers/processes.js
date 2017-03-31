const getConnection = require("../config/mysql");
const Promise = require("bluebird");

const using = Promise.using;

module.exports = {
	set: function (req, res) {
		if (req.user.type != 1)
			return res.status(400).json({ message: "Only Suppliers may set processes." });

		using(getConnection(), connection => {
			const data = [];
			for (let key in req.body) {
				if (req.body.hasOwnProperty(key) && req.body[key])
					data.push([key, `UNHEX('${req.user.id}')`, "NOW()", "NOW()"]);
			}

			const query = "INSERT INTO user_processes (process, user_id, created_at, updated_at) VALUES ?";
			return connection.query(query, [data]);
		})
			.then(() => {
				return res.end();
			})
			.catch(err => {
				return res.status(400).json({ message: "Please contact an admin." });
			});
	}
}