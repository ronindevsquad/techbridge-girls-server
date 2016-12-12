app.controller('indexController', function ($scope, $location, $routeParams, $cookies) {
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
