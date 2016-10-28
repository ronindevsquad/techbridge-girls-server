var	express  = require('express'),
bp = require('body-parser'),
path = require('path'),
root = __dirname,
port = process.env.PORT || 8000,
app = express(),
expressJwt = require('express-jwt');

app.use(express.static(path.join(root, 'client')));
app.use(express.static(path.join(root, 'bower_components')));
// app.use(bp.json()); THIS HAS A DEFAULT OF 100kb
app.use('/api', expressJwt({secret: 'secret_key'}))

//TESTING OUT FILE SIZE LIMITS
app.use(bp.json({limit: "10mb"}));
app.use(bp.urlencoded({ limit: "10mb", extended: true }));
//

require('./server/config/mongoose.js'),
require('./server/config/routes.js')(app);

app.listen(port, function() {
	console.log(`server running on port ${ port }`);
});
