app.controller('indexController', function ($scope, $location, $routeParams, $cookies, postsFactory, usersFactory) {
	function getPayload(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}
	$scope.name = "asdsa"
	if ($cookies.get('token')) {
		var payload = getPayload($cookies.get('token'));
		$scope.name = payload.first_name + " " + payload.last_name;
	console.log($scope.name)
	}

	var index = function(){
		postsFactory.index(function(data){
			$scope.posts = data;
		});
	};
	index();

	$scope.toggleFavorite = function(id){
		usersFactory.toggleFavorite(id, function(data){
			//no callback needed if you add a favorite.
		});
	}
	$scope.post = function(){
		$scope.image_error = null;
		postsFactory.create($scope.post_image, function(data){
			if (data.errors)
				for (key in data.errors) {
					$scope.image_error = data.errors[key].message;
					break;
				}
			else
			$location.url(`/post/${data.id}`)
		});
	}
	$scope.logout = function() {
		$cookies.remove('token');
	}
});
