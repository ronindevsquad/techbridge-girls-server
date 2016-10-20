var users = require('../controllers/users.js');
var posts = require('../controllers/posts.js');
var links = require('../controllers/links.js');

module.exports = function(app) {
	app.get('/users', users.index);
	app.get('/users/:id', users.show);
	app.post('/users', users.create);
	app.put('/users/:id', users.update);
	app.delete('/users/:id', users.delete);

	app.get('/posts', posts.index);
	app.get('/posts/:id', posts.show);
	app.post('/posts', posts.create);
	app.put('/posts/:id', posts.update);
	app.delete('/posts/:id', posts.delete);

	app.get('/links', links.index);
	app.get('/links/:id', links.show);
	app.post('/links', links.create);
	app.put('/links/:id', links.update);
	app.delete('/links/:id', links.delete);
}