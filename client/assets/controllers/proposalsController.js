app.controller('proposalsController', function ($scope, $location, proposalsFactory, offersFactory) {
	if (payload) {
		$scope.tab = "proposals";
		if ($scope.type == 0) {
			//Get proposals that you've created
			proposalsFactory.index(function(data){
				$scope.proposals = data
			});
		}
		else if ($scope.type == 1) {
			//Get proposals you've applied to
			proposalsFactory.index(function(data){
				$scope.proposals = data
			});
		}
	}
	else
		$location.url('/');


		$scope.getOffers = function(id){
			if ($scope.proposalView == id)
				$scope.proposalView = undefined;
			else
				offersFactory.index(id, function(data){
					$scope.offers = data;
					$scope.proposalView = id;
				});
		};
})
