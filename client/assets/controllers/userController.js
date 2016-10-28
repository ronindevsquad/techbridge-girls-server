app.controller('userController', function ($scope, $location, $routeParams, $cookies, usersFactory) {
	$scope.page;
	$scope.username = $routeParams.username;
	if (!$scope.username)
		$location.url('/');

	usersFactory.show($scope.username, function(data) {
		$scope.posts = data.posts;
		$scope.favorites = data.favorites;
	});

	$scope.logout = function() {
		$cookies.remove('token');
		$cookies.remove('username');
	}
});
