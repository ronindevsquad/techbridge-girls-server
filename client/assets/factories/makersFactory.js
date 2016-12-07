app.factory('makersFactory', function($http, $cookies) {
	return {
		// index: function(callback) {
		// 	$http.get('/api/makers').then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		// show: function(username, callback) {
		// 	$http.get(`/api/makers/${username}`, {
		// 		headers: {'authorization': `Bearer ${$cookies.get('token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		update: function(data, callback) {
			$http.put(`/api/makers`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		delete: function(callback) {
			$http.delete('/api/makers', {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		register: function(data, callback) {
			$http.post('/makers/register', data).then(function(res) {
				callback(res.data);
			});
		},
		login: function(data, callback) {
			$http.post('/makers/login', data).then(function(res) {
				callback(res.data);
			});
		},
		fb_register: function(data, callback) {
			$http.post('/makers/fb_register', data).then(function(res) {
				callback(res.data);
			});
		},
		fb_login: function(data, callback) {
			$http.post('/makers/fb_login', data).then(function(res) {
				callback(res.data);
			});
		}		
	}
})
