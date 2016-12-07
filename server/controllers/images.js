var image = require('../models/image');

module.exports = {
	create: function(req, res) {
		image.create(req, function(err, data) {
			if (err)
				res.json(err);
			else
				res.json(data);
		});
	},
	delete: function(req, res) {
		image.delete(req, function(err) {
			if (err)
				if (err.errors.jwt)
					res.clearCookie('token').json(err);
				else
					res.json(err);
			else
				res.json(data);
		});	
	}
}