var users = require('../controllers/users.js');
var proposals = require('../controllers/proposals.js');
var offers = require('../controllers/offers.js');
var processes = require('../controllers/processes');
var offers = require('../controllers/offers');
var reports = require('../controllers/reports');

module.exports = function(app) {
	// USERS
	// app.get('/users', users.index);
	app.get('/api/users/:id', users.show);
	app.put('/api/users', users.update);
	app.delete('/api/users', users.delete);
	app.put('/users/changePassword', users.changePassword);
	app.post('/users/register', users.register);
	app.post('/users/login', users.login);

	// PROPOSALS
	app.get('/api/proposals', proposals.index);
	app.get('/api/proposals/:id', proposals.show);
	app.post('/api/proposals', proposals.create);
	// app.put('/api/proposals/:action/:id', proposals.update);
	// app.delete('/api/proposals/:id', proposals.delete);

	//OFFERS
	app.get('/api/getAcceptedOffers', offers.getAcceptedOffers);
	app.get('/api/offers/:proposal_id', offers.index);
	// app.get('/api/offers/:id', offers.show);
	app.post('/api/offers', offers.create);
	// app.put('/api/offers/:action/:id', offers.update);
	// app.delete('/api/offers/:id', offers.delete);

	//reports
	app.get('/api/reports', reports.index)
	app.post('/api/reports', reports.create)

	// PROCESSES
	app.post('/api/processes/set', processes.set);
}
