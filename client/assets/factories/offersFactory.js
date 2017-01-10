app.factory('offersFactory', function($http, $cookies) {
	return {
		//index will only return offers that correspond to the ID of the user.
		index: function(callback) {
			$http.get('/offers', {
				headers: {'authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		show: function(id, callback) {
			$http.get(`/api/offers/${id}`, {
				headers: {'authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		update: function(data, callback) {
			$http.put(`/api/offers`, data, {
				headers: {'authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		delete: function(callback) {
			$http.delete('/api/users', {
				headers: {'authorization': `Bearer ${$cookies.get('evergreen_token')}`}
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
