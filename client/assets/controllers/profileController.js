app.controller('profileController', function ($scope, $location, $routeParams, $rootScope, usersFactory, urlsFactory) {
	$scope.editingURLS = false;
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
	else{
		$location.url('/');
	}

	$scope.requestProfile = function(){
		usersFactory.show($scope.profilerequest, function(data){ //we could be viewing our own profile or another company's
		if(data.error){
			console.log(error);
		}else {
			$scope.user = data
			if($scope.viewingOtherProfile){
				$scope.companyprofile = data.company
			}
		}
	});
} //this function is invoked when the controller loads.


$scope.switchEditingURLS = function(){
	$scope.editingURLS? $scope.editingURLS=false:$scope.editingURLS=true
}
$scope.updateURLS = function(){
	if(true){
		urlsFactory.create($scope.user, function(data){
			$scope.switchEditingURLS()
			$scope.requestProfile()
		});
	}else {
		$scope.switchEditingURLS()
	}
}

$scope.uploadPicture = function(){
	var request = new XMLHttpRequest();
	request.open("POST", "/uploadPicture");
	request.onload = function() {
		console.log("response:", this.response)
		console.log("responseText:", this.responseText)
		var response = JSON.parse(this.response);
		$rootScope.picture = response
		$scope.$apply();
		// if (!response.message) {
		// 	$scope.proposal.files = responseText;
		// 	$scope.$apply();
		// 	$scope.create();
		// } else {
		// 	console.log(response.message);
		// }
	}
	var formData = new FormData(); //use FormData object to post picture with AJAX
	formData.append("picture", document.getElementById('picture').files[0])
	request.send(formData);
}

//EXECUTE WHEN PAGE loads
$scope.requestProfile()
console.log($scope.picture);
});
