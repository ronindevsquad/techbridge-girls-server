app.controller('categorySelectorController', function ($scope, $location, $routeParams, $cookies, suppliersFactory) {
  console.log("categorySelectorController");
  $scope.processesList = [] //This will be sent to the server
  //When a category is selected, it needs to be added or removed from the processesList
  $scope.toggleProcess = function(processName){
    var indexToRemove = $scope.processesList.indexOf(processName) //returns -1 if the value does not exist
    if (indexToRemove != -1){
      console.log('removed process');
      $scope.processesList.splice(indexToRemove,1)
    } else{
      console.log('added process');
      $scope.processesList.push(processName)
    }
    console.log($scope.processesList)
  }
  //Continue Button sends the categories to the server to update the record for the suppliers
  $scope.sendProcessesToServer = function(){
    // suppliersFactory.createProcesses({processesList:$scope.processesList}, function(res){
    //   if(!res.errors){
    //
    //   }
    // })
    $location.url('opened-proposals')
  }
});
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
