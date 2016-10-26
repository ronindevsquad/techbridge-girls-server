app.controller('postController', function ($scope, $location, $routeParams, $cookies, postsFactory) {
	$scope.username = $cookies.get('username');
	if (!$scope.username)
		$location.url('/');

	// Get post for id:
	postsFactory.show($routeParams.id, function(data) {
		if (data.errors)
			$location.url('/');
		else
			$scope.post = data.post;
	});

	$scope.update = function() {
		console.log("Link:", $scope.link)
		$scope.post.links.push($scope.link);
		postsFactory.update($scope.post, function(data) {
			console.log('Data is:', data)
			$scope.post = data.post;			
		});
	}
	$scope.remove_link = function(index) {
		$scope.post.links.splice(index, 1);
		postsFactory.update($scope.post, function(data) {
			console.log('Data is:', data)
			$scope.post = data.post;			
		});		
	}
	$scope.logout = function() {
		$cookies.remove('token');
		$cookies.remove('username');
	}
});
