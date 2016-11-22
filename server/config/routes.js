var users = require('../controllers/users.js');
// posts = require('../controllers/posts.js'),
// links = require('../controllers/links.js');

module.exports = function(app) {
	// USERS
	// app.get('/users', users.index);
	app.get('/api/users/:username', users.show);
	app.post('/users', users.create);
	app.put('/api/users/:username', users.update);
	app.put('/users/favorites/:id', users.toggleFavorite); //add a favorite
	app.delete('/api/users/:username', users.delete);
	app.post('/login', users.login);

	// // POSTS
	// app.get('/posts', posts.index);
	// app.get('/posts/:id', posts.show);
	// app.post('/api/posts', posts.create);
	// app.put('/api/posts/:id', posts.update);
	// app.delete('/api/posts/:id', posts.delete);

	// // LINKS
	// app.get('/links', links.index);
	// app.get('/links/:id', links.show);
	// app.post('/links', links.create);
	// app.put('/links/:id', links.update);
	// app.delete('/links/:id', links.delete);
}
