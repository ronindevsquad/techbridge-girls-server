var contractors = require('../controllers/contractors.js');
var truckers = require('../controllers/truckers.js');
var jobs = require('../controllers/jobs.js');
// var posts = require('../controllers/posts.js');
// posts = require('../controllers/posts.js'),
// links = require('../controllers/links.js');

module.exports = function(app) {
	// CONTRACTORS
	// app.get('/contractors', contractors.index);
	// app.get('/api/contractors/:username', contractors.show);
	app.put('/api/contractors', contractors.update);
	app.delete('/api/contractors', contractors.delete);
	app.post('/contractors/register', contractors.register);
	app.post('/contractors/login', contractors.login);

	// TRUCKERS
	// app.get('/truckers', truckers.index);
	// app.get('/api/truckers/:username', truckers.show);
	app.put('/api/truckers', truckers.update);
	app.delete('/api/truckers', truckers.delete);
	app.post('/truckers/register', truckers.register);
	app.post('/truckers/login', truckers.login);

	// JOBS
	app.get('/api/jobs', jobs.index);
	app.get('/api/jobs/:id', jobs.show);
	app.post('/api/jobs', jobs.create);
	app.put('/api/jobs/:id', jobs.update);
	app.delete('/api/jobs/:id', jobs.delete);

	// POSTS
	// app.get('/posts', posts.index);
	// app.get('/posts/:id', posts.show);
	// app.post('/api/posts', posts.create);
	// app.put('/api/posts/:id', posts.update);
	// app.delete('/api/posts/:id', posts.delete);
}
