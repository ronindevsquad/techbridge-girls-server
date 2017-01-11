app.factory('offersFactory', function($http, $cookies) {
	return {
		index: function(callback) {
			$http.get('/api/offers', {
				headers: {'authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		// show: function(id, callback) {
		// 	$http.get(`/api/offers/${id}`, {
		// 		headers: {'authorization': `Bearer ${$cookies.get('evergreen_token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		// update: function(data, callback) {
		// 	$http.put(`/api/offers`, data, {
		// 		headers: {'authorization': `Bearer ${$cookies.get('evergreen_token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		// delete: function(id, callback) {
		// 	$http.delete(`/api/offers/${id}`, {
		// 		headers: {'authorization': `Bearer ${$cookies.get('evergreen_token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		create: function(data, callback) {
			$http.post('/api/offers', data, {
				headers: {'authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
	}
})
