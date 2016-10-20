app.controller('editController', function ($scope, $location, $routeParams, friendsFactory) {
	friendsFactory.show($routeParams.id, function(friend) {
		console.log("type is:", typeof(friend.birthday))
		friend.birthday = new Date(friend.birthday)
		$scope.friend = friend;
		console.log('here')
	});

	$scope.update = function() {
		friendsFactory.update($scope.friend, function() {
			$location.url(`/show/${$scope.friend._id}`);
		});
	};
})