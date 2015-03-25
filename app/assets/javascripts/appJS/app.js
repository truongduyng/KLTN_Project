var app = angular.module("sportApp", ["ui.router", 'templates', 'Devise', 'angularFileUpload',
	'angular-flash.service', 'angular-flash.flash-alert-directive', 'unsavedChanges', 'sporta.directives',
	'sporta.services', 'sporta.filters', 'flash','ngCookies', 'angularMoment'
]);


//For angularjs moment
app.run(function(amMoment) {
    amMoment.changeLocale('vi');
});

app.constant('angularMomentConfig', {
    preprocess: 'unix', // optional
    timezone: 'Europe/London' // optional
});


//For intercept $http
app.factory('myHttpInterceptor', ['$q', '$rootScope',function($q, $rootScope) {

	var responseIntercepter = {
		responseError: function(rejection){
			if(rejection.config.url.startsWith("/users/sign_in.json")){
			}else{
				if(rejection.status == 401){
					$rootScope.$emit("onRequireLogin");
				}
			}
			return $q.reject(rejection);
		}
	};

	return responseIntercepter;
}]);

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('myHttpInterceptor');
}]);

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

	$stateProvider.state("chiTietBaiViet", {
		url: '/chi-tiet-bai-viet/{id}',
		templateUrl: 'appJS/chiTietBaiViet/_chiTietBaiViet.html',
		controller: 'chiTietBaiVietCtrl',
		resolve:{
			post: ['postDetailService', '$stateParams', function(postDetailService, $stateParams){
				return postDetailService.show($stateParams.id);
			}],
			currentUser: ['Auth', function(Auth) {
				return Auth.currentUser().then(function(user){
					return user;
				}, function() {
					return {
					};
				});
			}],
		}
	});
	
	// $stateProvider.state("register", {
	// 	url: "/register",
	// 	templateUrl: 'auth/_register.html',
	// 	controller: 'authCtrl',
	// });

	//Khoi phuc
	//$urlRouterProvider.otherwise('/');
}]);

