var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/',{                                         //Index
		templateUrl: 'partials/index.html',
		controller: 'indexController'
	})
	//////////////////////////////////////////////////////
	//										LOGIN/REGISTER
	//////////////////////////////////////////////////////	
	.when('/join-maker',{
		templateUrl: 'partials/maker/join-maker.html',
		controller: 'registerController'
	})
	.when('/join-supplier',{
		templateUrl: 'partials/supplier/join-supplier.html',
		controller: 'registerController'
	})	
	.when('/login',{
		templateUrl: 'partials/login.html',
		controller: 'loginController'
	})
	.when('/success-maker',{
		templateUrl: 'partials/maker/success-maker.html',
		controller: 'indexController'
	})
	.when('/success-supplier',{
		templateUrl: 'partials/supplier/success-supplier.html',
		controller: 'indexController'
	})
	.when('/recover',{
		templateUrl: 'partials/recover.html',
		controller: 'indexController'
	})
	//////////////////////////////////////////////////////
	//										MAKER
	//////////////////////////////////////////////////////
	.when('/account-maker-dashboard',{
		templateUrl: 'partials/maker/account-maker-dashboard.html',
		controller: 'indexController'
	})
	.when('/account-maker-messaging',{
		templateUrl: 'partials/maker/account-maker-messaging.html',
		controller: 'indexController'
	})
	.when('/account-maker-profile',{
		templateUrl: 'partials/maker/account-maker-profile.html',
		controller: 'indexController'
	})
	.when('/account-maker-proposals',{
		templateUrl: 'partials/maker/account-maker-proposals.html',
		controller: 'indexController'
	})
	.when('/account-maker-tracking',{
		templateUrl: 'partials/maker/account-maker-tracking.html',
		controller: 'indexController'
	})
	//////////////////////////////////////////////////////
	//										SUPPLIER
	//////////////////////////////////////////////////////
	.when('/account-supplier-dashboard',{
		templateUrl: 'partials/supplier/account-supplier-dashboard.html',
		controller: 'indexController'
	})
	.when('/account-supplier-messaging',{
		templateUrl: 'partials/supplier/account-supplier-messaging.html',
		controller: 'indexController'
	})
	.when('/account-supplier-profile',{
		templateUrl: 'partials/supplier/account-supplier-profile.html',
		controller: 'indexController'
	})
	.when('/account-supplier-proposals',{
		templateUrl: 'partials/supplier/account-supplier-proposals.html',
		controller: 'indexController'
	})
	.when('/account-supplier-tracking',{
		templateUrl: 'partials/supplier/account-supplier-tracking.html',
		controller: 'indexController'
	})
	//////////////////////////////////////////////////////
	//										COMMON
	//////////////////////////////////////////////////////	
	.when('/add-request',{
		templateUrl: 'partials/add-request.html',
		controller: 'indexController'
	})
	.when('/category-selector',{
		templateUrl: 'partials/category-selector.html',
		controller: 'indexController'
	})
	.when('/opened-proposals',{
		templateUrl: 'partials/opened-proposals.html',
		controller: 'indexController'
	})
	.when('/proposal-details-signed-nda',{
		templateUrl: 'partials/proposal-details-signed-nda.html',
		controller: 'indexController'
	})
	.when('/proposal-details',{
		templateUrl: 'partials/proposal-details.html',
		controller: 'indexController'
	})
	.when('/sending-offer-details',{
		templateUrl: 'partials/sending-offer-details.html',
		controller: 'indexController'
	})
	.when('/sending-offer',{
		templateUrl: 'partials/sending-offer.html',
		controller: 'indexController'
	})
	.otherwise({
		redirectTo: '/'
	});
	$locationProvider.html5Mode(true);
});
