app.controller('indexController', function ($scope, $location, $routeParams, $cookies, postsFactory, usersFactory) {
	$scope.username = $cookies.get('username');

	var index = function(){
		postsFactory.index(function(data){
			$scope.posts = data;
		});
	};
	index();

	$scope.toggleFavorite = function(id){
		usersFactory.toggleFavorite(id, function(){
			//no callback needed if you add a favorite.
		});
	}
	$scope.post = function(){
		postsFactory.create($scope.post_image, function(data){
			$location.url(`/post/${data._id}`)
		});
	}
	$scope.logout = function() {
		$cookies.remove('token');
		$cookies.remove('username');
	}
});
