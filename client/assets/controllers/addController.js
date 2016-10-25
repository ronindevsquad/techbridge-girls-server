app.controller('addController', function ($scope, $location, $routeParams, $cookies, usersFactory, postsFactory) {
	//STYLING SETTING FOR PAGE CHANGE
	$('body').css('background-color', 'white');
	$('body').css('background-image', "none");
	//
	$scope.username = $cookies.get('username');
	$scope.logout = function() {
		$cookies.remove('username');
	}
});
