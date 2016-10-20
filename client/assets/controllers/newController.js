app.controller('newController', function ($scope, $location, friendsFactory) {
	friendsFactory.index(function(friends) {
		$scope.friends = friends;
	});

	$scope.create = function() {
		friendsFactory.create($scope.friend, function() {
			$location.url('/');
		});
	};
	$scope.delete = function(id) {
		friendsFactory.delete(id);
	}
})