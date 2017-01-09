app.factory('proposalsFactory', function($http, $cookies) {
	return {
		// index: function(callback) {
		// 	$http.get('/api/proposals', {
		// 		headers: {'authorization': `Bearer ${$cookies.get('evergreen_token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		// show: function(id, callback) {
		// 	$http.get(`/api/proposals/${id}`, {
		// 		headers: {'authorization': `Bearer ${$cookies.get('evergreen_token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		// update: function(data, callback) {
		// 	$http.put(`/api/proposals`, data, {
		// 		headers: {'authorization': `Bearer ${$cookies.get('evergreen_token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		// delete: function(id, callback) {
		// 	$http.delete(`/api/proposals/${id}`, {
		// 		headers: {'authorization': `Bearer ${$cookies.get('evergreen_token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		create: function(data, callback) {
			$http.post('/api/proposals', data, {
				headers: {'authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
	}
})
