app.controller('proposalsController', function ($scope, $location, $interval, $anchorScroll,
proposalsFactory, offersFactory, chartsFactory, selectedProposalFactory) {
	if ($scope.type == 0) {
		$scope.tab = "proposals";
		proposalsFactory.getMyProposals(function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				$scope.proposals = data;
				// $scope.selected_proposal = selectedProposalFactory.get();
				if(selectedProposalFactory.get())
					$scope.getOffers(selectedProposalFactory.get());
			}
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
		var clickedSameProposal = false
		if($scope.selected_proposal){
			if($scope.selected_proposal.id == proposal.id) //we cannot access id if selected proposal does not exist.
				clickedSameProposal = true
		}
		$scope.proposalTab = 0;
		if (clickedSameProposal) {
				$scope.selected_proposal = undefined;
				selectedProposalFactory.set(undefined)
		}
		else {
			offersFactory.index(proposal.id, function(data) {
				if (data.status == 401)
					$scope.logout();
				else if (data.status >= 300)
					console.log("error:", data.data.message)
				else {
					console.log("test");
					$scope.selected_proposal = proposal;
					selectedProposalFactory.set(proposal);

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
						$scope.offerView.PPU = (parseFloat($scope.offerView.total)/parseFloat($scope.selected_proposal.quantity)).toFixed(2);
						refreshChart()
					} else {
						$scope.offers = undefined;
						$scope.offerView = undefined;
					// refreshChart();
				}
				$location.hash(proposal.id)
				$anchorScroll(proposal.id);
			}
			});
		}
	};

	$scope.getOffer = function(offer) {
		$scope.offerView = offer;
		$scope.offerView.PPU = (parseFloat($scope.offerView.total)/parseFloat($scope.selected_proposal.quantity)).toFixed(2);
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
				socketsFactory.emit("accept", offer);
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
