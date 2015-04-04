//Loai bo angularMoment, ngFileUpload
var app = angular.module("sportApp", ["ui.router", 'templates', 'Devise', 'angularFileUpload',
	'angular-flash.service', 'angular-flash.flash-alert-directive', 'unsavedChanges', 'sporta.directives',
	'sporta.services', 'sporta.filters', 'flash', 'ngCookies', 'ui.bootstrap', 'ngtimeago', 'brantwills.paging',
	'ngImgCrop', 'infinite-scroll', 'ngMap', 'ngStorage'
]);

//For intercept $http
app.factory('myHttpInterceptor', ['$q', '$rootScope', function($q, $rootScope) {

	var responseIntercepter = {
		responseError: function(rejection) {
			if (rejection.config.url.startsWith("/users/sign_in.json")) {} else {
				//KIem tra tinh loi, neu ma loi chua chung thuc thi hien form login, ko can load lai trang
				if (rejection.status == 401) {
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

	// $stateProvider.state("home", {
	// 	url: "/",
	// 	templateUrl: 'appJS/home/_home.html',
	// 	controller: 'homeCtrl',
	// });
	$stateProvider.state("home", {
		url: "/",
		templateUrl: 'appJS/home/_home.html',
		controller: 'homeCtrl',
		resolve: {
			posts: ['listPostService', function(listPostService) {
				return listPostService.get_all(1);
			}],
		}
	});


	$stateProvider.state("dangBai", {
		url: "/dang-bai/",
		templateUrl: 'appJS/dangBai/_dangBai.html',
		controller: 'dangBaiCtrl',
	});

	$stateProvider.state("editPost", {
		url: "/chinh-sua-bai-viet/{id}",
		templateUrl: 'appJS/baiViet/edit/_editPost.html',
		controller: 'editPostCtrl',
		resolve: {
			post: ['editPostService', '$stateParams', '$q', function(editPostService, $stateParams, $q) {
				console.log("in resolve editPostService");
				return editPostService.edit($stateParams.id);
			}],
		},
		access: {
			free: false,
		}
	});

	//Moi chinh lai chua biet dung sai
	$stateProvider.state("chiTietBaiViet", {
		url: '/chi-tiet-bai-viet/{id}',
		templateUrl: 'appJS/chiTietBaiViet/_chiTietBaiViet.html',
		controller: 'chiTietBaiVietCtrl',
		resolve: {
			post: ['postDetailService', '$stateParams', function(postDetailService, $stateParams) {
				return postDetailService.show($stateParams.id);
			}],
		}
	});

	$stateProvider.state('notFound', {
		url: '/khong-tim-thay-ket-qua',
		templateUrl: 'appJS/notFound/_notFound.html',
	});

	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'appJS/auth/_login.html',
		controller: 'authCtrl',
	});

	$stateProvider.state('register', {
		url: '/register',
		templateUrl: 'appJS/auth/_register.html',
		controller: 'authCtrl',

	});

	//access:free
	// $stateProvider.state('trangCaNhan', {
	// 	url: '/trang-ca-nhan/{username}',
	// 	templateUrl: 'appJS/trangCaNhan/_trangCaNhan.html',
	// 	controller: 'trangCaNhanCtrl',
	// 	resolve: {
	// 		user: ['trangCaNhanService', '$stateParams',  function(trangCaNhanService, $stateParams) {
	// 			return trangCaNhanService.show($stateParams.username);
	// 		}],

	// 		posts: ['baiVietCaNhanService', '$stateParams', '$rootScope', '$location',
	// 		 function(baiVietCaNhanService,$stateParams, $rootScope, $location){
	// 		 	var searchObj = $location.search();
	// 		 	var page = 1;
	// 		 	if(searchObj.page && (searchObj.module == null || searchObj.module == 'bai-viet-ca-nhan')){
	// 		 		page = searchObj.page;
	// 		 	}
	// 			return baiVietCaNhanService.index($stateParams.username, page, $rootScope.rootPageConfig.pageSize);		
	// 		}],

	// 		favoritePosts: ['baiVietYeuThichService', '$stateParams', '$rootScope', '$location',
	// 		 function(baiVietYeuThichService,$stateParams, $rootScope, $location){
	// 		 	var searchObj = $location.search();
	// 		 	var page = 1;
	// 		 	if(searchObj.page && searchObj.module == 'bai-viet-yeu-thich'){
	// 		 		page = searchObj.page;
	// 		 	}
	// 			return baiVietYeuThichService.get($stateParams.username, page, $rootScope.rootPageConfig.pageSize);		
	// 		}],

	// 		authenUser: ['Auth', function(Auth){
	// 			return Auth.currentUser().then(function(user){
	// 				return user;
	// 			}, function(response){
	// 				return null;
	// 			})
	// 		}]
	// 	}
	// })



	$stateProvider.state('trangCaNhan', {
		url: '/trang-ca-nhan/{username}',
		templateUrl: 'appJS/trangCaNhan/_trangCaNhan.html',
		controller: 'trangCaNhanCtrl',
		resolve: {
			user: ['trangCaNhanService', '$stateParams', function(trangCaNhanService, $stateParams) {
				return trangCaNhanService.show($stateParams.username);
			}],

			posts: ['baiVietCaNhanService', '$stateParams', '$rootScope',
				function(baiVietCaNhanService, $stateParams, $rootScope) {
					return baiVietCaNhanService.index($stateParams.username, 1, $rootScope.rootPageConfig.pageSize).promise;
				}
			],

			favoritePosts: ['baiVietYeuThichService', '$stateParams', '$rootScope',
				function(baiVietYeuThichService, $stateParams, $rootScope) {
					return baiVietYeuThichService.get($stateParams.username, 1, $rootScope.rootPageConfig.pageSize).promise;
				}
			],

			authenUser: ['Auth', function(Auth) {
				return Auth.currentUser().then(function(user) {
					return user;
				}, function(response) {
					return null;
				})
			}]
		}
	});

	$stateProvider.state('khTkDoanhNghiep', {
		url: '/kich-hoat-tai-khoan-doanh-nghiep',
		templateUrl: 'appJS/KhTkDoanhNghiep/_KhTkDoanhNghiep.html',
		controller: 'KhTkDoanhNghiepCtrl',
		resolve: {
			currentUser: ['Auth', function(Auth) {
				return Auth.currentUser().then(function(user) {
					return user;
				});
			}]
		},
		// access: {
		// 	free: false,
		// }
	});
	//Khoi phuc
	$urlRouterProvider.otherwise('/');
}]);