app.controller('favoriteController',function($scope, $location, $routeParams, $cookies, usersFactory, postsFactory){
  $scope.username = $cookies.get('username');
  $scope.page = "favorites";

  $scope.post = function(){
    postsFactory.create($scope.post.image, function(data){
      $location.url(`/post/${data._id}`)
    });
  }
});
