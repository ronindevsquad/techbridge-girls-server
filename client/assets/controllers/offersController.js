app.controller('offersController', function ($scope, $location, proposalsFactory, offersFactory) {
	if (payload && $scope.type == 1) {
		proposalsFactory.getMyApplications(function(data) {
			$scope.proposals = data;
			$scope.id_to_delete;
		});
	}
	else
		$location.url('/');

	//////////////////////////////////////////////////////
	//										HELPER FUNCTIONS
	//////////////////////////////////////////////////////

	//////////////////////////////////////////////////////
	//										PROPOSAL
	//////////////////////////////////////////////////////
	$scope.set = function(proposal) {
		$scope.id_to_delete = proposal.id;
	}

});
