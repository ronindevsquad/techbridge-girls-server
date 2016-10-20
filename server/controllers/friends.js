var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');
module.exports = {
	index: function(req, res) {
		Friend.find({}, function(err, data) {
			if (err) 
				res.json(err)
			else
				res.json(data);
		});
	},
	create: function(req, res) {
		var friend = new Friend(req.body)
		friend.save(function(err, data) {
			if (err) 
				res.json(err)
			else
				res.json(data);
		});
	},
	update: function(req, res) {
		Friend.update({_id: req.params.id}, {$set: {
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
		Friend.remove({_id: req.params.id}, function(err, data) {
			if (err) 
				res.json(err)
			else
				res.json(data);
		});
	},
	show: function(req, res) {
		Friend.findOne({_id: req.params.id}, function(err, data) {
			if (err) 
				res.json(err)
			else
				res.json(data);
		});
	}
}