var mongoose = require('mongoose');
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
	username: {type: String, required: true,
		validate: {
			validator: function(value) {
				return /^[a-z0-9](?=.{3,32})/i.test(value);
			},
			message: "Username must be alphanumeric and at least four characters long."
		}
	},
	email: {type: String, required: true,
		validate: {
			validator: function(value) {
				return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test( value );
			},
			message: "Invalid email. Email format should be: email@mailserver.com."
		}
	},
	password: {type: String, required: true,
		validate: {
			validator: function(value) {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&](?=.{7,})/.test(value);
			},
			message: "Password must be at least 8 characters long and have a lowercase letter, an uppercase letter, and a number."
		}
	},
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
}, {timestamps: true});

UserSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))
		return next();

	bcrypt.genSalt(10, function(err, salt) {
		if (err)
			return next(err);
		bcrypt.hash(user.password, salt, function(err, hash) {
			console.log("err:", err)
			console.log("hash:", hash)

			if (err)
				return next(err);
			user.password = hash;
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