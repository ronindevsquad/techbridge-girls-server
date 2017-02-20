app.controller("offersController", function ($scope, $location, proposalsFactory, offersFactory) {
	if ($scope.type == 1) {
		$scope.tab = "offers";
		proposalsFactory.getMyApplications(function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				$scope.proposals = data;
			}
		});
	}
	else
		$location.url('/');

	//////////////////////////////////////////////////////
	//										HELPER FUNCTIONS
	//////////////////////////////////////////////////////
	$scope.set = function(proposal) {
		$scope.id_to_delete = proposal.id;
	};

	//////////////////////////////////////////////////////
	//										OFFER
	//////////////////////////////////////////////////////
	$scope.delete = function() {
		offersFactory.delete($scope.id_to_delete, function(data) {
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
	};
});
