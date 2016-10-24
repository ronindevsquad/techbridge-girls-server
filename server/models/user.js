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

UserSchema.methods.create_user = function(callback) {
	var user = this;
	console.log(user)
	console.log(user.password, user.confirm_password)
	if (user.password != user.confirm_password)
		callback({errors: {password: {message: "Passwords do not match."}}});
	else {
		// Check for unique username:
		user.findOne({username: user.username}, function(err, data) {
			if (err)
				callback(err);
			else if (data)
				callback({errors: {username: {message: "Username already registered."}}});
			else {
				// Check for unique email:
				user.findOne({email: user.email}, function(err, data) {
					if (err)
						callback(err);
					else if (data)
						callback({errors: {email: {message: "Email already in use."}}});
					else {
						user.save(function(err, data) {
							if (err) 
								callback(err);
							else
								callback(null, data);
						});
					}
				});
			}
		});
	}

};

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
		bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
				if (err)
					return callback(err);
				callback(null, isMatch);
		});
};

mongoose.model('User', UserSchema);