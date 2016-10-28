app.controller('userController', function ($scope, $location, $routeParams, $cookies, usersFactory) {
	$scope.page = 'posts';
	$scope.username = $routeParams.username;
	if (!$cookies.get('username'))
		$location.url('/');

	usersFactory.show($scope.username, function(data) {
		$scope.posts = data.posts;
		$scope.favorites = data.favorites;
	});
	$scope.toggle = function() {
		if ($scope.page == 'posts')
				$scope.page = 'favorites';
		else
			$scope.page = 'posts';
	}
	$scope.toggleFavorite = function(id){
		usersFactory.toggleFavorite(id, function(data){
			
		});
	}
	$scope.logout = function() {
		$cookies.remove('token');
		$cookies.remove('username');
	}
});
