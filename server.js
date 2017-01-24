var	express  = require('express');
var bp = require('body-parser');
var path = require('path');
var helmet = require('helmet');
var expressJwt = require('express-jwt');
var cookieParser = require('cookie-parser');
var fs = require('fs');

var jwt_key = fs.readFileSync('keys/jwt', 'utf8');
var root = __dirname;
var port = process.env.PORT || 8000;
var app = express();

app.use(helmet());
app.use(express.static(path.join(root, 'client')));
app.use(express.static(path.join(root, 'bower_components')));
app.use(bp.json());
app.use(cookieParser());
app.use('/api', expressJwt({secret: jwt_key}));

require('./server/config/mysql.js');
require('./server/config/routes.js')(app, jwt_key);

var server = app.listen(port, function() {
	console.log(`server running on port ${ port }`);
});

require("./server/config/socket.js")(server);