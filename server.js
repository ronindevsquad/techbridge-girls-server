const bp = require('body-parser');
const cookieParser = require('cookie-parser');
const	express  = require('express');
const expressJwt = require('express-jwt');
const helmet = require('helmet');
const jwtKey = require('./keys').jwtKey;
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

// TEMPORARILY ALLOW CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:4200");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});

app.use(helmet());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(bp.json());
// TEST COOKIES
app.use(cookieParser());
app.use('/api', expressJwt({secret: jwtKey}));

require('./server/config/routes.js')(app);

const server = app.listen(port, function() {
	console.log(`server running on port ${ port }`);
});

require("./server/config/socket.js")(server);
