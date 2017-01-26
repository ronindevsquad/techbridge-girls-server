app.factory('messagesFactory', function($http, $cookies) {
	return {
		index: function(callback) {
			$http.get('/messages', {
				headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			}, function(res) {
				callback(res);
			});
		},
		show: function(id, callback) {
			$http.get(`/api/messages/${id}`, {
				headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			}, function(res) {
				callback(res);
			});
		},
				// update: function(data, callback) {
		// 	$http.put(`/api/messages`, data, {
		// 		headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	}, function(res) {
		// 		callback(res);
		// 	});
		// },
		// delete: function(id, callback) {
		// 	$http.delete(`/api/messages/${id}`, {
		// 		headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	}, function(res) {
		// 		callback(res);
		// 	});
		// },
		create: function(data, callback) {
			$http.post('/api/messages', data, {
				headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			}, function(res) {
				callback(res);
			});
		}
	}
})
