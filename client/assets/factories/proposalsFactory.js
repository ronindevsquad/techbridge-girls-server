app.factory('proposalsFactory', function($http, $cookies) {
	return {
		getMyProposals: function(callback) {
			$http.get('/api/proposals/getMyProposals', {
				headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			}, function(res) {
				callback(res);
			});
		},
		index: function(callback) {
			$http.get('/api/proposals', {
				headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			}, function(res) {
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
