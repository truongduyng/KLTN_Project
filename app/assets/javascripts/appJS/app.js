var app = angular.module("sportApp", ["ui.router", 'templates', 'Devise', 'angularFileUpload',
	'angular-flash.service', 'angular-flash.flash-alert-directive'
]);

//For flash service
app.config(function(flashProvider) {

	// Support bootstrap 3.0 "alert-danger" class with error flash types
	flashProvider.errorClassnames.push('alert-danger');
	/**
	 * Also have...
	 *
	 * flashProvider.warnClassnames
	 * flashProvider.infoClassnames
	 * flashProvider.successClassnames
	 */
});

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider.state("home", {
		url: "/",
		templateUrl: 'appJS/home/_home.html',
		controller: 'homeCtrl',
	});

	$stateProvider.state("dangBai", {
		url: "/dang-bai/",
		templateUrl: 'appJS/dangBai/_dangBai.html',
		controller: 'dangBaiCtrl',
	});

	// $stateProvider.state("register", {
	// 	url: "/register",
	// 	templateUrl: 'auth/_register.html',
	// 	controller: 'authCtrl',
	// });

	//Khoi phuc
	$urlRouterProvider.otherwise('/');
}]);