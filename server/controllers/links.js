var Link = mongoose.model('Link');
module.exports = {
	index: function(req, res) {
		Link.find({}, function(err, data) {
			if (err) 
				res.json(err)
			else
				res.json(data);
		});
	},
	create: function(req, res) {
		var link = new Link(req.body)
		link.save(function(err, data) {
			if (err) 
				res.json(err)
			else
				res.json(data);
		});
	},
	update: function(req, res) {
		Link.update({_id: req.params.id}, {$set: {
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
		Link.remove({_id: req.params.id}, function(err, data) {
			if (err) 
				res.json(err)
			else
				res.json(data);
		});
	},
	show: function(req, res) {
		Link.findOne({_id: req.params.id}, function(err, data) {
			if (err) 
				res.json(err)
			else
				res.json(data);
		});
	}
}