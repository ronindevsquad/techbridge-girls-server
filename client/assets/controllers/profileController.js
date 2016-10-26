app.controller('profileController', function ($scope, $location, $routeParams, $cookies, postsFactory) {
	$scope.page = "profile"
	$scope.username = $cookies.get('username');

	$scope.logout = function() {
		$cookies.remove('username');
	}
});
