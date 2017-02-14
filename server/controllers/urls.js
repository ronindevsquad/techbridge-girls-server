module.exports = function(jwt_key) {
	var url = require('../models/url')(jwt_key);
	return {
		create: function(req, res) {
			url.create(req, function(err, data) {
				if (err)
					res.status(err.status).json({message: err.message});
				else
					res.end();
			});
		},
		uploadPicture: function(req, res) {
			console.log(req.file);
			url.uploadPicture(req, function(err, data) {
				if (err)
					res.status(err.status).json({message: err.message});
				else
					res.json(data.picture);
			});
		},
	}
}
