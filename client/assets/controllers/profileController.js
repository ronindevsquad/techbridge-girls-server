app.controller('profileController', function ($scope, $location, $routeParams, $cookies, usersFactory, postsFactory) {
	$scope.page = "profile";
	$scope.username = $cookies.get('username');
	var index = function(){
		usersFactory.show($scope.username,function(data){
			$scope.posts = data.posts;
			console.log($scope.posts);
		});
	};
	index();
	if (!$scope.username){
		$location.url('/');
	}

	$scope.post = function(){
		postsFactory.create($scope.post.image, function(data){
			$location.url(`/post/${data._id}`)
		});
	}

	$scope.remove_post = function(index) {
		postsFactory.delete($scope.posts[index]._id, function(data) {
			console.log('Data is:', data)
			$location.url('/')
		});
	}
	$scope.logout = function() {
		$cookies.remove('token');
		$cookies.remove('username');
	}
});
