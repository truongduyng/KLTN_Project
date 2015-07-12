var app = angular.module('sportaSystemAdmin', ["ui.router", 'templates', 'Devise', 'sporta.services', 'sporta.directives', 'sporta.filters','flash', 'ui.bootstrap', 'ngtimeago', 'brantwills.paging', 'infinite-scroll', 'ngMap', 'ckeditor', 'ngCookies', 'ngSanitize']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state("home", {
			url: "/",
			templateUrl: 'adminJS/systemAdmin/home/_home.html',
			controller: 'SAhomeCtrl',
		})

		.state('duyetBaiViet', {
			url: '/duyet-bai-viet',
			templateUrl: 'adminJS/systemAdmin/baiViet/duyetBaiViet/_duyetBaiViet.html',
			controller: 'SAduyetBaiVietCtrl',
			resolve: {
				posts: ['SAduyetBaiVietService', '$rootScope', function(duyetBaiVietService, $rootScope) {
					return duyetBaiVietService.get_posts(null, 1, $rootScope.rootPageConfig.pageSize).promise;
				}],
			}
		})
		.state('quanLyBaiViet', {
			url: '/quan-ly-bai-viet',
			templateUrl: 'adminJS/systemAdmin/baiViet/quanLyBaiViet/_quanLyBaiViet.html',
			controller: 'SAquanLyBaiVietCtrl',
			resolve: {
				posts: ['SAquanLyBaiVietService', '$rootScope', function(quanLyBaiVietService, $rootScope) {
					return quanLyBaiVietService.get_posts(null, 1, $rootScope.rootPageConfig.pageSize).promise;
				}],
			}
		})
		.state("duyetDoanhNghiep",{
			url: '/duyet-doanh-nghiep',
			templateUrl: 'adminJS/systemAdmin/doanhNghiep/duyetDoanhNghiep/_duyetDoanhNghiep.html',
			controller: 'SAduyetDoanhNghiepCtrl',
			resolve: {
				bussinessRequests: ['SAduyetDoanhNghiepService', '$rootScope', function(duyetDoanhNghiepService, $rootScope) {
					console.log("on resolve duyetDoanhNghiep");
					return duyetDoanhNghiepService.getBussinessRequests(1, $rootScope.rootPageConfig.pageSize).promise;
				}],
			}
		})

		.state("mauThongBao", {
			url: '/mau-thong-bao',
			templateUrl: 'adminJS/systemAdmin/mauThongBao/_mauThongBao.html',
			controller: 'SAmauThongBaoCtrl',
			resolve:{
				notificationTemplates: ['SAmauThongBaoService', function(mauThongBaoService){
					return mauThongBaoService.getAllNotificationTemplates();
				}],
			}
		})

	$urlRouterProvider.otherwise('/');

}]);