app.controller('dashboardController', function ($scope, $location, offersFactory) {
	chartObject.dataset = null
	if (payload) {
		$scope.tab = "dashboard";
		if($scope.type == 0){
			console.log("type 0");
		}else{
			console.log("type 1");
		}

		offersFactory.getAcceptedOffers(function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log(data);
			else {
			}
		})
	}else
		$location.url('/');
	chartObject.template.width = document.getElementById('chart_div').parentElement.offsetWidth - (2 * document.getElementById('chart_div').parentElement.padding);
	chartObject.drawChart();
});
