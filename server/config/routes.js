const messages = require('../controllers/messages');
const offers = require('../controllers/offers');
const processes = require('../controllers/processes');
const proposals = require('../controllers/proposals');
const reports = require('../controllers/reports');
const urls = require('../controllers/urls');
const users = require('../controllers/users');

const upload = require('../services/upload');

module.exports = function (app) {
	// MESSAGES
	// app.get('/api/messages', messages.index);
	app.get('/api/messages/:proposal_id', messages.show);
	app.post('/api/messages', messages.create);

	// OFFERS
	app.delete('/api/offers/:proposal_id', offers.delete);
	app.get('/api/offers/get-accepted-offers', offers.getAcceptedOffers);
	app.get('/api/offers/get-offers-for-proposal/:proposal_id', offers.getOffersForProposal);
	app.get('/api/offers/:proposal_id', offers.index);
	app.get('/api/offers/:proposal_id/:user_id', offers.show);
	app.post('/api/offers', offers.create);
	app.put('/api/offers/nullify', offers.nullify);
	app.put('/api/offers/send', offers.send);
	app.put('/api/offers/accept', offers.accept);
	
	// PROCESSES
	app.post('/api/processes/set', processes.set);

	// PROPOSALS
	app.delete('/api/proposals/:id', proposals.delete);
	app.get('/api/proposals/get-my-applications', proposals.getMyApplications);
	app.get('/api/proposals/get-my-proposals', proposals.getMyProposals);
	app.get('/api/proposals/get-percent-completed', proposals.getPercentCompleted);
	app.get('/api/proposals/get-proposals-for-page/:page', proposals.getProposalsForPage)
	app.get('/api/proposals/:id', proposals.show);
	app.post('/api/proposals', proposals.create);
  app.post('/api/proposals/upload-files', upload.array('file'), proposals.uploadFiles)

	// REPORTS
	app.get('/api/reports', reports.index)
	app.get('/api/reports/get-reports-for-proposal/:id', reports.getReportsForProposal)
	app.post('/api/reports', reports.create)
	
	// URLS
	app.post('/api/urls', urls.create);
	app.post('/api/urls/upload-picture', upload.single('picture'), urls.uploadPicture);

	// USERS
	app.delete('/api/users', users.delete);
	app.get('/api/users/notifications/:id', users.notifications);
	app.get('/api/users/:id', users.show);
	app.post('/api/users/send-ticket', users.sendTicket);
	app.post('/users/login', users.login);
	app.post('/users/login-linkedin', users.loginLinkedIn);
	app.post('/users/register', users.register);
	app.post('/users/register-linkedin', users.registerLinkedIn);
	app.put('/api/users', users.update);
	app.put('/api/users/change-password', users.changePassword);

	app.get('/test', function (req, res) {
		res.end()
	});
}
