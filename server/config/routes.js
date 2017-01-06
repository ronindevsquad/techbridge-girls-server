var users = require('../controllers/users.js');
var offers = require('../controllers/offers.js');
var processes = require('../controllers/processes');


module.exports = function(app) {
	// USERS
	// app.get('/users', users.index);
	app.get('/api/users/:id', users.show);
	app.put('/api/users', users.update);
	app.delete('/api/users', users.delete);
	app.put('/users/changePassword', users.changePassword);
	app.post('/users/register', users.register);
	app.post('/users/login', users.login);


	//OFFERS
	app.get('/api/offers', offers.index)
}

	// PROCESSES
	app.post('/api/processes/set', processes.set);
}
