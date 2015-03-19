var app = angular.module("sportApp", ["ui.router", 'templates', 'Devise']);
app.config(['$stateProvider', '$urlRouterProvider'
,function($stateProvider, $urlRouterProvider) {
	
	$stateProvider.state("home", {
		url: "/",
		templateUrl: 'appJS/home/_home.html',
		controller: 'homeCtrl',
	});
	
	// $stateProvider.state("register", {
	// 	url: "/register",
	// 	templateUrl: 'auth/_register.html',
	// 	controller: 'authCtrl',
	// });
	
	//Khoi phuc
	$urlRouterProvider.otherwise('/');
}]);
