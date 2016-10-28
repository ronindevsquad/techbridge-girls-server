app.controller('postController', function ($scope, $route, $location, $routeParams, $cookies, $http, postsFactory) {
	$scope.username = $cookies.get('username');
	if (!$scope.username)
		$location.url('/');

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
				$http.get(`http://api.shopstyle.com/api/v2/products/${id}?pid=uid2900-36524230-6`)
				.then(function(res) {
					if (!res.data.errorCode) {
						$scope.items.push({
							// url: data.links[i],
							url: link,
							name: res.data.unbrandedName,
							brand: res.data.brand.name,
							price: res.data.priceLabel,
							image: res.data.image.sizes.Large.url
						});
					}
				})
			}
		}
	});

	$scope.update = function() {
		$scope.post.links.push($scope.link);
		console.log("After push:"+$scope.post.links);
		postsFactory.update($scope.post, function(data) {
			// $scope.items.push(data[0].links[-1]);
			$route.reload()
			console.log('Updated new link:', data)
		});
	}

	$scope.remove_link = function(index) {
		console.log("removing link");
		$scope.post.links.splice(index, 1);
		$scope.items.splice(index,1);
		postsFactory.update($scope.post, function(data) {
			// $scope.post = data;
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
