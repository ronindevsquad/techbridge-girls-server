const techbridge = require('../controllers/techbridge-girls');

module.exports = function (app) {
	app.get('/request-signature', techbridge.requestSignature);
	app.post('/donate', techbridge.donate);
}