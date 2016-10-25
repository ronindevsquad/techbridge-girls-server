app.controller('postController', function ($scope, $location, $routeParams, $cookies, postsFactory) {
	$scope.username = $cookies.get('username');

	$scope.logout = function() {
		$cookies.remove('username');
	}
	$scope.create = function() {
		postsFactory.create($scope.post, function(data) {

		});
	}
})