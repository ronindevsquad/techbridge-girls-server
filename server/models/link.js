var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LinkSchema = new mongoose.Schema({
	_post: {type: Schema.Types.ObjectId, ref: 'Post'},
	url: {type: String, required : true}
}, {timestamps: true});
var Link = mongoose.model('Link', LinkSchema);