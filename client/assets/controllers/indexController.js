app.controller('indexController', function ($scope, $location, $routeParams, usersFactory, postsFactory) {
	postsFactory.index(function(posts) {
		$scope.posts = posts;
	});

	postsFactory.show($routeParams.id, function(friend) {
		console.log("type is:", typeof(friend.birthday))
		friend.birthday = new Date(friend.birthday)
		$scope.friend = friend;
		console.log('here')
	});

	$scope.update = function() {
		postsFactory.update($scope.friend, function() {
			$location.url(`/show/${$scope.friend._id}`);
		});
	};
})