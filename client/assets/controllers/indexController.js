app.controller('indexController', function ($scope, $rootScope, $location, usersFactory) {
	if (payload) {
		if ($scope.type == 0)
			$location.url('/dashboard');
		else if ($scope.type == 1)
			$location.url('/open-proposals');
	}
	// else if (IN.User.isAuthorized()){
	// 	IN.User.logout(function(){});
	// }

	$scope.login = function() {
		$scope.error = null;
		usersFactory.login($scope.user, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				$scope.error = data.data.message;
			else {
				$scope.setUser();
				if ($scope.type == 0)
					$location.url('/dashboard');
				else if ($scope.type == 1)
					$location.url('/open-proposals');
			}
		});
	}

	$scope.LoginLinkedIn = function(new_user){
		IN.User.authorize(function(){
			IN.API.Raw('/people/~:(email-address)?format=json').result(function(login){
				usersFactory.loginLinkedIn({'email':login.emailAddress}, function(data) {
					if (data.status == 401)
						$scope.logout();
					else if (data.status >= 300)
						$scope.error = data.data.message;
					else {
						$scope.setUser();
						if ($scope.type == 0)
							$location.url('/dashboard');
						else if ($scope.type == 1)
							$location.url('/open-proposals');
					}
				});
			});
		});
	};

	$scope.register = function(type) {
		$rootScope.type = type;
		$rootScope.color = type == 0 ? "orange" : "green";
		$location.url("/register");
	}
});
