app.controller('showProposalController', function ($scope, $location, $route, $routeParams, $sce, proposalsFactory, offersFactory) {
	if ($scope.id) {
		proposalsFactory.show($routeParams.id, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				$location.url("/");
			else {
				if ($scope.type == 1 && !data.offer)
					$scope.signed = false;
				else
					$scope.signed = true;

				$scope.files = [];
				for (var i = 0; i < data.files.length; i++) {
					if (data.files[i].type == 1)
						$scope.ndasource = $sce.trustAsResourceUrl(data.files[i].filename)
					else
						$scope.files.push(data.files[i])
				}
				$scope.offer = data.offer;
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
			$location.url(`create-offer/${$routeParams.id}`)
	}

	$scope.create = function() {
		offersFactory.create({proposal_id: $routeParams.id}, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else{
				$route.reload();
				// $location.url(`/show-proposal/${$routeParams.id}`);
			}
		});
	}
})
