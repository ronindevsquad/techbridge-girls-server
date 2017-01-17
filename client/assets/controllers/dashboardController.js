app.controller('dashboardController', function ($scope, $location, offersFactory) {
	if (payload) {
		offersFactory.getAcceptedOffers(function(data) {
			if (data.status == 401)
				$location.url("/logout");
			else if (data.status >= 300)
				console.log(data);
			else {
			}
		})
	}
	else
		$location.url('/');
});
