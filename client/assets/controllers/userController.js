app.controller('userController', function ($scope, $location, $routeParams, $cookies, postsFactory) {
	$scope.username = $cookies.get('username');

	$scope.logout = function() {
		$cookies.remove('username');
	}
})