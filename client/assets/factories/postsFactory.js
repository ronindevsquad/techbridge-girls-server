app.factory('postsFactory', function($http) {
	return {
		index: function(callback) {
			$http.get('/posts').then(function(res) {
				callback(res.data);
			});
		},
		show: function(id, callback) {
			$http.get(`/posts/${id}`).then(function(res) {
				callback(res.data);
			});
		},
		create: function(data, callback) {
			$http.post('/posts', data).then(function(res) {
				callback();
			});
		},
		update: function(data, callback) {
			$http.put(`/posts/${data._id}`, data).then(callback());
		},
		delete: function(id) {
			$http.delete(`/posts/${id}`);
		}
	}
})