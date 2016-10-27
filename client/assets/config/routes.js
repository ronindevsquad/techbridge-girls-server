var app = angular.module('app', ['ngRoute', 'ngMessages', 'ngCookies']);
app.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'partials/index.html',
		controller: 'indexController'
	})
	.when('/login',{
		templateUrl: 'partials/login.html',
		controller: 'loginController'
	})
	.when('/register',{
		templateUrl: 'partials/register.html',
		controller: 'loginController'
	})
	.when('/profile/:user',{
		templateUrl: 'partials/profile.html',
		controller: 'profileController'
	})
	.when('/favorites',{
		templateUrl: 'partials/profile.html',
		controller: 'favoriteController'
	})
	.when('/user/:username',{
		templateUrl: 'partials/user.html',
		controller: 'userController'
	})
	.when('/post/:id',{
		templateUrl: 'partials/post.html',
		controller: 'postController'
	})
	.otherwise({
		redirectTo: '/'
	});
});
