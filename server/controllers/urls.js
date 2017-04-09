const getConnection = require("../config/mysql");
const Promise = require("bluebird");
const s3 = require('../services/s3').s3;

const using = Promise.using;

module.exports = {
	create: function (req, res) {
		if (req.body.homepage === undefined || req.body.facebook === undefined ||
			req.body.instagram === undefined || req.body.linkedin === undefined || req.body.twitter === undefined)
			return res.status(400).json({ message: "Some URLS are missing from the request." })

		using(getConnection(), connection => {
			// Check if user has urls:
			const query = "SELECT * FROM urls WHERE user_id = UNHEX(?) LIMIT 1";
			return connection.execute(query, [req.user.id]);
		})
			.spread(data => {
				return using(getConnection(), connection => {
					const _data = [req.body.homepage, req.body.facebook, req.body.instagram,
					req.body.linkedin, req.body.twitter, req.user.id];
					if (data.length == 0) {
						query = "INSERT INTO urls SET homepage = ?, facebook = ?, instagram = ?, " +
							"linkedin = ?, twitter = ?, created_at = NOW(), updated_at = NOW(), user_id = UNHEX(?)"
						return connection.execute(query, _data);
					} else {
						query = "UPDATE urls SET homepage = ?, facebook = ?, instagram = ?, " +
							"linkedin = ?, twitter = ?, updated_at = NOW() WHERE user_id = UNHEX(?)"
						return connection.execute(query, _data);
					}
				});
			})
			.spread(data => {
				if (data.affectedRows == 0)
					return res.status(400).json({ message: "Unable to save URLs." });
				return res.end();
			})
			.catch(err => {
				console.log(err);
				return res.status(400).json({ message: "Please contact an admin." });
			});
	},
	uploadPicture: function (req, res) {
		if (!req.file || !req.file.buffer)
			return res.status(400).json({ message: "Could not upload picture." });

		if (!req.file)
			return res.status(400).json({ message: "No files were selected to upload." });

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
					return reject(err);
				return resolve(data.Location);
			})
		})
			.then((location) => {
				pictureURL = unescape(location);
				return using(getConnection(), connection => {
					query = "UPDATE users SET picture = ?, updated_at = NOW() WHERE id = UNHEX(?)"
					return connection.execute(query, [pictureURL, req.user.id]);
				});
			})
			.spread(data => {
				if (data.changedRows == 0)
					throw { status: 400, message: "Failed to save image." };

				req.user.picture = pictureURL;
				res.json(jwt.sign(req.user, jwtKey, { expiresIn: "5d" }));
			})
			.catch(err => {
				console.log(err);
				if (err.status)
					return res.status(err.status).json({ message: err.message });
				return res.status(400).json({ message: "Please contact an admin." });
			});
	}
}