var	express  = require('express'),
bp = require('body-parser'),
path = require('path'),
root = __dirname,
port = process.env.PORT || 8000,
app = express(),
expressJwt = require('express-jwt');

app.use(express.static(path.join(root, 'client')));
app.use(express.static(path.join(root, 'bower_components')));
app.use(bp.json());
app.use('/api', expressJwt({secret: 'secret_key'}))

require('./server/config/mongoose.js'),		
require('./server/config/routes.js')(app);

app.listen(port, function() {
	console.log(`server running on port ${ port }`);
});