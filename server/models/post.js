var connection = require('../config/mysql');
var fs = require('fs');
var getPayload = require('./getPayload');

module.exports = {
	create: function(req, callback) {
		var username = getPayload(req.headers).username;
		var query = "SELECT id FROM users WHERE username = ? LIMIT 1";
		connection.query(query, username, function(err, data) {
			console.log("Create posts find user data:", data);
			if (err)
				callback(err);
			else
				if (!req.body.data)
					callback({errors: {image: {message: 'No photo selected.'}}});
				else {
					var imageExtention = "." + req.body.data.split('\/')[1].split(';')[0];
					var imageFileName = data[0].id+"";
					var imagePathandFileName = "./client/static/images/userphotos/" + imageFileName + imageExtention;
					var base64Data = req.body.data.split(',')[1];
					fs.writeFile(imagePathandFileName, base64Data, 'base64', function(err) {
						console.log(err);
					});

					var query = "INSERT INTO posts SET ?";
					var data = {
						image: imagePathandFileName.split('/client')[1],
						user_id: data[0].id,
						created_at: 'NOW()',
						updated_at: 'NOW()'
					};
					connection.query(query, data, function(err, data) {
						if (err)
							callback(err);
						else
							callback(false, data);
					});					
				}
		});	
	},
	
};


// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var PostSchema = new mongoose.Schema({
// 	_user: {type: Schema.Types.ObjectId, ref: 'User'},
// 	image: {type: String, required: true},
// 	links: [{type: String}]
// 	// links: [{type: Schema.Types.ObjectId, ref: 'Link'}]
// }, {timestamps: true});
// mongoose.model('Post', PostSchema);