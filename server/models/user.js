var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
	email: {type: String, required: true, 
		validate: {
			validator: function(value) {
				return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test( value );
			},
			message: "Invalid email. Email format should be: email@mailserver.com."
		}
	},
	username: {type: String, required: true, minlength: 2, maxlength: 32},
	password: {type: String, required: true, minlength: 8,
		validate: {
			validator: function(value) {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]/.test( value );
			},
			message: "Invalid password. Your password must have at least one number and one uppercase letter."
		}
	},
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
}, {timestamps: true});

UserSchema.pre('save', function(done) {
	if (!this.isModified('password'))
		return next();

	bcrypt.genSalt(10, function(err, salt) {
		if (err)
			return next(err);
		bcrypt.hash(this.password, salt, function(err, hash) {
			if (err)
				return next(err);
			this.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err)
        	return callback(err);
        callback(null, isMatch);
    });
};

mongoose.model('User', UserSchema);