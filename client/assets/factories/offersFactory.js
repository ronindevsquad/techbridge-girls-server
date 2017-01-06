app.factory('offersFactory', function($http, $cookies) {
	return {
		// index: function(callback) {
		// 	$http.get('/api/users').then(function(res) {
		// 		callback(res.data);
		// 	});
		// },
		show: function(id, callback) {
			$http.get(`/api/offers/${id}`, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		update: function(data, callback) {
			$http.put(`/api/offers`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		delete: function(callback) {
			$http.delete('/api/users', {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		create: function(data, callback) {
			$http.post('/offers/create', data).then(function(res) {
				callback(res.data);
			});
		}
	}
})
