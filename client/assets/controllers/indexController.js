app.controller('indexController', function ($scope, $location) {
	if (payload) {
		if ($scope.type == 0)
			$location.url('/account-maker-dashboard');
		else if ($scope.type == 1)
			$location.url('/account-supplier-dashboard');
	}
});