app.controller('trackingController', function ($scope, $location, offersFactory, reportsFactory) {
	console.log("Inside Tracking Controller");
	if (payload && $scope.type == 0) {

	}
	else if (payload && $scope.type == 1) {

	}
	else
		$location.url('/');
// When the document loads, retrieve the offers (that have been accepted) and reports associated with the id logged in
	offersFactory.index(function(data){
		if (data.errors){
			console.log(data.errors);
		} else{
			$scope.offers = data.offers
		}
	});
});
