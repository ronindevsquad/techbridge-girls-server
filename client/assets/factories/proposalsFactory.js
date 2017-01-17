app.factory('proposalsFactory', function($http, $cookies) {
	return {
		index: function(callback) {
			$http.get('/api/proposals', {
				headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				console.log("success: ", res)
				callback(res.data);
			}, function(res) {
				console.log("error: ", res);
				callback(res);
			});
		},
		show: function(id, callback) {
			$http.get(`/api/proposals/${id}`, {
				headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			}, function(res) {
				callback(res);
			});
		},
		// update: function(data, callback) {
		// 	$http.put(`/api/proposals`, data, {
		// 		headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	}, function(res) {
		// 		callback(res);
		// 	});
		// },
		// delete: function(id, callback) {
		// 	$http.delete(`/api/proposals/${id}`, {
		// 		headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	}, function(res) {
		// 		callback(res);
		// 	});
		// },
		create: function(data, callback) {
			$http.post('/api/proposals', data, {
				headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			}, function(res) {
				callback(res);
			});
		}
	}
})