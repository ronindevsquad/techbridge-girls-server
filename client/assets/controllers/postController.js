app.controller('postController', function ($scope, $route, $location, $routeParams, $cookies, $http, usersFactory, postsFactory) {
	$scope.username = $cookies.get('username');

	// Get post and items:
	$scope.items = [];
	postsFactory.show($routeParams.id, function(data) {
		if (data.errors || !data.image)
			$location.url('/');
		else {
			$scope.post = data;
			for (var i = 0; i < data.links.length; i++) {
				var link = data.links[i];
				var id = data.links[i].split('/').slice(-1)[0].split('?')[0];
				$http.get(`https://api.shopstyle.com/api/v2/products/${id}?pid=uid2900-36524230-6`)
				.then(function(res) {
					if (!res.data.errorCode) {
						$scope.items.push({
							url: data.links[$scope.items.length],
							// url: link,
							name: res.data.unbrandedName,
							brand: res.data.brand.name,
							price: res.data.priceLabel,
							image: res.data.image.sizes.Large.url
						});
					}
					console.log($scope.items)
				});
			}
		}
	});

	$scope.toggleFavorite = function(id){
		usersFactory.toggleFavorite(id, function(data){
			
		});
	}
	$scope.update = function() {
		console.log('here')
		$scope.post.links.push($scope.link);
		postsFactory.update($scope.post, function(data) {
			$route.reload()
		});
	}
	$scope.remove_link = function(index) {
		$scope.post.links.splice(index, 1);
		$scope.items.splice(index,1);
		postsFactory.update($scope.post, function(data) {
			// $scope.post = data;
		});
	}

	$scope.toggleFavorite = function(id){
	usersFactory.toggleFavorite(id, function(){
		//no callback needed if you add a favorite.
	});
	}

	$scope.remove_post = function() {
		postsFactory.delete($scope.post._id, function(data) {
			// console.log('Data is:', data)
			$location.url('/')
		});
	}
	$scope.logout = function() {
		$cookies.remove('token');
		$cookies.remove('username');
	}
});
