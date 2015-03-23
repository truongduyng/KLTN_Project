var app = angular.module("sportApp", ['ui.router', 'templates', 'Devise']);
app.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home', {
		url: '',
		templateUrl: 'appJS/home/_home.html',
		controller: 'homeCtrl'
	})
	
	.state('createbussiness', {
		url: '/dang-ky-doanh-nghiep',
		templateUrl: 'appJS/createbussiness/_createbussiness.html',
		controller: 'createbussinessCtrl'
	});
	//Khoi phuc
	$urlRouterProvider.otherwise('');
}]);
