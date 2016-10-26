app.controller('profileController', function ($scope, $location, $routeParams, $cookies, postsFactory) {
	//STYLING SETTING FOR PAGE CHANGE
	$('body').css('background-color', 'white');
	$('body').css('background-image', "none");
	//
	$scope.page = "profile"
	$scope.username = $cookies.get('username');
	$scope.logout = function() {
		$cookies.remove('username');
	}
	}
});
