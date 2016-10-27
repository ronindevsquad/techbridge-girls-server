app.controller('favoriteController',function($scope, $location, $routeParams, $cookies, usersFactory){
  $scope.username = $cookies.get('username');
});
