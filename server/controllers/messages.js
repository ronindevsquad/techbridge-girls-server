const getConnection = require("../config/mysql");
const jwt = require('jsonwebtoken');
const jwtKey = require("../../keys").jwtKey;
const Promise = require("bluebird");
const uuid = require("uuid/v1");

const using = Promise.using;

module.exports = {
	show: function (req, res) {
		jwt.verify(req.headers.authorization.split('Bearer ')[1], jwtKey, function (err, payload) {
			if (err)
				res.status(401).json({ message: "Invalid token. Your session is ending, please login again." });
			else {
				Promise.join(using(getConnection(), connection => {
					const query = "SELECT message, status, messages.created_at AS created_at, contact, " +
						"company, users.type, picture, HEX(user_id) AS user_id, HEX(messages.id) AS id FROM messages " +
						"LEFT JOIN users ON messages.user_id = users.id WHERE proposal_id = " +
						"(SELECT proposal_id FROM offers LEFT JOIN proposals ON proposal_id = id WHERE " +
						"proposal_id = UNHEX(?) AND (proposals.user_id = UNHEX(?) OR offers.user_id = UNHEX(?)) " +
						"AND offers.status > 1 AND proposals.status > 1 LIMIT 1) ORDER BY created_at";
					return connection.execute(query, [req.params.proposal_id, payload.id, payload.id]);
				}), using(getConnection(), connection => {
					const query = "UPDATE messages SET status = 1 WHERE proposal_id = UNHEX(?) AND " +
						"user_id != UNHEX(?)";
					return connection.execute(query, [req.params.proposal_id, payload.id]);
				}), (messages, read) => {
					if (messages.length < 1)
						throw { status: 400, message: "No conversation found." };
					console.log(read[0]);
					res.json(messages[0]);
				})
					.catch(err => {
						res.status(400).json({ message: "Please contact an admin." });
					});
			}
		});
	},
	create: function (req, res) {
		jwt.verify(req.headers.authorization.split('Bearer ')[1], jwtKey, function (err, payload) {
			if (err)
				res.status(401).json({ message: "Invalid token. Your session is ending, please login again." });
			else if (!req.body.message)
				res.status(400).json({ message: "A message cannot be empty." });
			else if (!req.body.proposal_id)
				res.status(400).json({ message: "No proposal provided." });
			else
				using(getConnection(), connection => {
					const query = "INSERT INTO messages SET id = UNHEX(?), message = ?, " +
						"status = 0, created_at = NOW(), updated_at = NOW(), proposal_id = UNHEX(?), " +
						"user_id = UNHEX(?)";
					return connection.execute(query, [uuid().replace(/\-/g, ""), req.body.message, req.body.proposal_id, payload.id]);
				})
					.spread(data => {
						res.json(data);
					})
					.catch(err => {
						res.status(400).json({ message: "Please contact an admin." });
					});
		});
	}
}
