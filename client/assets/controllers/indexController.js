app.controller('indexController', function ($scope, $location, $routeParams, $cookies, usersFactory, postsFactory) {
	$scope.username = $cookies.get('username');

	$scope.logout = function() {
		$cookies.remove('username');
	}
});