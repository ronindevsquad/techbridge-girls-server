app.factory('processesFactory', function($http, $cookies) {
	return {
		set: function(data, callback) {
			console.log($cookies.get('evergreen_token'));
			$http.post('/api/processes/set', data, {
				headers: {'authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		}
	}
})
