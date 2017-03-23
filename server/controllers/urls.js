const getConnection = require("../config/mysql");
const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const jwtKey = require("../../keys").jwtKey;
const s3 = require('../services/s3').s3;

const using = Promise.using;

module.exports = {
	create: function (req, res) {
		jwt.verify(req.cookies.anvyl_token, jwtKey, function (err, payload) {
			if (err)
				res.status(401).json({ message: "Invalid token. Your session is ending, please login again." });
			else if (req.body.homepage === undefined || req.body.facebook === undefined ||
				req.body.instagram === undefined || req.body.linkedin === undefined || req.body.twitter === undefined)
				res.status(400).json({ message: "Some URLS are missing from the request." })
			else
				using(getConnection(), connection => {
					// Check if user has urls:
					const query = "SELECT * FROM urls WHERE user_id = UNHEX(?) LIMIT 1";
					return connection.execute(query, [payload.id]);
				})
					.spread(data => {
						return using(getConnection(), connection => {
							const _data = [req.body.homepage, req.body.facebook, req.body.instagram,
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
							res.status(400).json({ message: "Unable to save URLs." });
						else
							res.end();
					})
					.catch(err => {
						console.log(err);
						res.status(400).json({ message: "Please contact an admin." });
					});
		});
	},
	uploadPicture: function (req, res) {
		if (!req.file || !req.file.buffer) {
			return res.status(400).json({ message: "Could not upload picture." });
		}

		jwt.verify(req.cookies.anvyl_token, jwtKey, function (err, payload) {
			if (err) {
				res.status(401).json({ message: "Invalid token. Your session is ending, please login again." });
			} else if (!req.file) {
				res.status(400).json({ message: "No files were selected to upload." });
			} else {
				let pictureURL;
				new Promise((resolve, reject) => {
					// ELLIOT
					s3.upload({
						Bucket: "ronintestbucket/picturefolder",
						Key: req.file.filename,
						Body: req.file.buffer,
						ContentType: req.file.mimetype,
						ACL: "public-read"
					}, function (err, data) {
						if (err)
							reject(err);
						else {
							resolve(data.Location);
						}
					})
				})
					.then((location) => {
						pictureURL = unescape(location);
						return using(getConnection(), connection => {
							query = "UPDATE users SET picture = ?, updated_at = NOW() WHERE id = UNHEX(?)"
							return connection.execute(query, [pictureURL, payload.id]);
						});
					})
					.spread(data => {
						if (data.changedRows == 0)
							throw { status: 400, message: "Failed to save image." };
						else {
							payload.picture = pictureURL;
							res.json(jwt.sign({ payload }, jwtKey, { expiresIn: "5d" }));
						}
					})
					.catch(err => {
						console.log(err);
						if (err.status)
							res.status(err.status).json(err.message);
						else
							res.status(400).json({ message: "Please contact an admin." });
					});
			}
		});
	},
}