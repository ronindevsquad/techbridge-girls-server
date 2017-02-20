app.controller('proposalsController', function ($scope, $location, $interval,
proposalsFactory, offersFactory, chartsFactory) {
	if ($scope.type == 0) {
		$scope.tab = "proposals";
		proposalsFactory.getMyProposals(function(data) {
			$scope.proposals = data;
		});
	}
	else
		$location.url('/');

	var chart = chartsFactory.chart;

	//////////////////////////////////////////////////////
	//										HELPER FUNCTIONS
	//////////////////////////////////////////////////////
	var chart;

	function initializeChart() {
		if (angular.isDefined(chart))
			$interval.cancel(chart);

		chart = chartsFactory.getChart();
		$scope.is_loaded = true;
	};

	// Make sure chart is loaded:
	if (!chartsFactory.getChart()) {
		chart = $interval(function() {
			if (chartsFactory.getChart())
				initializeChart();
		}, 100);
	}
	else
		initializeChart();

	$scope.leadViewAssign = function(lead) {
		$scope.leadView = lead;
	};

	function refreshChart() {
		try {
			chart.template.metric = "total"
			chart.template.charttitle = "Comparing Offers By Total Cost"
			chart.template.width = document.getElementById('chart_div').parentElement.offsetWidth -
			(2 * document.getElementById('chart_div').parentElement.padding);
			chart.dataset = $scope.offers
			chart.firstNBars = [$scope.EGcost, $scope.offerView]
			chart.customColorsForFirstNBars = ['#7AC200','orange']
			chart.drawChart();
			$scope.$apply()
		}
		catch(err) {
			setTimeout(refreshChart,500);
		}
	};

	$scope.set = function(proposal) {
		$scope.id_to_delete = proposal.id;
	}

	//////////////////////////////////////////////////////
	//										PROPOSAL
	//////////////////////////////////////////////////////
	$scope.delete = function() {
		if ($scope.id_to_delete) {
			proposalsFactory.delete($scope.id_to_delete, function(data) {
				if (data.status == 401)
					$scope.logout();
				else if (data.status >= 300)
					console.log("error:", data.data.message)
				else {
					$scope.proposals.splice($scope.proposals.findIndex(function(proposal) {
						if (proposal.id == $scope.id_to_delete)
							return true;
					}), 1);
				}
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
				if (data.status == 401)
					$scope.logout();
				else if (data.status >= 300)
					console.log("error:", data.data.message)
				else {
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
				$location.url("/messages");
			}
		});
	};

	$scope.removeLead = function(lead) {
		offersFactory.removeLead(lead, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else if (data.length > 0) {
				$scope.leads = data;
				$scope.leadView = data[0];
			} else {
				$scope.leads = null;
				$scope.leadView = null;
			}
		});
	};

});
