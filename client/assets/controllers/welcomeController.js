app.controller('welcomeController', function ($scope, $location, $routeParams, $cookies) {
	if ($cookies.get('token'))
		$location.url('/');
});
