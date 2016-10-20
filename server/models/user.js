var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
	email: {type: String, required: true},
	alias: {type: String, required: true, minlength: 2},
	password: {type: String, required: true, minlength: 8},
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
}, {timestamps: true});
var User = mongoose.model('User', UserSchema);