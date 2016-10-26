app.controller('profileController', function ($scope, $location, $routeParams, $cookies, usersFactory) {
	$scope.page = "profile";
	$scope.username = $cookies.get('username');
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
