app.controller('profileController', function ($scope, $location, $routeParams, usersFactory) {
	if (payload) {
		$scope.tab = "profile";
		$scope.company = payload.company; //used to determine whether some elements should be hidden or displayed.
		if($routeParams.id){ //if there are parameters in the url then use them to query for the backend.
			$scope.viewingOtherProfile = true;
			$scope.profilerequest = $routeParams.id
		}else {
			$scope.profilerequest = payload.id
		}
		if ($scope.type == 0) {

		}
		else if ($scope.type == 1) {

		}
	}
	else
		$location.url('/');
	usersFactory.show($scope.profilerequest, function(data){ //we could be viewing our own profile or another company's
		if(data.error){
			console.log(error);
		}else {
			$scope.user = data
			if($scope.viewingOtherProfile){
				$scope.companyprofile = data.company
			}
			console.log(data);
		}
	});
});
