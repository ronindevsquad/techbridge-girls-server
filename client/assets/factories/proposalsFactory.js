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
console.log(data)
			var fd = new FormData();
			console.log(fd)
			fd.append("file", data);
			$http({
				url: '/api/proposals',
				method: "POST",
				headers: {
					'Authorization': `Bearer ${$cookies.get('evergreen_token')}`,
					'Content-Type': undefined
				},
				transformRequest: angular.identity,
				data: fd
			}).then(function(res) {
				callback(res.data);
			}, function(res) {
				callback(res);
			});
		}
	}
})
