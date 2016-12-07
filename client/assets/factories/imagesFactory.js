app.factory('imagesFactory', function($http, $cookies) {
	return {
		create: function(data, callback) {
			$http.post('/api/images', data, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		},
		delete: function(id, callback) {
			$http.delete(`/api/images/${id}`, {
				headers: {'authorization': `Bearer ${$cookies.get('token')}`}
			}).then(function(res) {
				callback(res.data);
			});
		}
	}
})
