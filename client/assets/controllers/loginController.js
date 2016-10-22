app.controller('loginController', function ($scope, $location, usersFactory) {
	// usersFactory.index(function(friends) {
	// 	$scope.friends = friends;
	// });

	$scope.login = function() {
		usersFactory.login($scope.user, function() {
			$location.url('/');
		});
	}
	$scope.register = function() {
		usersFactory.create($scope.new_user, function() {
			$location.url('/');
		});
	}
	$scope.create = function() {
		usersFactory.create($scope.new_user, function() {
			$location.url('/');
		});
	}
})