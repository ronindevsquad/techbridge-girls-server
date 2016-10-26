var mongoose = require('mongoose');
var multer  = require('multer');
var getPayload = require('./GetPayload.js');
var fs = require('fs');

var User = mongoose.model('User');
var Post = mongoose.model('Post');

module.exports = {
	index: function(req, res) {
		Post.find()
		.populate('_user')
		.populate('links')
		.exec(function(err, data) {
			if (err)
				res.json(err);
			else
				res.json(data);
		});
	},
	create: function(req, res) {
		var username = getPayload(req.headers).username;
		console.log("=============")
		console.log("A FILE WAS UPLOADED, DETAILS ARE BELOW:")
		console.log("image extention is: " + req.body.data.split('\/')[1].split(';')[0])
		var imageExtention = "." + req.body.data.split('\/')[1].split(';')[0];
		var imageFileName = "out";
		var imagePathandFileName = "./client/static/images/"+ imageFileName + imageExtention;
		var base64Data = req.body.data.split(',')[1];
		console.log("image file path and name: " + imagePathandFileName);
		console.log(base64Data);
		console.log("=============")
		fs.writeFile(imagePathandFileName, base64Data, 'base64', function(err) {
			console.log(err);
		});
		// User.findOne({_id: TEMP_ID}, function(err, user) {
		// 	if (err)
		// 		res.json(err);
		// 	else {
		// 		var post = new Post({
		// 			_user: user._id,
		// 			image: req.body.image
		// 		});

		// 		// If links exist, save them and append to post.lists:
		// 		for (var i = 0; i < req.body.links; i++) {
		// 			var link = new Link({
		// 				_post: post.id,
		// 				url: req.body.links[i]
		// 			});
		// 			link.save(function(err, link) {
		// 				if (err)
		// 					res.json(err);
		// 				else
		// 					post.links.push(link);
		// 			});
		// 		}

		// 		// Now save the post:
		// 		post.save(function(err, post) {
		// 			if (err)
		// 				res.json(err);
		// 			else {
		// 				// Then update the user's posts:
		// 				user.posts.push(post);
		// 				user.save(function(err, data) {
		// 					if (err)
		// 						res.json(err);
		// 					else
		// 						res.json(data);
		// 				});
		// 			}
		// 		});
		// 	}
		// });
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
					res.json(data);
			});
	},
	delete: function(req, res) {
		var payload = getPayload(req.headers);
		if (payload.username != req.body._user.username)
			res.send(403);
		else		
			Post.remove({_id: req.params.id}, function(err, data) {
				if (err)
					res.json(err)
				else
					res.json(data);
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
