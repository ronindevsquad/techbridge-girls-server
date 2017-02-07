app.controller('dashboardController', function ($scope, $location, proposalsFactory, offersFactory) {
	chartObject.dataset = null;
	chartObject.clearChartData();
	if (payload) {
		$scope.tab = "dashboard";
		if($scope.type == 0){ //Makers should get all proposals they have created
			proposalsFactory.getMyProposals(function(data){
				$scope.proposals = data
				console.log(data);
			})
			console.log("type 0");
		}else{ //Suppliers should get all proposals that they have applied to. The information about the owners of other offers will not be available to suppliers.
			proposalsFactory.getMyApplications(function(data){
				console.log(data);
				$scope.proposals = data;
			});
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
	$scope.print = function(proposal){
		console.log(proposal.product);
		console.log(proposal);
		if($scope.type == 0){ //makers can request more protected information than suppliers
			offersFactory.index(proposal.id, function(data){
				console.log(data);
				$scope.offers = data.applications;
				chartObject.dataset = $scope.offers
				chartObject.drawChart()
				// $scope.$apply();
			});
		} else { //suppliers will only be able to see numbers related to other offers.
			offersFactory.getOffersForProposal(proposal.id, function(data){
				console.log(data);
				$scope.offers = data;
				chartObject.dataset = $scope.offers
				chartObject.drawChart()
			});
		}

	}
	chartObject.template.width = document.getElementById('chart_div').parentElement.offsetWidth - (2 * document.getElementById('chart_div').parentElement.padding);
	chartObject.drawChart();
});
