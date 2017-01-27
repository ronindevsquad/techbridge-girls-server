app.controller('proposalController', function ($scope, $location, $routeParams, $sce, proposalsFactory, offersFactory) {
	$scope.files = [];
	if (payload) {
		proposalsFactory.show($routeParams.id, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				console.log(data);
				$scope.signed = false;
				$scope.proposal = data;
				for(var i = 0; i<data.length;i++){
					if(data[i].type == 1){
						$scope.ndasource = $sce.trustAsResourceUrl(data[i].filename)
					}
					else{
						$scope.files.push(data[i].filename)
					}
				}
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
})
