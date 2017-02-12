app.controller('proposalsController', function ($scope, $location, proposalsFactory, offersFactory) {
	if (payload) {
		$scope.tab = "proposals";
		if ($scope.type == 0) {
			//Get proposals that you've created
			proposalsFactory.getMyProposals(function(data) {
				$scope.proposals = data;
			});
		} else if ($scope.type == 1) {
			proposalsFactory.getMyApplications(function(data) {
				$scope.proposals = data;
				$scope.id_to_delete;
			});
		}
	}
	else
		$location.url('/');

	//////////////////////////////////////////////////////
	//										HELPER FUNCTIONS
	//////////////////////////////////////////////////////
	$scope.leadViewAssign = function(lead) {
		$scope.leadView = lead;
	};

	function refreshChart() {
		try{
			chartObject.template.metric = "total"
			chartObject.template.charttitle = "Comparing Offers By Total Cost"
			chartObject.template.width = document.getElementById('chart_div').parentElement.offsetWidth - (2 * document.getElementById('chart_div').parentElement.padding);
			chartObject.dataset = $scope.offers
			chartObject.firstNBars = [$scope.EGcost, $scope.offerView]
			chartObject.customColorsForFirstNBars = ['#7AC200','orange']
			chartObject.drawChart();
			$scope.$apply()
		}
		catch(err) {
			setTimeout(refreshChart,500);
		}
	};

	//////////////////////////////////////////////////////
	//										PROPOSAL
	//////////////////////////////////////////////////////
	$scope.set = function(proposal) {
		$scope.id_to_delete = proposal.id;
	}

	$scope.delete = function() {
		if ($scope.id_to_delete) {
			proposalsFactory.delete($scope.id_to_delete, function(data) {
				if (data.status == 401)
					$scope.logout();
				else if (data.status >= 300)
					console.log("error:", data.data.message)
				else
					$location.url(`/proposals#${Date.now()}`);
			});
		}
	};

	//////////////////////////////////////////////////////
	//										OFFER
	//////////////////////////////////////////////////////
	$scope.getOffers = function(proposal) {
		$scope.proposalTab = 0;
		if ($scope.proposalView == proposal) {
			$scope.proposalView = undefined;
		}
		else {
			offersFactory.index(proposal.id, function(data) {
				console.log(data);
				$scope.proposalView = proposal;

				if(data.leads.length >= 1) {
					$scope.leads = data.leads;
					$scope.leadView = data.leads[0]
				} else {
					$scope.leads = undefined;
					$scope.leadView = undefined;
				}

				if(data.applications.length>1) {
					$scope.EGcost = data.applications.pop();
					$scope.offers = data.applications;
					$scope.offerView = $scope.offers[0];
					$scope.offerView.PPU = (parseFloat($scope.offerView.total)/parseFloat($scope.proposalView.quantity)).toFixed(2);
					refreshChart()
				} else {
					$scope.offers = undefined;
					$scope.offerView = undefined;
					// refreshChart();
				}
			});
		}
	};

	$scope.getOffer = function(offer) {
		$scope.offerView = offer;
		$scope.offerView.PPU = (parseFloat($scope.offerView.total)/parseFloat($scope.proposalView.quantity)).toFixed(2);
		refreshChart();
		$scope.$apply();
	};

	$scope.accept = function() {
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
	};

	$scope.removeLead = function(lead) {
		offersFactory.removeLead(lead, function(data) {
			if (data.length > 0) {
				$scope.leads = data;
				$scope.leadView = data[0];
			} else {
				$scope.leads = null;
				$scope.leadView = null;
			}
		});
	};

});
