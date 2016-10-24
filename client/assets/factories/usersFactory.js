app.factory('usersFactory', function($http) {
	return {
		index: function(callback) {
			$http.get('/users').then(function(res) {
				callback(res.data);
			});
		},
		show: function(id, callback) {
			$http.get(`/users/${id}`).then(function(res) {
				callback(res.data);
			});
		},
		create: function(data, callback) {
			$http.post('/users', data).then(function(res) {
				callback(res.data);
			});
		},
		update: function(data, callback) {
			$http.put(`/users/${data._id}`, data).then(function(res) {
				callback(res.data);				
			});
		},
		delete: function(id, callback) {
			$http.delete(`/users/${id}`).then(function(res) {
				callback(res.data);
			});
		},
		login: function(data, callback) {
			$http.post('/login', data).then(function(res) {
				callback(res.data);
			});
		}		
	}
})