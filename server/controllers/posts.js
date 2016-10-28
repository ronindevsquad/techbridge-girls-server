var mongoose = require('mongoose');
var fs = require('fs');
var getPayload = require('./GetPayload.js');

var User = mongoose.model('User');
var Post = mongoose.model('Post');

module.exports = {
	index: function(req, res) {
		// Post.find()
		// .populate('_user')
		// .populate('links')
		// .exec(function(err, data) {
		// 	if (err)
		// 		res.json(err);
		// 	else
		// 		res.json(data);
		// });

		Post.find({})
		.sort({createdAt:-1})
		.exec(function(err, data){
			if (err){
				res.json(err);
			} else {
				res.json(data);
			}
		});
	},
	create: function(req, res) {
		var username = getPayload(req.headers).username;
		User.findOne({username: username}, function(err, user) {
			if (err)
				res.json(err);
			else {
				var post = new Post({
					_user: user._id,
					image:""
				});

				var imageExtention = "." + req.body.data.split('\/')[1].split(';')[0];
				var imageFileName = post._id+"";
				var imagePathandFileName = "./client/static/images/userphotos/" + imageFileName + imageExtention;
				var base64Data = req.body.data.split(',')[1];
				fs.writeFile(imagePathandFileName, base64Data, 'base64', function(err) {
					console.log(err);
				});
				post.image = imagePathandFileName.split('/client')[1];

				// Now save the post:
				post.save(function(err, post) {
					if (err)
						res.json(err);
					else {
						// Then update the user's posts:
						user.posts.push(post);
						user.save(function(err, data) {
							if (err)
								res.json(err);
							else
								res.json(post);
						});
					}
				});
				//end of save post
			}
		});
	},
	update: function(req, res) {
		var payload = getPayload(req.headers);
		if (payload.username != req.body._user.username)
			res.send(403);
		else
			Post.update({_id: req.params.id}, {$set: {
				links: req.body.links
			}}, function(err, data) {
				if (err)
					res.json(err)
				else
					Post.find({_id:req.params.id}, function(err, post){
						if(err) {res.json(err)}
						else{
							console.log(post);
							res.json(post);
						}
					});

				console.log(data);
			});
	},
	delete: function(req, res) {
		var payload = getPayload(req.headers);

		Post.findOne({_id: req.params.id}, function(err, post){
			if (err){
				res.json(err);
			} else {
				User.findOne({_id: post._user}, function(err, user){
					if (err){
						res.json(err);
					} else {
						if (payload.username != user.username)
							res.send(403);
						else
							Post.remove({_id: req.params.id}, function(err, data) {
								if (err)
									res.json(err)
								else
									res.json(data);
							});
					}
				});
			}
		});
	},
	show: function(req, res) {
		Post.findOne({_id: req.params.id})
		.populate('_user')
		.exec(function(err, data) {
			if (err)
				res.json(err);
			else
				res.json(data);
		});
	}
}
