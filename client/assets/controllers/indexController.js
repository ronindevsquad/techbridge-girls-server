app.controller('indexController', function ($scope, $location, $routeParams, $cookies, usersFactory, postsFactory) {
	//STYLING SETTING FOR PAGE CHANGE
	$('body').css('background-color', 'white');
	//
	$scope.username = $cookies.get('username');
	$scope.logout = function() {
		$cookies.remove('username');
	}
});
