app.controller('indexController', function ($scope, $location) {
	if (payload) {
		if ($scope.user_type == 'maker')
			$location.url('/account-maker-dashboard');
		else if ($scope.user_type == 'supplier')
			$location.url('/account-supplier-dashboard');
	}
});
