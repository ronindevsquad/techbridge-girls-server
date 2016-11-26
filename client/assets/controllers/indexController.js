app.controller('indexController', function ($scope, $location, $routeParams, $cookies, postsFactory, usersFactory) {
	$scope.username = $cookies.get('username');

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
		$cookies.remove('username');
	}
});
