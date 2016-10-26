app.controller('profileController', function ($scope, $location, $routeParams, $cookies, usersFactory, postsFactory) {
	$scope.page = "profile";
	$scope.username = $cookies.get('username');
	if (!$scope.username)
		$location.url('/');

	usersFactory.show($scope.username, function(data) {
		$scope.posts = data.posts;
		$scope.favorites = data.favorites;
	});

	$scope.remove_post = function(index) {
		postsFactory.delete($scope.posts[index]._id, function(data) {
			console.log('Data is:', data)
			$location.url('/')
		});		
	}
	$scope.logout = function() {
		$cookies.remove('token');
		$cookies.remove('username');
	}
});
