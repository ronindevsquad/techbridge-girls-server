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
	app.post('/contractors', contractors.create);
	app.put('/api/contractors/:username', contractors.update);
	app.delete('/api/contractors', contractors.delete);
	app.post('/login', contractors.login);
	app.post('/fb_login', contractors.fb_login);

	// TRUCKERS
	// app.get('/truckers', truckers.index);
	// app.get('/api/truckers/:username', truckers.show);
	app.post('/truckers', truckers.create);
	app.put('/api/truckers/:username', truckers.update);
	app.delete('/api/truckers', truckers.delete);
	app.post('/login', truckers.login);
	app.post('/fb_login', truckers.fb_login);

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
