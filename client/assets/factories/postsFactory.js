app.factory('postsFactory', function($http, $cookies) {
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
			$http.post('/api/posts', data, {
				headers: {'Authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		update: function(data, callback) {
			$http.put(`/api/posts/${data._id}`, data, {
				headers: {'Authorization': `Bearer ${$cookies.get('token')}`}				
			}).then(function(res) {
				callback();				
			});
		},
		delete: function(id, callback) {
			$http.delete(`/api/posts/${id}`, {
				headers: {'Authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		}
	}
})