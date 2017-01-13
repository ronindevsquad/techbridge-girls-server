var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/',{                                         //Index
		templateUrl: 'partials/index.html',
		controller: 'indexController'
	})
	.when('/login',{
		templateUrl: 'partials/login.html',
		controller: 'loginController'
	})
	.when('/recover',{
		templateUrl: 'partials/recover.html'
	})
	.when('/add-request',{
		templateUrl: 'partials/add-request.html',
		controller: 'addRequestController'
	})
	.when('/category-selector',{
		templateUrl: 'partials/category-selector.html',
		controller: 'categorySelectorController'
	})
	.when('/opened-proposals',{
		templateUrl: 'partials/opened-proposals.html',
		controller: 'openedProposalsController'
	})
	.when('/proposal-details/:id',{
		templateUrl: 'partials/proposal-details.html',
		controller: 'proposalDetailsController'
	})
	.when('/sending-offer/:id',{
		templateUrl: 'partials/sending-offer.html',
		controller: 'sendingOfferController'
	})
	//////////////////////////////////////////////////////
	//										MAKER
	//////////////////////////////////////////////////////
	.when('/join-maker',{
		templateUrl: 'partials/maker/join-maker.html',
		controller: 'registerController'
	})
	.when('/success-maker',{
		templateUrl: 'partials/maker/success-maker.html'
	})
	.when('/account-maker-dashboard',{
		templateUrl: 'partials/maker/account-maker-dashboard.html',
		controller: 'dashboardController'
	})
	.when('/account-maker-messaging',{
		templateUrl: 'partials/maker/account-maker-messaging.html',
		controller: 'messagingController'
	})
	.when('/account-maker-profile',{
		templateUrl: 'partials/maker/account-maker-profile.html',
		controller: 'profileController'
	})
	.when('/account-maker-proposals',{
		templateUrl: 'partials/maker/account-maker-proposals.html',
		controller: 'proposalsController'
	})
	.when('/account-maker-tracking',{
		templateUrl: 'partials/maker/account-maker-tracking.html',
		controller: 'trackingController'
	})
	//////////////////////////////////////////////////////
	//										SUPPLIER
	//////////////////////////////////////////////////////
	.when('/join-supplier',{
		templateUrl: 'partials/supplier/join-supplier.html',
		controller: 'registerController'
	})	
	.when('/success-supplier',{
		templateUrl: 'partials/supplier/success-supplier.html'
	})
	.when('/account-supplier-dashboard',{
		templateUrl: 'partials/supplier/account-supplier-dashboard.html',
		controller: 'dashboardController'
	})
	.when('/account-supplier-messaging',{
		templateUrl: 'partials/supplier/account-supplier-messaging.html',
		controller: 'messagingController'
	})
	.when('/account-supplier-profile',{
		templateUrl: 'partials/supplier/account-supplier-profile.html',
		controller: 'profileController'
	})
	.when('/account-supplier-proposals',{
		templateUrl: 'partials/supplier/account-supplier-proposals.html',
		controller: 'proposalsController'
	})
	.when('/account-supplier-tracking',{
		templateUrl: 'partials/supplier/account-supplier-tracking.html',
		controller: 'trackingController'
	})
	.otherwise({
		redirectTo: '/'
	});
});
