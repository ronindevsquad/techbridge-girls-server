app.controller('supplierRegisterController', function ($scope, $location, $routeParams, $cookies, suppliersFactory) {

  $scope.register = function() {
    if(!$scope.company_name | !$scope.contact_person | !$scope.email_address | !$scope.password){
      console.log("The fields cannot be blank.");
    } else{
      var data = {
        company_name: $scope.company_name,
        contact_person: $scope.contact_person,
        email_address: $scope.email_address,
        password: $scope.password
      }
      suppliersFactory.register(data, function(data){
          console.log("Successfully added to Database!");
      });
    }
		// $scope.error = null;
		// if ($scope.new_user.password != $scope.new_user.confirm_password)
		// 	$scope.error = "Passwords do not match."
		// else if ($scope.user_type == 'trucker' && !$scope.extend)
		// 	$scope.extend = true;
		// else if ($scope.user_type == 'trucker' && $scope.extend)
		// 	truckersFactory.register($scope.new_user, function(data) {
		// 		if (data.errors)
		// 			for (key in data.errors) {
		// 				$scope.error = data.errors[key].message;
		// 				break;
		// 			}
		// 		else {
		// 			setPayload();
		// 			setSocket();
		// 			$scope.setUser();
		// 			$scope.step = 2;
		// 		}
		// 	});
		// else if ($scope.user_type == 'user')
		// 	usersFactory.register($scope.new_user, function(data) {
		// 		if (data.errors)
		// 			for (key in data.errors) {
		// 				$scope.error = data.errors[key].message;
		// 				break;
		// 			}
		// 		else {
		// 			setPayload();
		// 			setSocket();
		// 			$scope.setUser();
		// 			$scope.step = 2;
		// 		}
		// 	});
	}




  //Phil's Code
	// function getPayload(token) {
	// 	var base64Url = token.split('.')[1];
	// 	var base64 = base64Url.replace('-', '+').replace('_', '/');
	// 	return JSON.parse(window.atob(base64));
	// }
	//
	// console.log("We are in the controller ");
	// // if ($cookies.get('token')) {
	// // }
	// // else
	// // 	$location.url('/welcome');
	//
	// $scope.logout = function() {
	// 	$cookies.remove('token');
	// 	$location.url('/welcome');
	// }
	//
	// $scope.changeUrlTo = function(url){
	// 	console.log(" /" + url);
	// 	$location.url('/'+url);
	// }
});
