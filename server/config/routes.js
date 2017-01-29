var path = require('path');
var multer = require('multer');
// var storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, `./uploads`)
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, new Date().toISOString().
//     replace(/T/, ' ').      // replace T with a space
//     replace(/\..+/, '').     // delete the dot and everything after)
//     replace(" ", '')  + '-' + file.originalname);
// 	}
// });
// var upload = multer({storage: storage});
var upload = multer({dest: 'uploads/'});

module.exports = function(app, jwt_key) {
	var users = require('../controllers/users.js')(jwt_key);
	var urls = require('../controllers/urls.js')(jwt_key);
	var proposals = require('../controllers/proposals.js')(jwt_key);
	var offers = require('../controllers/offers.js')(jwt_key);
	var processes = require('../controllers/processes')(jwt_key);
	var offers = require('../controllers/offers')(jwt_key);
	var reports = require('../controllers/reports')(jwt_key);
	var messages = require('../controllers/messages')(jwt_key);

	// USERS
	app.get('/api/users/:id', users.show);
	app.get('/api/users/notifications/:id', users.notifications);
	app.put('/api/users', users.update);
	app.delete('/api/users', users.delete);
	app.put('/api/users/changePassword', users.changePassword);
	app.post('/users/register', users.register);
	app.post('/users/register/linkedIn', users.registerLinkedIn);
	app.post('/users/login', users.login);
	app.post('/users/login/linkedIn', users.loginLinkedIn);

	// URLS
	app.post('/api/urls', urls.create);

	// PROPOSALS
	app.get('/api/proposals/getMyProposals', proposals.getMyProposals);
	app.get('/api/proposals', proposals.index);
	app.get('/api/proposals/:id', proposals.show);
	app.post('/api/proposals', proposals.create);
  app.post('/uploadfiles', upload.array('file'), proposals.uploadfiles)

	// OFFERS
	app.get('/api/getAcceptedOffers', offers.getAcceptedOffers);
	app.get('/api/getOffers', offers.getOffers);
	app.get('/api/offers/:proposal_id', offers.index);
	app.get('/api/offer/:id', offers.show);
	app.post('/api/offers', offers.create);
	app.put('/api/offers/send', offers.send);
	app.put('/api/offers/accept', offers.accept);

	// REPORTS
	app.get('/api/reports', reports.index)
	app.get('/api/reports/:id', reports.getReportsForProposal)
	app.post('/api/reports', reports.create)

	// PROCESSES
	app.post('/api/processes/set', processes.set);

	// MESSAGES
	app.get('/api/messages', messages.index);
	app.get('/api/messages/:id', messages.show);
	app.post('/api/messages', messages.create);
}
