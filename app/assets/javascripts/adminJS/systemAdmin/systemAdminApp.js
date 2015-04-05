var app = angular.module('sportaSystemAdmin', ["ui.router", 'templates', 'Devise', 'angular-flash.flash-alert-directive',
	'sporta.services', 'sporta.directives', 'sporta.filters',
	'angular-flash.service', 'flash', 'ui.bootstrap', 'ngtimeago', 'brantwills.paging', 'infinite-scroll','ngAnimate'
]);

// //For intercept $http
// app.factory('myHttpInterceptor', ['$q', '$rootScope', function($q, $rootScope) {

// 	var responseIntercepter = {
// 		responseError: function(rejection) {
// 			if (rejection.config.url.startsWith("/users/sign_in.json")) {} else {
// 				//KIem tra tinh loi, neu ma loi chua chung thuc thi hien form login, ko can load lai trang
// 				if (rejection.status == 401) {
// 					$rootScope.$emit("onRequireLogin");
// 				}
// 			}
// 			return $q.reject(rejection);
// 		}
// 	};

// 	return responseIntercepter;
// }]);

// app.config(['$httpProvider', function($httpProvider) {
// 	$httpProvider.interceptors.push('myHttpInterceptor');
// }]);



//For flash service
app.config(function(flashProvider) {
	flashProvider.errorClassnames.push('alert-danger');
});

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state("home", {
			url: "/",
			templateUrl: 'appJS/home/_home.html',
			controller: 'homeCtrl',
			resolve: {
				posts: ['listPostService', function(listPostService) {
					return listPostService.get_all(1);
				}],
			}
		})
		.state('duyetBaiViet', {
			url: '/duyet-bai-viet',
			templateUrl: 'adminJS/systemAdmin/baiViet/duyetBaiViet/_duyetBaiViet.html',
			controller: 'SAduyetBaiVietCtrl',
			resolve: {
				posts: ['SAduyetBaiVietService', '$rootScope', function(duyetBaiVietService, $rootScope) {
					return duyetBaiVietService.get_posts(1, $rootScope.rootPageConfig.pageSize).promise;
				}],
			}
		})
		.state('quanLyBaiViet', {
			url: '/quan-ly-bai-viet',
			templateUrl: 'adminJS/systemAdmin/baiViet/quanLyBaiViet/_quanLyBaiViet.html',
			controller: 'SAquanLyBaiVietCtrl',
			resolve: {
				posts: ['SAquanLyBaiVietService', '$rootScope', function(quanLyBaiVietService, $rootScope) {
					return quanLyBaiVietService.get_posts(1, $rootScope.rootPageConfig.pageSize).promise;
				}],
			}
		})
		.state("duyetDoanhNghiep",{
			url: '/duyet-doanh-nghiep',
			templateUrl: 'adminJS/systemAdmin/doanhNghiep/duyetDoanhNghiep/_duyetDoanhNghiep.html',
			controller: 'SAduyetDoanhNghiepCtrl',
		})
		
	$urlRouterProvider.otherwise('/');

}]);