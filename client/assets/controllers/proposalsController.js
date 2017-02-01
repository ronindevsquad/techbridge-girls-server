app.controller('proposalsController', function ($scope, $location, proposalsFactory, offersFactory) {
	if (payload) {
		$scope.tab = "proposals";
		if ($scope.type == 0) {
			//Get proposals that you've created
			proposalsFactory.getMyProposals(function(data) {
				$scope.proposals = data;
				console.log(data);
			});
		} else if ($scope.type == 1) {
			proposalsFactory.getMyApplications(function(data) {
				$scope.proposals = data;
				console.log(data);
			});
		}
	}
	else
		$location.url('/');


	$scope.getOffers = function(proposal){
		if ($scope.proposalView == proposal){
			$scope.proposalView = undefined;
		}
		else
		offersFactory.index(proposal.id, function(data){
			$scope.proposalView = proposal;
			console.log(data);
			if(data.length>=1){
				$scope.offers = data;
				$scope.offerView = $scope.offers[0];
				$scope.offerView.PPU = (parseFloat($scope.offerView.total)/parseFloat($scope.proposalView.quantity)).toFixed(2);
				refreshChart()
			}else{
				$scope.offers = undefined;
				$scope.offerView = undefined;
				$scope.offerView.PPU = undefined;
				refreshChart();
			}
		});
	};

	$scope.getOffer = function(offer){
		$scope.offerView = offer;
		$scope.offerView.PPU = (parseFloat($scope.offerView.total)/parseFloat($scope.proposalView.quantity)).toFixed(2);
		refreshChart();
		$scope.$apply();
	};

	$scope.accept = function() {
		console.log("accepted offer");
		var offer = {
			proposal_id: $scope.offerView.proposal_id,
			user_id: $scope.offerView.user_id
		};
		offersFactory.accept(offer, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				socket.emit("accept", offer);
				$location.url(`/messages#${Date.now()}`)
			}
		});
	}

	function refreshChart(){
		try{
			chartObject.template.width = document.getElementById('chart_div').parentElement.offsetWidth - (2 * document.getElementById('chart_div').parentElement.padding);
			chartObject.dataset = $scope.offers
			chartObject.firstNBars = [$scope.offerView, {company: `EG Estimate For ${$scope.offerView.company}`, total: $scope.offerView.EGcost}]
			chartObject.customColorsForFirstNBars = ['orange','#7AC200']
			chartObject.drawChart();
			$scope.$apply()
		}
		catch(err){
			// console.log(err);
			setTimeout(refreshChart,500);
		}
	}
})
