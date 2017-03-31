const getConnection = require("../config/mysql");
const Promise = require("bluebird");
const uuid = require("uuid/v1");

const using = Promise.using;

module.exports = {
	show: function (req, res) {
		Promise.join(using(getConnection(), connection => {
			const query = "SELECT message, status, messages.created_at AS created_at, contact, " +
				"company, users.type, picture, HEX(user_id) AS user_id, HEX(messages.id) AS id FROM messages " +
				"LEFT JOIN users ON messages.user_id = users.id WHERE proposal_id = " +
				"(SELECT proposal_id FROM offers LEFT JOIN proposals ON proposal_id = id WHERE " +
				"proposal_id = UNHEX(?) AND (proposals.user_id = UNHEX(?) OR offers.user_id = UNHEX(?)) " +
				"AND offers.status > 1 AND proposals.status > 1 LIMIT 1) ORDER BY created_at";
			return connection.execute(query, [req.params.proposal_id, req.user.id, req.user.id]);
		}), using(getConnection(), connection => {
			const query = "UPDATE messages SET status = 1 WHERE proposal_id = UNHEX(?) AND " +
				"user_id != UNHEX(?)";
			return connection.execute(query, [req.params.proposal_id, req.user.id]);
		}), (messages, read) => {
			if (messages.length < 1)
				throw { status: 400, message: "No conversation found." };
			console.log(read[0]);
			return res.json(messages[0]);
		})
			.catch(err => {
				return res.status(400).json({ message: "Please contact an admin." });
			});
	},
	create: function (req, res) {
		if (!req.body.message)
			return res.status(400).json({ message: "A message cannot be empty." });
		
		if (!req.body.proposal_id)
			return res.status(400).json({ message: "No proposal provided." });

		using(getConnection(), connection => {
			const query = "INSERT INTO messages SET id = UNHEX(?), message = ?, " +
				"status = 0, created_at = NOW(), updated_at = NOW(), proposal_id = UNHEX(?), " +
				"user_id = UNHEX(?)";
			return connection.execute(query, [uuid().replace(/\-/g, ""), req.body.message, req.body.proposal_id, req.user.id]);
		})
			.spread(data => {
				return res.json(data);
			})
			.catch(err => {
				return res.status(400).json({ message: "Please contact an admin." });
			});
	}
}
