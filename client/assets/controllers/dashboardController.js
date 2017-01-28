app.controller('dashboardController', function ($scope, $location, offersFactory) {
	if (payload) {
		$scope.tab = "dashboard";
		offersFactory.getAcceptedOffers(function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log(data);
			else {
			}
		})
	}
	else
		$location.url('/');
	chartObject.template.width = document.getElementById('chart_div').parentElement.offsetWidth - (2 * document.getElementById('chart_div').parentElement.padding);
	chartObject.drawChart();
});
