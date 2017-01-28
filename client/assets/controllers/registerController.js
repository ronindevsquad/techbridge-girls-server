app.controller("registerController", function ($scope, $location, $routeParams, usersFactory) {
	if (payload || $scope.type === undefined)
		$location.url("/");


	$scope.new_user = {};
	$scope.register = function() {
		$scope.new_user.type = $scope.type;
		$scope.error = null;
		if (IN.User.isAuthorized())
			return registerLinkedIn($scope.new_user);
		if ($scope.new_user.password != $scope.new_user.confirm_password)
			$scope.error = "Passwords do not match."
		else
			usersFactory.register($scope.new_user, function(data) {
				if (data.status == 401)
					$scope.logout();
				else if (data.status >= 300)
					$scope.error = data.data.message;
				else
					$location.url('/success');
			});
	};

	function registerLinkedIn(new_user){
		usersFactory.registerLinkedIn($scope.new_user, function(data){
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				$scope.error = data.data.message;
			else
				$location.url('/success');
		});
	};

	$scope.isAuthorized = function(){
		if(IN.User.isAuthorized())
			return true;
		else
			return false;
	};

	$scope.linkedInLogin = function(){
		if (IN.User.isAuthorized()) {
	    IN.API.Raw('/people/~:(id,first-name,last-name,email-address)?format=json').result(function(data){
				$scope.new_user.contact = `${data.firstName} ${data.lastName}`;
				$scope.new_user.email = data.emailAddress;
	    });
	  } else {
	    IN.User.authorize(function(){
				IN.API.Raw('/people/~:(id,first-name,last-name,email-address)?format=json').result(function(data){
		      $scope.new_user.contact = `${data.firstName} ${data.lastName}`;
					$scope.new_user.email = data.emailAddress;
					$scope.$apply();
		    });
	    });
	  }
	}
});
