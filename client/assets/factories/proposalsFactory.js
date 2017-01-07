app.factory('proposalsFactory', function($http, $cookies) {
	return {
		index: function(callback) {
			$http.get('/api/proposals', {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		show: function(id, callback) {
			$http.get(`/api/proposals/${id}`, {
				headers: {'authorization': `Bearer ${$cookies.get('ronin_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		update: function(data, callback) {
			$http.put(`/api/proposals`, data, {
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
			$http.post('/proposals/create', data).then(function(res) {
				callback(res.data);
			});
		}
	}
})
