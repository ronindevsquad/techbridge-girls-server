app.controller('indexController', function ($scope, $location, $routeParams, $cookies, usersFactory, postsFactory) {
	$scope.username = $cookies.get('username');

	$scope.logout = function() {
		$cookies.remove('username');
	}
	$scope.create = function() {
		postsFactory.create($scope.post, function(data) {
			$location.url(`/post/${data._id}`)
		});
	}

	$scope.post = function(){
		console.log($scope.post.image + "");
		postsFactory.create($scope.post.image, function(input){
			console.log(input);
		});
	};
});
