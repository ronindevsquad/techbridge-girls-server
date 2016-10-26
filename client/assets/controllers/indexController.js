app.controller('indexController', function ($scope, $location, $routeParams, $cookies, postsFactory) {
	$scope.username = $cookies.get('username');

	// $scope.create = function() {
	// 	postsFactory.create($scope.post, function(data) {
	// 		$location.url(`/post/${data._id}`)
	// 	});
	// }
	$scope.post = function(){
		postsFactory.create($scope.post.image, function(data){
			$location.url(`/post/${data._id}`)
		});
	}
	$scope.logout = function() {
		$cookies.remove('token');
		$cookies.remove('username');
	}
});
