const getConnection = require("../config/mysql");
const Promise = require("bluebird");
const uuid = require("uuid/v1");

const using = Promise.using;

module.exports = {
	index: function (req, res) {
		using(getConnection(), connection => {
			const query = "SELECT * FROM reports WHERE offer_id IN " +
				"(SELECT id FROM offers WHERE proposal_id IN " +
				"(SELECT id FROM proposals))" //WHERE id = 'proposal.id'
			return connection.execute(query);
		})
			.spread(data => {
				return res.json(data);
			})
			.catch(err => {
				return res.status(400).json({ message: "Please contact an admin." });
			});
	},
	getReportsForProposal: function (req, res) {
		using(getConnection(), connection => {
			// const query = "SELECT reports.*, HEX(offers.proposal_id) as 'proposal_id' FROM evergreendb.proposals " +
			// "JOIN offers ON offers.proposal_id = proposals.id JOIN reports on reports.offer_id = offers.id " +
			// "where HEX(proposals.id) = ?"
			const query = "SELECT *, HEX(proposal_id) AS 'proposal_id' FROM reports WHERE proposal_id = UNHEX(?) ORDER BY created_at"
			return connection.execute(query, [req.params.id]);
		})
			.spread(data => {
				return res.json(data);
			})
			.catch(err => {
				return res.status(400).json({ message: "Please contact an admin." });
			});
	},
	create: function (req, res) {
		console.log(req.body);
		using(getConnection(), connection => {
			data = [uuid().replace(/\-/g, ""), req.body.input, req.body.output, req.body.shipped,
			req.body.note, payload.id, req.body.proposal_id];
			const query = "INSERT INTO reports SET id = UNHEX(?), status = 1, input = ?, output = ?, " +
				"shipped = ?, note = ?, created_at = NOW(), updated_at = NOW(), user_id = UNHEX(?), " +
				"proposal_id = UNHEX(?)";
			return connection.execute(query, data);
		})
			.spread(data => {
				if (data.changedRows == 0)
					throw { status: 400, message: "Unable to add report." };

				return using(getConnection(), connection => {
					// Retrieve updated user:
					const query = "SELECT *, HEX(proposal_id) AS 'proposal_id' FROM reports WHERE proposal_id = UNHEX(?) ORDER BY created_at"
					return connection.execute(query, [req.body.proposal_id]);
				});
			})
			.spread(data => {
				return res.json(data);
			})
			.catch(err => {
				console.log(err)
				return res.status(400).json({ message: "Please contact an admin." });
			});
	}
}
