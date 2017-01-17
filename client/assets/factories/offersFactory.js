app.factory('offersFactory', function($http, $cookies) {
	return {
		getAcceptedOffers: function(callback) {
			$http.get('/api/getAcceptedOffers', {
				headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			}, function(res) {
				callback(res);
			});
		},
		index: function(callback) {
			$http.get('/api/offers', {
				headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			}, function(res) {
				callback(res);
			});
		},
				// show: function(id, callback) {
		// 	$http.get(`/api/offers/${id}`, {
		// 		headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	}, function(res) {
		// 		callback(res);
		// 	});
		// },
				// update: function(data, callback) {
		// 	$http.put(`/api/offers`, data, {
		// 		headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
		// 	}, function(res) {
		// 		callback(res);
		// 	});
		// },
				// delete: function(id, callback) {
		// 	$http.delete(`/api/offers/${id}`, {
		// 		headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
		// 	}).then(function(res) {
		// 		callback(res.data);
			// }, function(res) {
			// 	callback(res);
			// });
		// },
		create: function(data, callback) {
			$http.post('/api/offers', data, {
				headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			}, function(res) {
				callback(res);
			});
		}
	}
})
