app.controller('proposalsController', function ($scope, $location, proposalsFactory, offersFactory) {
	if (payload) {
		$scope.tab = "proposals";
		//Get proposals that you've created
		proposalsFactory.getMyProposals(function(data) {
			console.log(data);
			$scope.proposals = data
		});
	}
	else
	$location.url('/');


	$scope.getOffers = function(proposal){
		if ($scope.proposalView == proposal){
			$scope.proposalView = undefined;
		}
		else
		offersFactory.index(proposal.id, function(data){
			console.log(data);
			$scope.proposalView = proposal;
			if(data.length>1){
				$scope.offers = data;
				$scope.offerView = $scope.offers[0];
				$scope.offerView.PPU = (parseFloat($scope.offerView.total)/parseFloat($scope.proposalView.quantity)).toFixed(2);
				refreshChart()
			}
		});
	};

	$scope.getOffer = function(offer){
		$scope.offerView = offer;
		$scope.offerView.PPU = (parseFloat($scope.offerView.total)/parseFloat($scope.proposalView.quantity)).toFixed(2);
		refreshChart()
	};

	function refreshChart(){
		console.log("The chart is being refreshed");
		try{
			chartObject.dataset = $scope.offers
			console.log("THESE ARE THE OFFERS BEING INSERTED INTO THE CHART OBJECT");
			console.log($scope.offers);
			chartObject.firstNBars = [$scope.offerView]
			chartObject.customColorsForFirstNBars = ['orange','green']
			chartObject.drawChart();
		}
		catch(err){
			console.log(err);
			setTimeout(refreshChart,250);
		}
	}
})
