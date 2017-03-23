const	express  = require('express');
const bp = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const expressJwt = require('express-jwt');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const jwtKey = require('./keys').jwtKey;
const root = __dirname;
const port = process.env.PORT || 8000;
const app = express();

// TEMPORARILY ALLOW CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:4200");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});

app.use(helmet());
app.use(express.static(path.join(root, 'client')));
app.use(express.static(path.join(root, 'bower_components')));
app.use(bp.json());
app.use(cookieParser());
app.use('/api', expressJwt({secret: jwtKey}));

require('./server/config/mysql.js');
require('./server/config/routes.js')(app, jwtKey);

const server = app.listen(port, function() {
	console.log(`server running on port ${ port }`);
});

require("./server/config/socket.js")(server);
