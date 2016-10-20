var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = {
	index: function(req, res) {
		User.find({}, function(err, data) {
			if (err) 
				res.json(err)
			else
				res.json(data);
		});
	},
	create: function(req, res) {
		var user = new User(req.body)
		user.save(function(err, data) {
			if (err) 
				res.json(err)
			else
				res.json(data);
		});
	},
	update: function(req, res) {
		User.update({_id: req.params.id}, {$set: {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			birthday: req.body.birthday
		}}, function(err, data) {
			if (err) 
				res.json(err)
			else
				res.json(data);
		});
	},
	delete: function(req, res) {
		User.remove({_id: req.params.id}, function(err, data) {
			if (err) 
				res.json(err)
			else
				res.json(data);
		});
	},
	show: function(req, res) {
		User.findOne({_id: req.params.id}, function(err, data) {
			if (err) 
				res.json(err)
			else
				res.json(data);
		});
	}
}