app.factory('usersFactory', function($http, $cookies) {
	return {
		// index: function(callback) {
		// 	$http.get('/api/users').then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		show: function(username, callback) {
			$http.get(`/api/users/${username}`, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		create: function(data, callback) {
			$http.post('/users', data).then(function(res) {
				callback(res.data);
			});
		},
		update: function(data, callback) {
			$http.put(`/api/users/${data.username}`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		delete: function(callback) {
			console.log($cookies.get('token'))
			$http.delete('/api/users', {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		login: function(data, callback) {
			$http.post('/login', data).then(function(res) {
				callback(res.data);
			});
		},
		fb_login: function(data, callback) {
			$http.post('/fb_login', data).then(function(res) {
				callback(res.data);
			});
		}		
	}
})
