app.factory('friendsFactory', function($http) {
	return {
		index: function(callback) {
			$http.get('/friends').then(function(res) {
				callback(res.data);
			});
		},
		show: function(id, callback) {
			$http.get(`/friends/${id}`).then(function(res) {
				callback(res.data);
			});
		},
		create: function(data, callback) {
			$http.post('/friends', data).then(function(res) {
				callback();
			});
		},
		update: function(data, callback) {
			$http.put(`/friends/${data._id}`, data).then(callback());
		},
		delete: function(id) {
			$http.delete(`/friends/${id}`);
		}
	}
})