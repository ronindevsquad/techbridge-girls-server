app.controller('favoriteController', function ($scope, $location, $routeParams, $cookies, postsFactory) {
	$scope.page = "favorites"
	$scope.username = $cookies.get('username');
	$scope.logout = function() {
		$cookies.remove('username');
	}
});
