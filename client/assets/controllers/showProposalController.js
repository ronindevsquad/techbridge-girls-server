app.controller('showProposalController', function ($scope, $location, $routeParams, $sce, proposalsFactory, offersFactory) {
	if (payload) {
		proposalsFactory.show($routeParams.id, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				console.log(data[0].status)
				if (data[0].status === null)
					$scope.signed = false;
				else if (data[0].status >= 0)
					$scope.signed = true;

				$scope.files = [];
				for(var i = 0; i<data.length;i++){
					if(data[i].type == 1){
						$scope.ndasource = $sce.trustAsResourceUrl(data[i].filename)
					}
					else{
						$scope.files.push(data[i].filename)
					}
				}

				$scope.proposal = data;
				console.log($scope.ndasource);
				console.log($scope.files);
			}
		});
	}
	else
		$location.url('/');

	$scope.send = function() {
		if (!$scope.signed) {
			$("#ndaWindow").modal("show");
		}
		else
			$location.url(`offer/${$routeParams.id}`)
	}

	$scope.create = function() {
		offersFactory.create({proposal_id: $routeParams.id}, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else 
				$location.url(`/proposal/${$routeParams.id}#${Date.now()}`);
		});
	}
})
