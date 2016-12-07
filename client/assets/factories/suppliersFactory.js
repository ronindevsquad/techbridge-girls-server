app.factory('suppliersFactory', function($http, $cookies) {
	return {
		// index: function(callback) {
		// 	$http.get('/api/suppliers').then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		// show: function(username, callback) {
		// 	$http.get(`/api/suppliers/${username}`, {
		// 		headers: {'authorization': `Bearer ${$cookies.get('token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		update: function(data, callback) {
			$http.put(`/api/suppliers`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		delete: function(callback) {
			$http.delete('/api/suppliers', {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		register: function(data, callback) {
			$http.post('/suppliers/register', data).then(function(res) {
				callback(res.data);
			});
		},
		login: function(data, callback) {
			$http.post('/suppliers/login', data).then(function(res) {
				callback(res.data);
			});
		},
		fb_register: function(data, callback) {
			$http.post('/suppliers/fb_register', data).then(function(res) {
				callback(res.data);
			});
		},
		fb_login: function(data, callback) {
			$http.post('/suppliers/fb_login', data).then(function(res) {
				callback(res.data);
			});
		}		
	}
})
