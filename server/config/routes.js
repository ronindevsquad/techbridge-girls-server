var multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads')
	},
	filename: function (req, file, cb) {
		console.log(file);
		cb(null, new Date().toISOString().
    replace(/T/, ' ').      // replace T with a space
    replace(/\..+/, '').     // delete the dot and everything after)
    replace(" ", '')  + '-' + file.originalname);
	}
});
var upload = multer({storage: storage});

module.exports = function(app, jwt_key) {
	var users = require('../controllers/users.js')(jwt_key);
	var urls = require('../controllers/urls.js')(jwt_key);
	var proposals = require('../controllers/proposals.js')(jwt_key);
	var offers = require('../controllers/offers.js')(jwt_key);
	var processes = require('../controllers/processes')(jwt_key);
	var offers = require('../controllers/offers')(jwt_key);
	var reports = require('../controllers/reports')(jwt_key);

	// USERS
	app.get('/api/users/:id', users.show);
	app.put('/api/users', users.update);
	app.delete('/api/users', users.delete);
	app.put('/users/changePassword', users.changePassword);
	app.post('/users/register', users.register);
	app.post('/users/login', users.login);

	// URLS
	app.post('/api/urls', urls.create);

	// PROPOSALS
	app.get('/api/proposals/getMyProposals', proposals.getMyProposals);
	app.get('/api/proposals', proposals.index);
	app.get('/api/proposals/:id', proposals.show);
	app.post('/api/proposals', upload.fields([{name:'document', maxCount:20},
		{name:'NDA', maxCount:1}]), proposals.create);

	//OFFERS
	app.get('/api/getAcceptedOffers', offers.getAcceptedOffers);
	app.get('/api/offers/:proposal_id', offers.index);
	app.post('/api/offers', offers.create);

	// REPORTS
	app.get('/api/reports', reports.index)
	app.get('/api/reports/:id', reports.getReportsForProposal)
	app.post('/api/reports', reports.create)

	// PROCESSES
	app.post('/api/processes/set', processes.set);
}
