app.controller('logoutController', function ($scope, $location) {
	if (payload)	
		$scope.logout(true);
	else
		$location.url("/")
});