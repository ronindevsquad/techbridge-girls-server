var makers = require('../controllers/makers.js');
var suppliers = require('../controllers/suppliers.js');

module.exports = function(app) {
	// MAKERS
	// app.get('/makers', makers.index);
	app.get('/api/makers/:id', makers.show);
	app.put('/api/makers', makers.update);
	app.delete('/api/makers', makers.delete);
	app.put('/makers/changePassword', makers.changePassword);
	app.post('/makers/register', makers.register);
	app.post('/makers/login', makers.login);
	
	// SUPPLIERS
	// app.get('/suppliers', suppliers.index);
	app.get('/api/suppliers/:id', suppliers.show);
	app.put('/api/suppliers', suppliers.update);
	app.delete('/api/suppliers', suppliers.delete);
	app.put('/suppliers/changePassword', suppliers.changePassword);
	app.post('/suppliers/register', suppliers.register);
	app.post('/suppliers/login', suppliers.login);

}
