const makers = require('../controllers/makers');
const messages = require('../controllers/messages');
const offers = require('../controllers/offers');
const processes = require('../controllers/processes');
const proposals = require('../controllers/proposals');
const reports = require('../controllers/reports');
const suppliers = require('../controllers/suppliers');
const urls = require('../controllers/urls');

const upload = require('../services/upload');

module.exports = function (app) {
	// MAKERS
	app.delete('/api/makers', makers.delete);
	app.get('/api/makers/notifications/:id', makers.notifications);
	app.get('/api/makers/:id', makers.show);
	app.post('/api/makers/send-ticket', makers.sendTicket);
	app.post('/makers/login', makers.login);
	app.post('/makers/login-linkedin', makers.loginLinkedIn);
	app.post('/makers/register', makers.register);
	app.post('/makers/register-linkedin', makers.registerLinkedIn);
	app.put('/api/makers', makers.update);
	app.put('/api/makers/change-password', makers.changePassword);

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
	
	// SUPPLIERS
	app.delete('/api/suppliers', suppliers.delete);
	app.get('/api/suppliers/notifications/:id', suppliers.notifications);
	app.get('/api/suppliers/:id', suppliers.show);
	app.post('/api/suppliers/send-ticket', suppliers.sendTicket);
	app.post('/suppliers/login', suppliers.login);
	app.post('/suppliers/login-linkedin', suppliers.loginLinkedIn);
	app.post('/suppliers/register', suppliers.register);
	app.post('/suppliers/register-linkedin', suppliers.registerLinkedIn);
	app.put('/api/suppliers', suppliers.update);
	app.put('/api/suppliers/change-password', suppliers.changePassword);

	// URLS
	app.post('/api/urls', urls.create);
	app.post('/api/urls/upload-picture', upload.single('picture'), urls.uploadPicture);

	app.get('/test', function (req, res) {
		res.end()
	});
}
